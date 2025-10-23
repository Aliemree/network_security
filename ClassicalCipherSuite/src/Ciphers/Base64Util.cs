using System.Text;

namespace ClassicalCipherSuite.Ciphers;

/// <summary>
/// Base64 encoding/decoding yardımcı sınıfı.
/// Not: Base64 şifreleme değildir, veri kodlama yöntemidir.
/// Binary verileri printable ASCII karakterlere dönüştürür.
/// </summary>
public class Base64Util : ICipher
{
    public string Encrypt(string plaintext, CipherOptions options)
    {
        // Base64 encode
        byte[] bytes = Encoding.UTF8.GetBytes(plaintext);
        return Convert.ToBase64String(bytes);
    }

    public string Decrypt(string ciphertext, CipherOptions options)
    {
        // Base64 decode
        try
        {
            byte[] bytes = Convert.FromBase64String(ciphertext);
            return Encoding.UTF8.GetString(bytes);
        }
        catch (FormatException)
        {
            throw new ArgumentException("Geçersiz Base64 formatı. Decode edilemedi.");
        }
    }
}
