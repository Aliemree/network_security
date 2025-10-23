namespace ClassicalCipherSuite;

/// <summary>
/// Şifreleme ve deşifreleme işlemleri için genel seçenekler ve algoritma-özgü parametreler.
/// Her cipher kendi ihtiyacı olan alanları kullanır.
/// </summary>
public class CipherOptions
{
    // Genel seçenekler
    
    /// <summary>
    /// Harf olmayan karakterlerin (boşluk, noktalama vb.) korunup korunmayacağı.
    /// true: korunur, false: kaldırılır.
    /// </summary>
    public bool PreserveNonLetters { get; set; } = false;

    /// <summary>
    /// Çıktının büyük harf (A-Z) olup olmayacağı.
    /// true: A-Z, false: a-z (varsayılan: true)
    /// </summary>
    public bool UseUppercaseOutput { get; set; } = true;

    /// <summary>
    /// Girdi metninde Türkçe veya ASCII A-Z dışında karakter varsa hata verilsin mi?
    /// true: hata verilir, false: transliterate/kaldır (varsayılan: true)
    /// </summary>
    public bool StrictAscii { get; set; } = true;

    // Caesar Cipher
    
    /// <summary>
    /// Caesar cipher için kaydırma miktarı (pozitif veya negatif).
    /// </summary>
    public int Shift { get; set; } = 0;

    // Monoalphabetic, Vigenere, Playfair, Columnar
    
    /// <summary>
    /// Şifre anahtarı (string olarak). Algoritma türüne göre farklı yorumlanır.
    /// - Monoalphabetic: 26 harflik permütasyon veya keyword
    /// - Vigenere: anahtar kelime
    /// - Playfair: anahtar kelime
    /// - Columnar: sütun sırası anahtarı
    /// </summary>
    public string? Key { get; set; }

    /// <summary>
    /// Monoalphabetic cipher için keyword-based anahtar üretimi.
    /// </summary>
    public string? Keyword { get; set; }

    // Hill Cipher
    
    /// <summary>
    /// Hill cipher için matris (virgül ve noktalı virgülle ayrılmış).
    /// Örnek: "3,3;2,5" -> [[3,3],[2,5]]
    /// </summary>
    public string? Matrix { get; set; }

    /// <summary>
    /// Hill cipher için matris dosyası yolu.
    /// </summary>
    public string? MatrixFile { get; set; }

    // Vigenere
    
    /// <summary>
    /// Vigenere cipher için autokey modu.
    /// </summary>
    public bool AutoKey { get; set; } = false;

    // Playfair
    
    /// <summary>
    /// Playfair cipher için I ve J harflerinin aynı hücrede birleştirilip birleştirilmeyeceği.
    /// true: I ve J aynı hücre (varsayılan), false: J çıkarılır.
    /// </summary>
    public bool IJMerge { get; set; } = true;

    /// <summary>
    /// Playfair ve diğer cipherlarda padding için kullanılacak karakter.
    /// Varsayılan: 'X'
    /// </summary>
    public char PadChar { get; set; } = 'X';

    // Differential XOR (Fun)
    
    /// <summary>
    /// Differential XOR cipher için passphrase.
    /// Varsayılan: "Hopes and dreams of a million years"
    /// </summary>
    public string Passphrase { get; set; } = "Hopes and dreams of a million years";

    /// <summary>
    /// Differential XOR için blok boyutu (bit cinsinden).
    /// Varsayılan: 64 bit = 8 byte
    /// </summary>
    public int BlockSize { get; set; } = 64;

    /// <summary>
    /// Differential XOR decrypt için girdi hex formatında mı?
    /// </summary>
    public bool HexInput { get; set; } = false;
}
