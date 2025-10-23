namespace ClassicalCipherSuite.Ciphers;

/// <summary>
/// Columnar Transposition Cipher implementasyonu.
/// Metni satırlara yazar, sonra sütunları anahtar sırasına göre okur.
/// Transposition (permütasyon) şifrelemesi - harflerin yerleri değişir, kendileri değişmez.
/// </summary>
public class ColumnarTranspositionCipher : ICipher
{
    public string Encrypt(string plaintext, CipherOptions options)
    {
        string normalized = TextNormalizer.NormalizeForEncryption(plaintext, options);
        string lettersOnly = TextNormalizer.FilterLettersOnly(normalized, uppercase: true);
        
        if (string.IsNullOrEmpty(options.Key))
        {
            throw new ArgumentException("Columnar transposition cipher için anahtar (--key) gereklidir.");
        }

        string key = options.Key.ToUpper();
        int[] columnOrder = GetColumnOrder(key);
        int numCols = columnOrder.Length;

        // Padding ekle (satırı tamamlamak için)
        while (lettersOnly.Length % numCols != 0)
        {
            lettersOnly += options.PadChar;
        }

        int numRows = lettersOnly.Length / numCols;
        char[,] grid = new char[numRows, numCols];

        // Metni satırlara yaz
        int index = 0;
        for (int row = 0; row < numRows; row++)
        {
            for (int col = 0; col < numCols; col++)
            {
                grid[row, col] = lettersOnly[index++];
            }
        }

        // Sütunları anahtar sırasına göre oku
        var result = new System.Text.StringBuilder();
        for (int orderIdx = 0; orderIdx < numCols; orderIdx++)
        {
            int col = Array.IndexOf(columnOrder, orderIdx);
            for (int row = 0; row < numRows; row++)
            {
                result.Append(grid[row, col]);
            }
        }

        return options.UseUppercaseOutput ? result.ToString() : result.ToString().ToLower();
    }

    public string Decrypt(string ciphertext, CipherOptions options)
    {
        string normalized = TextNormalizer.NormalizeForDecryption(ciphertext, options);
        string lettersOnly = TextNormalizer.FilterLettersOnly(normalized, uppercase: true);
        
        if (string.IsNullOrEmpty(options.Key))
        {
            throw new ArgumentException("Columnar transposition cipher için anahtar (--key) gereklidir.");
        }

        string key = options.Key.ToUpper();
        int[] columnOrder = GetColumnOrder(key);
        int numCols = columnOrder.Length;

        if (lettersOnly.Length % numCols != 0)
        {
            throw new ArgumentException($"Columnar decrypt için şifreli metin uzunluğu {numCols}'nin katı olmalıdır.");
        }

        int numRows = lettersOnly.Length / numCols;
        char[,] grid = new char[numRows, numCols];

        // Sütunları anahtar sırasına göre doldur
        int index = 0;
        for (int orderIdx = 0; orderIdx < numCols; orderIdx++)
        {
            int col = Array.IndexOf(columnOrder, orderIdx);
            for (int row = 0; row < numRows; row++)
            {
                grid[row, col] = lettersOnly[index++];
            }
        }

        // Satırları sırayla oku
        var result = new System.Text.StringBuilder();
        for (int row = 0; row < numRows; row++)
        {
            for (int col = 0; col < numCols; col++)
            {
                result.Append(grid[row, col]);
            }
        }

        return options.UseUppercaseOutput ? result.ToString() : result.ToString().ToLower();
    }

    private int[] GetColumnOrder(string key)
    {
        // Anahtardaki karakterlerin sırasını belirle
        // Örnek: "ZEBRA" -> [4, 1, 0, 3, 2] (A=0, B=1, E=2, R=3, Z=4)
        int n = key.Length;
        var pairs = key.Select((c, i) => (c, i)).OrderBy(p => p.c).ThenBy(p => p.i).ToArray();
        
        int[] order = new int[n];
        for (int i = 0; i < n; i++)
        {
            order[pairs[i].i] = i;
        }

        return order;
    }
}
