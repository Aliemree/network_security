using ClassicalCipherSuite.Ciphers;

namespace ClassicalCipherSuite;

/// <summary>
/// Klasik Şifreleme Koleksiyonu - Ana Program
/// Komut satırı arayüzü ile 8 farklı şifreleme algoritmasını destekler.
/// </summary>
class Program
{
    static void Main(string[] args)
    {
        try
        {
            if (args.Length == 0 || args.Contains("--help") || args.Contains("-h"))
            {
                PrintUsage();
                return;
            }

            var options = ParseArguments(args);
            
            // Cipher seçimi
            ICipher? cipher = options.CipherType?.ToLower() switch
            {
                "caesar" => new CaesarCipher(),
                "mono" or "monoalphabetic" => new MonoalphabeticCipher(),
                "playfair" => new PlayfairCipher(),
                "hill" => new HillCipherNxN(),
                "vigenere" or "vig" => new VigenereCipher(),
                "columnar" or "transposition" => new ColumnarTranspositionCipher(),
                "fun" or "xor" or "differential" => new DifferentialXorCipher(),
                "base64" or "b64" => new Base64Util(),
                _ => null
            };

            if (cipher == null)
            {
                Console.WriteLine($"Hata: Bilinmeyen şifreleme türü '{options.CipherType}'");
                Console.WriteLine("Desteklenen tipler: caesar, mono, playfair, hill, vigenere, columnar, fun, base64");
                return;
            }

            // Girdi oku
            string input = ReadInput(options.InputFile);
            
            // Şifreleme/Deşifreleme
            string output;
            if (options.Mode == "enc" || options.Mode == "encrypt")
            {
                output = cipher.Encrypt(input, options.CipherOptions);
            }
            else if (options.Mode == "dec" || options.Mode == "decrypt")
            {
                output = cipher.Decrypt(input, options.CipherOptions);
            }
            else
            {
                Console.WriteLine($"Hata: Bilinmeyen mod '{options.Mode}'. Kullanım: --mode enc veya --mode dec");
                return;
            }

            // Çıktı yaz
            WriteOutput(options.OutputFile, output);
            
            if (string.IsNullOrEmpty(options.OutputFile))
            {
                Console.WriteLine(output);
            }
            else
            {
                Console.WriteLine($"Çıktı başarıyla yazıldı: {options.OutputFile}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"HATA: {ex.Message}");
            Environment.Exit(1);
        }
    }

    static CommandLineOptions ParseArguments(string[] args)
    {
        var options = new CommandLineOptions
        {
            CipherOptions = new CipherOptions()
        };

        for (int i = 0; i < args.Length; i++)
        {
            string arg = args[i];
            string? value = i + 1 < args.Length ? args[i + 1] : null;

            switch (arg.ToLower())
            {
                case "--cipher":
                case "-c":
                    options.CipherType = value;
                    i++;
                    break;

                case "--mode":
                case "-m":
                    options.Mode = value ?? "enc";
                    i++;
                    break;

                case "--in":
                case "--input":
                    options.InputFile = value;
                    i++;
                    break;

                case "--out":
                case "--output":
                    options.OutputFile = value;
                    i++;
                    break;

                case "--key":
                case "-k":
                    options.CipherOptions.Key = value;
                    i++;
                    break;

                case "--keyword":
                    options.CipherOptions.Keyword = value;
                    i++;
                    break;

                case "--shift":
                case "-s":
                    if (int.TryParse(value, out int shift))
                    {
                        options.CipherOptions.Shift = shift;
                        i++;
                    }
                    break;

                case "--matrix":
                    options.CipherOptions.Matrix = value;
                    i++;
                    break;

                case "--matrix-file":
                    options.CipherOptions.MatrixFile = value;
                    i++;
                    break;

                case "--passphrase":
                case "-p":
                    if (!string.IsNullOrEmpty(value))
                    {
                        options.CipherOptions.Passphrase = value;
                        i++;
                    }
                    break;

                case "--blocksize":
                case "-b":
                    if (int.TryParse(value, out int blockSize))
                    {
                        options.CipherOptions.BlockSize = blockSize;
                        i++;
                    }
                    break;

                case "--preserve-nonletters":
                    options.CipherOptions.PreserveNonLetters = ParseBool(value);
                    i++;
                    break;

                case "--strict-ascii":
                    options.CipherOptions.StrictAscii = ParseBool(value);
                    i++;
                    break;

                case "--uppercase":
                    options.CipherOptions.UseUppercaseOutput = ParseBool(value);
                    i++;
                    break;

                case "--ij-merge":
                    options.CipherOptions.IJMerge = ParseBool(value);
                    i++;
                    break;

                case "--padchar":
                    if (!string.IsNullOrEmpty(value) && value.Length > 0)
                    {
                        options.CipherOptions.PadChar = value[0];
                        i++;
                    }
                    break;

                case "--autokey":
                    options.CipherOptions.AutoKey = ParseBool(value);
                    i++;
                    break;

                case "--hex-in":
                case "--hex-input":
                    options.CipherOptions.HexInput = ParseBool(value);
                    i++;
                    break;
            }
        }

        return options;
    }

    static bool ParseBool(string? value)
    {
        if (value == null) return true;
        return value.ToLower() == "true" || value == "1" || value.ToLower() == "yes";
    }

    static string ReadInput(string? inputFile)
    {
        if (!string.IsNullOrEmpty(inputFile))
        {
            if (!File.Exists(inputFile))
            {
                throw new FileNotFoundException($"Girdi dosyası bulunamadı: {inputFile}");
            }
            return File.ReadAllText(inputFile);
        }

        // stdin veya prompt
        if (Console.IsInputRedirected)
        {
            return Console.In.ReadToEnd();
        }

        Console.Write("Metin girin (Enter ile bitirin): ");
        return Console.ReadLine() ?? string.Empty;
    }

    static void WriteOutput(string? outputFile, string content)
    {
        if (!string.IsNullOrEmpty(outputFile))
        {
            File.WriteAllText(outputFile, content);
        }
    }

    static void PrintUsage()
    {
        Console.WriteLine(@"
Klasik Şifreleme Koleksiyonu - Classical Cipher Suite
======================================================

KULLANIM:
  ClassicalCipherSuite --cipher <tür> --mode <enc|dec> [seçenekler]

ZORUNLU PARAMETRELER:
  --cipher, -c <tür>     Şifreleme türü: caesar, mono, playfair, hill, vigenere, columnar, fun, base64
  --mode, -m <mod>       İşlem modu: enc (şifreleme) veya dec (deşifreleme)

GİRDİ/ÇIKTI:
  --in, --input <dosya>  Girdi dosyası (belirtilmezse stdin veya prompt)
  --out, --output <dosya> Çıktı dosyası (belirtilmezse stdout)

GENEL SEÇENEKLER:
  --strict-ascii <bool>         Türkçe karakter kontrolü (varsayılan: true)
  --preserve-nonletters <bool>  Harf olmayan karakterleri koru (varsayılan: false)
  --uppercase <bool>            Çıktı büyük harf olsun (varsayılan: true)

ALGORİTMA-ÖZGÜ PARAMETRELER:

  Caesar Cipher:
    --shift, -s <sayı>           Kaydırma miktarı (örn: 3, -5)

  Monoalphabetic:
    --key <26 harf>              26 harflik anahtar permütasyonu
    --keyword <kelime>           Anahtar kelimeden türet

  Playfair:
    --key <kelime>               Anahtar kelime
    --ij-merge <bool>            I ve J aynı hücrede (varsayılan: true)
    --padchar <harf>             Padding karakteri (varsayılan: X)

  Hill:
    --matrix <matris>            Matris (örn: ""3,3;2,5"")
    --matrix-file <dosya>        Matris dosyası

  Vigenere:
    --key <kelime>               Anahtar kelime
    --autokey <bool>             Autokey modu (varsayılan: false)

  Columnar Transposition:
    --key <sıra>                 Sütun sırası anahtarı

  Differential XOR (Fun):
    --passphrase, -p <metin>     Passphrase (varsayılan: ""Hopes and dreams..."")
    --key <metin>                Anahtar (opsiyonel)
    --blocksize, -b <bit>        Blok boyutu bit cinsinden (varsayılan: 64)
    --hex-in <bool>              Girdi hex formatında (decrypt için)

ÖRNEKLER:

  # Caesar cipher ile şifreleme (shift=3)
  ClassicalCipherSuite --cipher caesar --mode enc --shift 3 --in plain.txt --out cipher.txt

  # Vigenere cipher ile deşifreleme
  ClassicalCipherSuite --cipher vigenere --mode dec --key LEMON --in cipher.txt

  # Hill cipher (2x2 matris)
  ClassicalCipherSuite --cipher hill --mode enc --matrix ""3,3;2,5"" --in message.txt

  # Playfair cipher
  ClassicalCipherSuite --cipher playfair --mode enc --key MONARCHY --in message.txt

  # Differential XOR (Fun)
  ClassicalCipherSuite --cipher fun --mode enc --passphrase ""secret"" --in data.txt

  # Base64 encode
  ClassicalCipherSuite --cipher base64 --mode enc --in data.bin --out data.b64

NOT: Tüm metin işlemlerinde TÜRKÇE KARAKTER (ç,ğ,ı,ö,ş,ü) KULLANILAMAZ!
     --strict-ascii=true olduğunda Türkçe karakter varsa hata verilir.

Daha fazla bilgi için README.md dosyasına bakınız.
");
    }
}

class CommandLineOptions
{
    public string? CipherType { get; set; }
    public string Mode { get; set; } = "enc";
    public string? InputFile { get; set; }
    public string? OutputFile { get; set; }
    public CipherOptions CipherOptions { get; set; } = new CipherOptions();
}
