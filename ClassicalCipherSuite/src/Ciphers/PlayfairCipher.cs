namespace ClassicalCipherSuite.Ciphers;

/// <summary>
/// Playfair Cipher implementasyonu.
/// 5×5 matris kullanarak harf çiftlerini şifreler.
/// Kurallar:
/// - I ve J aynı hücrede (opsiyonel)
/// - Çift hazırlama: aynı harf çiftinde araya PadChar (X) konur
/// - Son tek harf PadChar ile tamamlanır
/// - Encryption kuralları: aynı satır (sağa), aynı sütun (aşağı), dikdörtgen (köşegen)
/// </summary>
public class PlayfairCipher : ICipher
{
    private char[,]? _matrix;
    private Dictionary<char, (int row, int col)>? _positions;

    public string Encrypt(string plaintext, CipherOptions options)
    {
        string normalized = TextNormalizer.NormalizeForEncryption(plaintext, options);
        string lettersOnly = TextNormalizer.FilterLettersOnly(normalized, uppercase: true);
        
        BuildMatrix(options);
        
        // Prepare digraphs (çift harfler)
        var digraphs = PrepareDigraphs(lettersOnly, options);
        
        var result = new System.Text.StringBuilder();
        foreach (var (a, b) in digraphs)
        {
            var (c1, c2) = EncryptPair(a, b);
            result.Append(c1);
            result.Append(c2);
        }

        return options.UseUppercaseOutput ? result.ToString() : result.ToString().ToLower();
    }

    public string Decrypt(string ciphertext, CipherOptions options)
    {
        string normalized = TextNormalizer.NormalizeForDecryption(ciphertext, options);
        string lettersOnly = TextNormalizer.FilterLettersOnly(normalized, uppercase: true);
        
        BuildMatrix(options);
        
        if (lettersOnly.Length % 2 != 0)
        {
            throw new ArgumentException("Playfair decrypt için şifreli metin çift sayıda harf içermelidir.");
        }

        var result = new System.Text.StringBuilder();
        for (int i = 0; i < lettersOnly.Length; i += 2)
        {
            var (p1, p2) = DecryptPair(lettersOnly[i], lettersOnly[i + 1]);
            result.Append(p1);
            result.Append(p2);
        }

        return options.UseUppercaseOutput ? result.ToString() : result.ToString().ToLower();
    }

    private void BuildMatrix(CipherOptions options)
    {
        if (string.IsNullOrEmpty(options.Key))
        {
            throw new ArgumentException("Playfair cipher için anahtar (--key) gereklidir.");
        }

        string keyword = TextNormalizer.FilterLettersOnly(options.Key, uppercase: true);
        var usedChars = new HashSet<char>();
        var matrixChars = new List<char>();

        // Keyword'den benzersiz harfleri ekle
        foreach (char c in keyword)
        {
            char useChar = c;
            if (options.IJMerge && c == 'J')
                useChar = 'I';

            if (!usedChars.Contains(useChar))
            {
                usedChars.Add(useChar);
                matrixChars.Add(useChar);
            }
        }

        // Kalan alfabeyi ekle
        for (char c = 'A'; c <= 'Z'; c++)
        {
            if (options.IJMerge && c == 'J')
                continue; // J'yi atla

            if (!usedChars.Contains(c))
            {
                usedChars.Add(c);
                matrixChars.Add(c);
            }
        }

        // 5x5 matris oluştur
        _matrix = new char[5, 5];
        _positions = new Dictionary<char, (int, int)>();
        
        int index = 0;
        for (int row = 0; row < 5; row++)
        {
            for (int col = 0; col < 5; col++)
            {
                char c = matrixChars[index++];
                _matrix[row, col] = c;
                _positions[c] = (row, col);
            }
        }
    }

    private List<(char, char)> PrepareDigraphs(string text, CipherOptions options)
    {
        var digraphs = new List<(char, char)>();
        var processed = new System.Text.StringBuilder();

        // I/J birleştirme
        foreach (char c in text)
        {
            if (options.IJMerge && c == 'J')
                processed.Append('I');
            else
                processed.Append(c);
        }

        string str = processed.ToString();
        int i = 0;
        
        while (i < str.Length)
        {
            char first = str[i];
            char second;

            if (i + 1 < str.Length)
            {
                second = str[i + 1];
                
                // Aynı harf çifti varsa araya PadChar ekle
                if (first == second)
                {
                    second = options.PadChar;
                    i++; // Sadece bir karakter ilerle
                }
                else
                {
                    i += 2; // İki karakter ilerle
                }
            }
            else
            {
                // Son karakter tek kaldıysa PadChar ile tamamla
                second = options.PadChar;
                i++;
            }

            digraphs.Add((first, second));
        }

        return digraphs;
    }

    private (char, char) EncryptPair(char a, char b)
    {
        if (!_positions!.ContainsKey(a) || !_positions.ContainsKey(b))
        {
            throw new ArgumentException($"Playfair matrisinde bulunmayan karakter: {a} veya {b}");
        }

        var (r1, c1) = _positions[a];
        var (r2, c2) = _positions[b];

        // Aynı satırda: sağa kaydır
        if (r1 == r2)
        {
            return (_matrix![r1, (c1 + 1) % 5], _matrix[r2, (c2 + 1) % 5]);
        }

        // Aynı sütunda: aşağı kaydır
        if (c1 == c2)
        {
            return (_matrix![(r1 + 1) % 5, c1], _matrix[(r2 + 1) % 5, c2]);
        }

        // Dikdörtgen: köşeleri değiştir
        return (_matrix![r1, c2], _matrix[r2, c1]);
    }

    private (char, char) DecryptPair(char a, char b)
    {
        if (!_positions!.ContainsKey(a) || !_positions.ContainsKey(b))
        {
            throw new ArgumentException($"Playfair matrisinde bulunmayan karakter: {a} veya {b}");
        }

        var (r1, c1) = _positions[a];
        var (r2, c2) = _positions[b];

        // Aynı satırda: sola kaydır
        if (r1 == r2)
        {
            return (_matrix![r1, (c1 - 1 + 5) % 5], _matrix[r2, (c2 - 1 + 5) % 5]);
        }

        // Aynı sütunda: yukarı kaydır
        if (c1 == c2)
        {
            return (_matrix![(r1 - 1 + 5) % 5, c1], _matrix[(r2 - 1 + 5) % 5, c2]);
        }

        // Dikdörtgen: köşeleri değiştir (encrypt ile aynı)
        return (_matrix![r1, c2], _matrix[r2, c1]);
    }
}
