using System.Text;

namespace ClassicalCipherSuite.Ciphers;

/// <summary>
/// Differential XOR Cipher (Fun Cipher) implementasyonu.
/// Python EncryptForFun/DecryptForFun ile uyumlu blok-tabanlı XOR şifreleme.
/// 
/// Algoritma:
/// 1. Passphrase'den IV (Initialization Vector) türet
/// 2. Key/Passphrase'den KEY block türet
/// 3. Plaintext'i B-byte bloklara böl
/// 4. Her blok: C[i] = (P[i] XOR KEY) XOR C[i-1], C[-1] = IV
/// 5. Hex output (lowercase, no separators)
/// 
/// Decrypt tersi: P[i] = (C[i] XOR C[i-1]) XOR KEY
/// </summary>
public class DifferentialXorCipher : ICipher
{
    public string Encrypt(string plaintext, CipherOptions options)
    {
        // Differential XOR metni olduğu gibi kullanır (byte olarak)
        byte[] plaintextBytes = Encoding.UTF8.GetBytes(plaintext);
        
        int blockSizeBytes = options.BlockSize / 8; // BlockSize bit cinsinden
        if (blockSizeBytes <= 0)
        {
            blockSizeBytes = 8; // Varsayılan 64 bit = 8 byte
        }

        // IV ve KEY türet
        byte[] iv = DeriveIV(options.Passphrase, blockSizeBytes);
        string keySource = string.IsNullOrEmpty(options.Key) ? options.Passphrase : options.Key;
        byte[] keyBlock = DeriveKeyBlock(keySource, blockSizeBytes);

        // Bloklara böl ve şifrele
        List<byte[]> blocks = SplitIntoBlocks(plaintextBytes, blockSizeBytes);
        List<byte[]> encryptedBlocks = new List<byte[]>();

        byte[] previousBlock = iv;
        
        foreach (byte[] plainBlock in blocks)
        {
            // C[i] = (P[i] XOR KEY) XOR C[i-1]
            byte[] xorWithKey = XorBlocks(plainBlock, keyBlock);
            byte[] cipherBlock = XorBlocks(xorWithKey, previousBlock);
            
            encryptedBlocks.Add(cipherBlock);
            previousBlock = cipherBlock;
        }

        // Hex çıktısı (lowercase, no separators)
        return BytesToHex(encryptedBlocks);
    }

    public string Decrypt(string ciphertext, CipherOptions options)
    {
        int blockSizeBytes = options.BlockSize / 8;
        if (blockSizeBytes <= 0)
        {
            blockSizeBytes = 8;
        }

        // Hex'ten byte'lara çevir
        byte[] cipherBytes;
        if (options.HexInput || IsHexString(ciphertext))
        {
            cipherBytes = HexToBytes(ciphertext);
        }
        else
        {
            throw new ArgumentException("Differential XOR decrypt için girdi hex formatında olmalıdır (--hex-in true).");
        }

        if (cipherBytes.Length % blockSizeBytes != 0)
        {
            throw new ArgumentException($"Şifreli metin uzunluğu blok boyutunun ({blockSizeBytes} byte) katı olmalıdır.");
        }

        // IV ve KEY türet
        byte[] iv = DeriveIV(options.Passphrase, blockSizeBytes);
        string keySource = string.IsNullOrEmpty(options.Key) ? options.Passphrase : options.Key;
        byte[] keyBlock = DeriveKeyBlock(keySource, blockSizeBytes);

        // Bloklara böl
        List<byte[]> cipherBlocks = new List<byte[]>();
        for (int i = 0; i < cipherBytes.Length; i += blockSizeBytes)
        {
            byte[] block = new byte[blockSizeBytes];
            Array.Copy(cipherBytes, i, block, 0, blockSizeBytes);
            cipherBlocks.Add(block);
        }

        // Decrypt
        List<byte[]> plainBlocks = new List<byte[]>();
        byte[] previousBlock = iv;

        foreach (byte[] cipherBlock in cipherBlocks)
        {
            // P[i] = (C[i] XOR C[i-1]) XOR KEY
            byte[] xorWithPrev = XorBlocks(cipherBlock, previousBlock);
            byte[] plainBlock = XorBlocks(xorWithPrev, keyBlock);
            
            plainBlocks.Add(plainBlock);
            previousBlock = cipherBlock;
        }

        // Byte'ları string'e çevir ve trailing null'ları temizle
        byte[] allPlainBytes = plainBlocks.SelectMany(b => b).ToArray();
        
        // Padding (null bytes) temizle
        int lastNonZero = allPlainBytes.Length - 1;
        while (lastNonZero >= 0 && allPlainBytes[lastNonZero] == 0)
        {
            lastNonZero--;
        }
        
        byte[] trimmedBytes = new byte[lastNonZero + 1];
        Array.Copy(allPlainBytes, trimmedBytes, lastNonZero + 1);

        return Encoding.UTF8.GetString(trimmedBytes);
    }

    /// <summary>
    /// Passphrase'den IV türetir (deterministik).
    /// Python uyumluluğu için: passphrase byte'larını XOR fold ile B byte'a indirgeme.
    /// </summary>
    private byte[] DeriveIV(string passphrase, int blockSize)
    {
        byte[] passphraseBytes = Encoding.UTF8.GetBytes(passphrase);
        byte[] iv = new byte[blockSize];

        for (int i = 0; i < passphraseBytes.Length; i++)
        {
            iv[i % blockSize] ^= passphraseBytes[i];
        }

        return iv;
    }

    /// <summary>
    /// Key/Passphrase'den KEY block türetir (deterministik).
    /// </summary>
    private byte[] DeriveKeyBlock(string keySource, int blockSize)
    {
        byte[] keyBytes = Encoding.UTF8.GetBytes(keySource);
        byte[] keyBlock = new byte[blockSize];

        for (int i = 0; i < keyBytes.Length; i++)
        {
            keyBlock[i % blockSize] ^= keyBytes[i];
        }

        return keyBlock;
    }

    /// <summary>
    /// Byte array'ini bloklara böler (son blok padding ile doldurulur).
    /// </summary>
    private List<byte[]> SplitIntoBlocks(byte[] data, int blockSize)
    {
        var blocks = new List<byte[]>();
        int fullBlocks = data.Length / blockSize;
        int remainder = data.Length % blockSize;

        // Tam blokları ekle
        for (int i = 0; i < fullBlocks; i++)
        {
            byte[] block = new byte[blockSize];
            Array.Copy(data, i * blockSize, block, 0, blockSize);
            blocks.Add(block);
        }

        // Son blok padding gerekiyorsa
        if (remainder > 0 || data.Length == 0)
        {
            byte[] lastBlock = new byte[blockSize];
            if (remainder > 0)
            {
                Array.Copy(data, fullBlocks * blockSize, lastBlock, 0, remainder);
            }
            // Kalan kısım 0 ile doldurulur (default)
            blocks.Add(lastBlock);
        }

        return blocks;
    }

    /// <summary>
    /// İki byte array'ini XOR'lar.
    /// </summary>
    private byte[] XorBlocks(byte[] a, byte[] b)
    {
        int len = Math.Min(a.Length, b.Length);
        byte[] result = new byte[len];
        
        for (int i = 0; i < len; i++)
        {
            result[i] = (byte)(a[i] ^ b[i]);
        }

        return result;
    }

    /// <summary>
    /// Byte blokları listesini hex string'e çevirir (lowercase, no separators).
    /// </summary>
    private string BytesToHex(List<byte[]> blocks)
    {
        var sb = new StringBuilder();
        foreach (byte[] block in blocks)
        {
            foreach (byte b in block)
            {
                sb.Append(b.ToString("x2"));
            }
        }
        return sb.ToString();
    }

    /// <summary>
    /// Hex string'i byte array'e çevirir.
    /// </summary>
    private byte[] HexToBytes(string hex)
    {
        // Boşlukları ve gereksiz karakterleri temizle
        hex = hex.Replace(" ", "").Replace("\n", "").Replace("\r", "");
        
        if (hex.Length % 2 != 0)
        {
            throw new ArgumentException("Hex string çift sayıda karakter içermelidir.");
        }

        byte[] bytes = new byte[hex.Length / 2];
        for (int i = 0; i < bytes.Length; i++)
        {
            bytes[i] = Convert.ToByte(hex.Substring(i * 2, 2), 16);
        }

        return bytes;
    }

    /// <summary>
    /// String'in hex formatında olup olmadığını kontrol eder.
    /// </summary>
    private bool IsHexString(string str)
    {
        if (string.IsNullOrEmpty(str))
            return false;

        str = str.Replace(" ", "").Replace("\n", "").Replace("\r", "");
        
        if (str.Length % 2 != 0)
            return false;

        return str.All(c => (c >= '0' && c <= '9') || (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F'));
    }
}
