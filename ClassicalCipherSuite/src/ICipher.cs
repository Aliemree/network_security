namespace ClassicalCipherSuite;

/// <summary>
/// Tüm şifreleme algoritmalarının uygulaması gereken temel arayüz.
/// Her cipher hem şifreleme (Encrypt) hem de deşifreleme (Decrypt) desteği sağlamalıdır.
/// </summary>
public interface ICipher
{
    /// <summary>
    /// Verilen düz metni şifreler.
    /// </summary>
    /// <param name="plaintext">Şifrelenecek düz metin (ASCII A-Z)</param>
    /// <param name="options">Şifreleme seçenekleri ve algoritma parametreleri</param>
    /// <returns>Şifrelenmiş metin</returns>
    string Encrypt(string plaintext, CipherOptions options);

    /// <summary>
    /// Verilen şifreli metni çözer.
    /// </summary>
    /// <param name="ciphertext">Çözülecek şifreli metin</param>
    /// <param name="options">Deşifreleme seçenekleri ve algoritma parametreleri</param>
    /// <returns>Düz metin</returns>
    string Decrypt(string ciphertext, CipherOptions options);
}
