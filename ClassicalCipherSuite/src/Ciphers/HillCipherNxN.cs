namespace ClassicalCipherSuite.Ciphers;

/// <summary>
/// Hill Cipher N×N implementasyonu.
/// Matris tabanlı blok şifreleme (mod 26).
/// Her blok n harften oluşur ve n×n anahtar matrisi ile çarpılır.
/// Decrypt için matrisin mod 26'da tersi gereklidir.
/// Kısıtlama: det(K) ve 26 aralarında asal olmalı (gcd(det, 26) = 1).
/// </summary>
public class HillCipherNxN : ICipher
{
    private int[,]? _keyMatrix;
    private int[,]? _inverseMatrix;
    private int _n;

    public string Encrypt(string plaintext, CipherOptions options)
    {
        string normalized = TextNormalizer.NormalizeForEncryption(plaintext, options);
        string lettersOnly = TextNormalizer.FilterLettersOnly(normalized, uppercase: true);
        
        LoadKeyMatrix(options);
        
        // Padding ekle (blok boyutuna göre)
        while (lettersOnly.Length % _n != 0)
        {
            lettersOnly += options.PadChar;
        }

        var result = new System.Text.StringBuilder();
        
        for (int i = 0; i < lettersOnly.Length; i += _n)
        {
            int[] block = new int[_n];
            for (int j = 0; j < _n; j++)
            {
                block[j] = lettersOnly[i + j] - 'A';
            }

            int[] encrypted = MultiplyMatrixVector(_keyMatrix!, block);
            
            foreach (int val in encrypted)
            {
                result.Append((char)('A' + val));
            }
        }

        return options.UseUppercaseOutput ? result.ToString() : result.ToString().ToLower();
    }

    public string Decrypt(string ciphertext, CipherOptions options)
    {
        string normalized = TextNormalizer.NormalizeForDecryption(ciphertext, options);
        string lettersOnly = TextNormalizer.FilterLettersOnly(normalized, uppercase: true);
        
        LoadKeyMatrix(options);
        ComputeInverseMatrix();
        
        if (lettersOnly.Length % _n != 0)
        {
            throw new ArgumentException($"Hill cipher decrypt için şifreli metin uzunluğu {_n}'nin katı olmalıdır.");
        }

        var result = new System.Text.StringBuilder();
        
        for (int i = 0; i < lettersOnly.Length; i += _n)
        {
            int[] block = new int[_n];
            for (int j = 0; j < _n; j++)
            {
                block[j] = lettersOnly[i + j] - 'A';
            }

            int[] decrypted = MultiplyMatrixVector(_inverseMatrix!, block);
            
            foreach (int val in decrypted)
            {
                result.Append((char)('A' + val));
            }
        }

        return options.UseUppercaseOutput ? result.ToString() : result.ToString().ToLower();
    }

    private void LoadKeyMatrix(CipherOptions options)
    {
        if (!string.IsNullOrEmpty(options.MatrixFile))
        {
            // Dosyadan matris oku
            string content = File.ReadAllText(options.MatrixFile);
            ParseMatrix(content);
        }
        else if (!string.IsNullOrEmpty(options.Matrix))
        {
            ParseMatrix(options.Matrix);
        }
        else
        {
            throw new ArgumentException("Hill cipher için matris gereklidir (--matrix veya --matrix-file).");
        }
    }

    private void ParseMatrix(string matrixStr)
    {
        // Format: "a,b;c,d" veya "a,b;c,d;e,f" vb.
        // Satırlar ; ile, sütunlar , ile ayrılır
        var rows = matrixStr.Split(';');
        _n = rows.Length;

        _keyMatrix = new int[_n, _n];
        
        for (int i = 0; i < _n; i++)
        {
            var values = rows[i].Split(',');
            if (values.Length != _n)
            {
                throw new ArgumentException($"Hill matris satır {i + 1} beklenen {_n} değil {values.Length} eleman içeriyor.");
            }

            for (int j = 0; j < _n; j++)
            {
                if (!int.TryParse(values[j].Trim(), out int val))
                {
                    throw new ArgumentException($"Hill matris geçersiz sayı içeriyor: '{values[j]}'");
                }
                _keyMatrix[i, j] = ((val % 26) + 26) % 26; // Mod 26'ya normalize et
            }
        }
    }

    private void ComputeInverseMatrix()
    {
        int det = ComputeDeterminant(_keyMatrix!, _n);
        det = ((det % 26) + 26) % 26;

        int detInv = ModularInverse(det, 26);
        if (detInv == -1)
        {
            throw new InvalidOperationException(
                $"Hill matrisinin determinantı ({det}) mod 26'da terslenemiyor. " +
                "gcd(det, 26) = 1 olmalıdır. Matris elemanlarını değiştirip tekrar deneyin.");
        }

        // Adjugate matris hesapla
        int[,] adjugate = ComputeAdjugate(_keyMatrix!, _n);
        
        // Inverse = detInv * adjugate (mod 26)
        _inverseMatrix = new int[_n, _n];
        for (int i = 0; i < _n; i++)
        {
            for (int j = 0; j < _n; j++)
            {
                _inverseMatrix[i, j] = ((detInv * adjugate[i, j]) % 26 + 26) % 26;
            }
        }
    }

    private int ComputeDeterminant(int[,] matrix, int n)
    {
        if (n == 1)
            return matrix[0, 0];

        if (n == 2)
        {
            return matrix[0, 0] * matrix[1, 1] - matrix[0, 1] * matrix[1, 0];
        }

        int det = 0;
        for (int col = 0; col < n; col++)
        {
            int[,] minor = GetMinor(matrix, 0, col, n);
            int cofactor = (col % 2 == 0 ? 1 : -1) * matrix[0, col] * ComputeDeterminant(minor, n - 1);
            det += cofactor;
        }

        return det;
    }

    private int[,] ComputeAdjugate(int[,] matrix, int n)
    {
        int[,] adjugate = new int[n, n];

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                int[,] minor = GetMinor(matrix, i, j, n);
                int cofactor = ((i + j) % 2 == 0 ? 1 : -1) * ComputeDeterminant(minor, n - 1);
                adjugate[j, i] = ((cofactor % 26) + 26) % 26; // Transpose sırasında
            }
        }

        return adjugate;
    }

    private int[,] GetMinor(int[,] matrix, int rowToRemove, int colToRemove, int n)
    {
        int[,] minor = new int[n - 1, n - 1];
        int minorRow = 0;

        for (int i = 0; i < n; i++)
        {
            if (i == rowToRemove) continue;
            
            int minorCol = 0;
            for (int j = 0; j < n; j++)
            {
                if (j == colToRemove) continue;
                
                minor[minorRow, minorCol] = matrix[i, j];
                minorCol++;
            }
            minorRow++;
        }

        return minor;
    }

    private int ModularInverse(int a, int m)
    {
        a = ((a % m) + m) % m;
        
        for (int x = 1; x < m; x++)
        {
            if ((a * x) % m == 1)
                return x;
        }
        
        return -1; // Ters bulunamadı
    }

    private int[] MultiplyMatrixVector(int[,] matrix, int[] vector)
    {
        int n = vector.Length;
        int[] result = new int[n];

        for (int i = 0; i < n; i++)
        {
            int sum = 0;
            for (int j = 0; j < n; j++)
            {
                sum += matrix[i, j] * vector[j];
            }
            result[i] = ((sum % 26) + 26) % 26;
        }

        return result;
    }
}
