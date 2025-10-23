namespace ClassicalCipherSuite.Ciphers;

/// <summary>
/// Monoalphabetic Substitution Cipher implementasyonu.
/// Her harf için tek bir rastgele permütasyon kullanır (26 harflik anahtar).
/// Anahtar: 26 harflik string veya keyword'den türetilmiş permütasyon.
/// </summary>
public class MonoalphabeticCipher : ICipher
{
    public string Encrypt(string plaintext, CipherOptions options)
    {
        string normalized = TextNormalizer.NormalizeForEncryption(plaintext, options);
        string key = GetOrGenerateKey(options);
        
        ValidateKey(key);
        
        return Substitute(normalized, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", key, options);
    }

    public string Decrypt(string ciphertext, CipherOptions options)
    {
        string normalized = TextNormalizer.NormalizeForDecryption(ciphertext, options);
        string key = GetOrGenerateKey(options);
        
        ValidateKey(key);
        
        // Decrypt için anahtar ve alfabe ters çevrilir
        return Substitute(normalized, key, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", options);
    }

    private string GetOrGenerateKey(CipherOptions options)
    {
        // Eğer doğrudan 26 harflik anahtar verilmişse kullan
        if (!string.IsNullOrEmpty(options.Key) && options.Key.Length == 26)
        {
            return options.Key.ToUpper();
        }

        // Keyword'den anahtar üret
        if (!string.IsNullOrEmpty(options.Keyword))
        {
            return GenerateKeyFromKeyword(options.Keyword);
        }

        // Key varsa ama 26 harf değilse onu keyword olarak kullan
        if (!string.IsNullOrEmpty(options.Key))
        {
            return GenerateKeyFromKeyword(options.Key);
        }

        throw new ArgumentException("Monoalphabetic cipher için 26 harflik anahtar veya keyword gereklidir. " +
                                    "Kullanım: --key <26 harf> veya --keyword <kelime>");
    }

    private string GenerateKeyFromKeyword(string keyword)
    {
        // Keyword'den benzersiz harflerle başlayan 26 harflik permütasyon oluştur
        var keyChars = new List<char>();
        string cleanKeyword = TextNormalizer.FilterLettersOnly(keyword, uppercase: true);

        // Önce keyword'deki benzersiz harfleri ekle
        foreach (char c in cleanKeyword)
        {
            if (!keyChars.Contains(c))
            {
                keyChars.Add(c);
            }
        }

        // Sonra kalan alfabedeki harfleri sırayla ekle
        for (char c = 'A'; c <= 'Z'; c++)
        {
            if (!keyChars.Contains(c))
            {
                keyChars.Add(c);
            }
        }

        return new string(keyChars.ToArray());
    }

    private void ValidateKey(string key)
    {
        if (key.Length != 26)
        {
            throw new ArgumentException($"Monoalphabetic anahtar tam 26 harf olmalı. Verilen: {key.Length} harf.");
        }

        // Tüm harflerin benzersiz olduğunu kontrol et
        var uniqueChars = new HashSet<char>(key.ToUpper());
        if (uniqueChars.Count != 26)
        {
            throw new ArgumentException("Monoalphabetic anahtar 26 benzersiz harf içermelidir (her harf bir kez).");
        }

        // A-Z aralığında olduğunu kontrol et
        foreach (char c in key.ToUpper())
        {
            if (c < 'A' || c > 'Z')
            {
                throw new ArgumentException($"Monoalphabetic anahtar yalnızca A-Z harfleri içermelidir. Geçersiz: '{c}'");
            }
        }
    }

    private string Substitute(string text, string fromAlphabet, string toAlphabet, CipherOptions options)
    {
        var result = new System.Text.StringBuilder();
        
        foreach (char c in text)
        {
            if (char.IsLetter(c))
            {
                char upperC = char.ToUpper(c);
                int index = fromAlphabet.IndexOf(upperC);
                
                if (index >= 0)
                {
                    char newChar = toAlphabet[index];
                    result.Append(options.UseUppercaseOutput ? char.ToUpper(newChar) : char.ToLower(newChar));
                }
                else
                {
                    result.Append(c); // Bulunamazsa olduğu gibi bırak
                }
            }
            else
            {
                result.Append(c);
            }
        }

        return result.ToString();
    }
}
