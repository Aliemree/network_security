namespace ClassicalCipherSuite.Ciphers;

/// <summary>
/// Vigenère Cipher implementasyonu.
/// Polyalphabetic substitution - her pozisyondaki harf anahtar kelimeye göre farklı Caesar kaydırması alır.
/// Formül: C_i = (P_i + K_{i mod len(K)}) mod 26
/// Opsiyonel: Autokey mode (anahtar plaintext ile uzatılır)
/// </summary>
public class VigenereCipher : ICipher
{
    public string Encrypt(string plaintext, CipherOptions options)
    {
        string normalized = TextNormalizer.NormalizeForEncryption(plaintext, options);
        string lettersOnly = TextNormalizer.FilterLettersOnly(normalized, uppercase: true);
        
        if (string.IsNullOrEmpty(options.Key))
        {
            throw new ArgumentException("Vigenère cipher için anahtar (--key) gereklidir.");
        }

        string key = TextNormalizer.FilterLettersOnly(options.Key, uppercase: true);
        if (key.Length == 0)
        {
            throw new ArgumentException("Vigenère anahtarı en az bir harf içermelidir.");
        }

        return Transform(lettersOnly, key, options, isEncrypt: true);
    }

    public string Decrypt(string ciphertext, CipherOptions options)
    {
        string normalized = TextNormalizer.NormalizeForDecryption(ciphertext, options);
        string lettersOnly = TextNormalizer.FilterLettersOnly(normalized, uppercase: true);
        
        if (string.IsNullOrEmpty(options.Key))
        {
            throw new ArgumentException("Vigenère cipher için anahtar (--key) gereklidir.");
        }

        string key = TextNormalizer.FilterLettersOnly(options.Key, uppercase: true);
        if (key.Length == 0)
        {
            throw new ArgumentException("Vigenère anahtarı en az bir harf içermelidir.");
        }

        return Transform(lettersOnly, key, options, isEncrypt: false);
    }

    private string Transform(string text, string key, CipherOptions options, bool isEncrypt)
    {
        var result = new System.Text.StringBuilder();
        string currentKey = key;

        for (int i = 0; i < text.Length; i++)
        {
            char plainChar = text[i];
            char keyChar = currentKey[i % currentKey.Length];

            int plainVal = plainChar - 'A';
            int keyVal = keyChar - 'A';

            int newVal;
            if (isEncrypt)
            {
                newVal = (plainVal + keyVal) % 26;
                
                // Autokey mode: şifrelenmiş karakteri anahtara ekle
                if (options.AutoKey && i >= key.Length)
                {
                    currentKey += plainChar;
                }
            }
            else
            {
                newVal = ((plainVal - keyVal) % 26 + 26) % 26;
                
                // Autokey mode decrypt: deşifre edilen karakteri anahtara ekle
                if (options.AutoKey && i >= key.Length)
                {
                    currentKey += (char)('A' + newVal);
                }
            }

            char newChar = (char)('A' + newVal);
            result.Append(options.UseUppercaseOutput ? newChar : char.ToLower(newChar));
        }

        return result.ToString();
    }
}
