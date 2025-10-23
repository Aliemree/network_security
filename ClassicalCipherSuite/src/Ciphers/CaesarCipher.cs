namespace ClassicalCipherSuite.Ciphers;

/// <summary>
/// Caesar Cipher implementasyonu.
/// Her harfi sabit bir kaydırma (shift) değeri kadar alfabede ileriye veya geriye kaydırır.
/// Formül: C = (P + k) mod 26 (encrypt), P = (C - k) mod 26 (decrypt)
/// </summary>
public class CaesarCipher : ICipher
{
    public string Encrypt(string plaintext, CipherOptions options)
    {
        string normalized = TextNormalizer.NormalizeForEncryption(plaintext, options);
        return Transform(normalized, options.Shift, options);
    }

    public string Decrypt(string ciphertext, CipherOptions options)
    {
        string normalized = TextNormalizer.NormalizeForDecryption(ciphertext, options);
        return Transform(normalized, -options.Shift, options);
    }

    private string Transform(string text, int shift, CipherOptions options)
    {
        var result = new System.Text.StringBuilder();
        
        // Shift'i pozitif aralığa normalize et
        shift = ((shift % 26) + 26) % 26;

        foreach (char c in text)
        {
            if (char.IsLetter(c))
            {
                char baseChar = char.IsUpper(c) ? 'A' : 'a';
                int pos = c - baseChar;
                int newPos = (pos + shift) % 26;
                char newChar = (char)(baseChar + newPos);
                
                result.Append(options.UseUppercaseOutput ? char.ToUpper(newChar) : newChar);
            }
            else
            {
                // Harf olmayan karakterler olduğu gibi kalır (PreserveNonLetters zaten normalize'da işlendi)
                result.Append(c);
            }
        }

        return result.ToString();
    }
}
