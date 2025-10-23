namespace ClassicalCipherSuite;

/// <summary>
/// Metin normalizasyonu için yardımcı sınıf.
/// Türkçe karakterleri kaldırır/kontrol eder ve metni şifreleme için hazırlar.
/// </summary>
public static class TextNormalizer
{
    /// <summary>
    /// Şifreleme için metni normalize eder.
    /// - ASCII A-Z dışında kalan karakterleri kontrol eder/kaldırır
    /// - StrictAscii=true ise Türkçe karakter varsa hata fırlatır
    /// - PreserveNonLetters seçeneğine göre harf olmayan karakterleri korur veya kaldırır
    /// </summary>
    public static string NormalizeForEncryption(string input, CipherOptions options)
    {
        if (string.IsNullOrEmpty(input))
            return string.Empty;

        var result = new System.Text.StringBuilder();
        
        foreach (char c in input)
        {
            // Türkçe özel karakterleri kontrol et
            if (IsTurkishSpecialChar(c))
            {
                if (options.StrictAscii)
                {
                    throw new ArgumentException(
                        $"Girdi stringi ASCII A-Z dışında karakter içeriyor ('{c}'). " +
                        "StrictAscii=true olduğu için işlem iptal edildi. " +
                        "Eğer bu karakterleri görmezden gelmek isterseniz --strict-ascii=false ile yeniden çalıştırın.");
                }
                // StrictAscii=false ise bu karakteri atla
                continue;
            }

            // ASCII A-Z veya a-z harfi mi?
            if (char.IsLetter(c) && c <= 127)
            {
                result.Append(options.UseUppercaseOutput ? char.ToUpper(c) : char.ToLower(c));
            }
            else if (!char.IsLetter(c))
            {
                // Harf olmayan karakter (rakam, boşluk, noktalama vb.)
                if (options.PreserveNonLetters)
                {
                    result.Append(c);
                }
                // PreserveNonLetters=false ise kaldır (hiçbir şey ekleme)
            }
            else
            {
                // ASCII dışı başka harf (örn: aksan işaretli Latin harfleri)
                if (options.StrictAscii)
                {
                    throw new ArgumentException(
                        $"Girdi stringi ASCII A-Z dışında harf içeriyor ('{c}'). " +
                        "StrictAscii=true olduğu için işlem iptal edildi.");
                }
            }
        }

        return result.ToString();
    }

    /// <summary>
    /// Deşifreleme için metni normalize eder.
    /// Genellikle şifreli metin zaten temiz olduğu için basit normalizasyon yapılır.
    /// </summary>
    public static string NormalizeForDecryption(string input, CipherOptions options)
    {
        if (string.IsNullOrEmpty(input))
            return string.Empty;

        // Decrypt genellikle şifreli metinle çalışır, bu yüzden temiz kabul edilir
        // Ama yine de büyük/küçük harf normalize edilebilir
        var result = new System.Text.StringBuilder();
        
        foreach (char c in input)
        {
            if (char.IsLetter(c) && c <= 127)
            {
                result.Append(options.UseUppercaseOutput ? char.ToUpper(c) : char.ToLower(c));
            }
            else if (options.PreserveNonLetters || !char.IsLetter(c))
            {
                result.Append(c);
            }
        }

        return result.ToString();
    }

    /// <summary>
    /// Verilen karakterin Türkçe özel karakterlerinden biri olup olmadığını kontrol eder.
    /// </summary>
    private static bool IsTurkishSpecialChar(char c)
    {
        // Türkçe özel karakterler: Ç ç Ğ ğ İ ı Ö ö Ş ş Ü ü
        return c == 'Ç' || c == 'ç' ||
               c == 'Ğ' || c == 'ğ' ||
               c == 'İ' || c == 'ı' ||
               c == 'Ö' || c == 'ö' ||
               c == 'Ş' || c == 'ş' ||
               c == 'Ü' || c == 'ü';
    }

    /// <summary>
    /// Yalnızca A-Z harflerini filtreler (diğer karakterleri kaldırır).
    /// </summary>
    public static string FilterLettersOnly(string input, bool uppercase = true)
    {
        var result = new System.Text.StringBuilder();
        foreach (char c in input)
        {
            if (char.IsLetter(c) && c <= 127)
            {
                result.Append(uppercase ? char.ToUpper(c) : char.ToLower(c));
            }
        }
        return result.ToString();
    }
}
