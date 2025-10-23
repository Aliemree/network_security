using ClassicalCipherSuite;
using ClassicalCipherSuite.Ciphers;
using Xunit;

namespace ClassicalCipherSuite.Tests;

/// <summary>
/// Comprehensive roundtrip and functional tests for all cipher implementations.
/// Each test verifies that Decrypt(Encrypt(plaintext)) produces the original plaintext (normalized).
/// </summary>
public class CipherRoundtripTests
{
    #region Caesar Cipher Tests

    [Fact]
    public void CaesarCipher_BasicRoundtrip_Success()
    {
        // Arrange
        var cipher = new CaesarCipher();
        var options = new CipherOptions
        {
            Shift = 3,
            StrictAscii = true,
            UseUppercaseOutput = true
        };
        string plaintext = "ATTACKATDAWN";

        // Act
        string encrypted = cipher.Encrypt(plaintext, options);
        string decrypted = cipher.Decrypt(encrypted, options);

        // Assert
        Assert.Equal("DWWDFNDWGDZQ", encrypted);
        Assert.Equal(plaintext, decrypted);
    }

    [Fact]
    public void CaesarCipher_NegativeShift_Success()
    {
        // Arrange
        var cipher = new CaesarCipher();
        var options = new CipherOptions
        {
            Shift = -5,
            StrictAscii = true,
            UseUppercaseOutput = true
        };
        string plaintext = "HELLO";

        // Act
        string encrypted = cipher.Encrypt(plaintext, options);
        string decrypted = cipher.Decrypt(encrypted, options);

        // Assert
        Assert.Equal(plaintext, decrypted);
    }

    #endregion

    #region Monoalphabetic Cipher Tests

    [Fact]
    public void MonoalphabeticCipher_WithKeyword_Roundtrip()
    {
        // Arrange
        var cipher = new MonoalphabeticCipher();
        var options = new CipherOptions
        {
            Keyword = "CIPHER",
            StrictAscii = true,
            UseUppercaseOutput = true
        };
        string plaintext = "ATTACKATDAWN";

        // Act
        string encrypted = cipher.Encrypt(plaintext, options);
        string decrypted = cipher.Decrypt(encrypted, options);

        // Assert
        Assert.NotEqual(plaintext, encrypted);
        Assert.Equal(plaintext, decrypted);
    }

    [Fact]
    public void MonoalphabeticCipher_With26CharKey_Roundtrip()
    {
        // Arrange
        var cipher = new MonoalphabeticCipher();
        var options = new CipherOptions
        {
            Key = "ZEBRASCDFGHIJKLMNOPQTUVWXY",
            StrictAscii = true,
            UseUppercaseOutput = true
        };
        string plaintext = "HELLO";

        // Act
        string encrypted = cipher.Encrypt(plaintext, options);
        string decrypted = cipher.Decrypt(encrypted, options);

        // Assert
        Assert.Equal(plaintext, decrypted);
    }

    #endregion

    #region Vigenere Cipher Tests

    [Fact]
    public void VigenereCipher_ClassicExample_Success()
    {
        // Arrange
        var cipher = new VigenereCipher();
        var options = new CipherOptions
        {
            Key = "LEMON",
            StrictAscii = true,
            UseUppercaseOutput = true
        };
        string plaintext = "ATTACKATDAWN";

        // Act
        string encrypted = cipher.Encrypt(plaintext, options);
        string decrypted = cipher.Decrypt(encrypted, options);

        // Assert
        Assert.Equal("LXFOPVEFRNHR", encrypted);
        Assert.Equal(plaintext, decrypted);
    }

    [Fact]
    public void VigenereCipher_AutokeyMode_Roundtrip()
    {
        // Arrange
        var cipher = new VigenereCipher();
        var options = new CipherOptions
        {
            Key = "KEY",
            AutoKey = true,
            StrictAscii = true,
            UseUppercaseOutput = true
        };
        string plaintext = "HELLOWORLD";

        // Act
        string encrypted = cipher.Encrypt(plaintext, options);
        string decrypted = cipher.Decrypt(encrypted, options);

        // Assert
        Assert.NotEqual(plaintext, encrypted);
        Assert.Equal(plaintext, decrypted);
    }

    #endregion

    #region Playfair Cipher Tests

    [Fact]
    public void PlayfairCipher_BasicExample_Roundtrip()
    {
        // Arrange
        var cipher = new PlayfairCipher();
        var options = new CipherOptions
        {
            Key = "MONARCHY",
            IJMerge = true,
            PadChar = 'X',
            StrictAscii = true,
            UseUppercaseOutput = true
        };
        string plaintext = "HIDETHEGOLD";

        // Act
        string encrypted = cipher.Encrypt(plaintext, options);
        string decrypted = cipher.Decrypt(encrypted, options);

        // Assert
        Assert.NotEqual(plaintext, encrypted);
        // Playfair may add padding, so check if decrypted starts with plaintext
        Assert.StartsWith(plaintext, decrypted);
    }

    [Fact]
    public void PlayfairCipher_DoubleLetter_Roundtrip()
    {
        // Arrange
        var cipher = new PlayfairCipher();
        var options = new CipherOptions
        {
            Key = "PLAYFAIR",
            IJMerge = true,
            PadChar = 'X',
            StrictAscii = true,
            UseUppercaseOutput = true
        };
        string plaintext = "BALLOON";

        // Act
        string encrypted = cipher.Encrypt(plaintext, options);
        string decrypted = cipher.Decrypt(encrypted, options);

        // Assert
        // BALLOON has double L, so Playfair inserts X between them: BAL-XO-ON
        Assert.NotEqual(plaintext, encrypted);
        // Decrypt will have the X padding from double-L handling
        Assert.StartsWith("BAL", decrypted);
        Assert.Contains("OON", decrypted);
    }

    #endregion

    #region Hill Cipher Tests

    [Fact]
    public void HillCipher_2x2Matrix_Roundtrip()
    {
        // Arrange
        var cipher = new HillCipherNxN();
        var options = new CipherOptions
        {
            Matrix = "3,3;2,5", // det = 15-6 = 9, gcd(9,26) = 1, invertible
            PadChar = 'X',
            StrictAscii = true,
            UseUppercaseOutput = true
        };
        string plaintext = "HELP";

        // Act
        string encrypted = cipher.Encrypt(plaintext, options);
        string decrypted = cipher.Decrypt(encrypted, options);

        // Assert
        Assert.NotEqual(plaintext, encrypted);
        Assert.Equal(plaintext, decrypted);
    }

    [Fact]
    public void HillCipher_3x3Matrix_Roundtrip()
    {
        // Arrange
        var cipher = new HillCipherNxN();
        var options = new CipherOptions
        {
            Matrix = "6,24,1;13,16,10;20,17,15", // Invertible 3x3 matrix mod 26
            PadChar = 'X',
            StrictAscii = true,
            UseUppercaseOutput = true
        };
        string plaintext = "ACTACT";

        // Act
        string encrypted = cipher.Encrypt(plaintext, options);
        string decrypted = cipher.Decrypt(encrypted, options);

        // Assert
        Assert.NotEqual(plaintext, encrypted);
        Assert.Equal(plaintext, decrypted);
    }

    #endregion

    #region Columnar Transposition Tests

    [Fact]
    public void ColumnarTransposition_BasicExample_Roundtrip()
    {
        // Arrange
        var cipher = new ColumnarTranspositionCipher();
        var options = new CipherOptions
        {
            Key = "ZEBRA",
            PadChar = 'X',
            StrictAscii = true,
            UseUppercaseOutput = true
        };
        string plaintext = "MEETMEATMIDNIGHT";

        // Act
        string encrypted = cipher.Encrypt(plaintext, options);
        string decrypted = cipher.Decrypt(encrypted, options);

        // Assert
        Assert.NotEqual(plaintext, encrypted);
        Assert.StartsWith(plaintext, decrypted); // May have padding
    }

    [Fact]
    public void ColumnarTransposition_ShortKey_Roundtrip()
    {
        // Arrange
        var cipher = new ColumnarTranspositionCipher();
        var options = new CipherOptions
        {
            Key = "KEY",
            PadChar = 'X',
            StrictAscii = true,
            UseUppercaseOutput = true
        };
        string plaintext = "HELLOWORLD";

        // Act
        string encrypted = cipher.Encrypt(plaintext, options);
        string decrypted = cipher.Decrypt(encrypted, options);

        // Assert
        Assert.NotEqual(plaintext, encrypted);
        Assert.StartsWith(plaintext, decrypted);
    }

    #endregion

    #region Differential XOR (Fun) Tests

    [Fact]
    public void DifferentialXOR_SmallMessage_Roundtrip()
    {
        // Arrange
        var cipher = new DifferentialXorCipher();
        var options = new CipherOptions
        {
            Passphrase = "TestPassphrase",
            BlockSize = 64
        };
        string plaintext = "Hello, World!";

        // Act
        string encrypted = cipher.Encrypt(plaintext, options);
        options.HexInput = true;
        string decrypted = cipher.Decrypt(encrypted, options);

        // Assert
        Assert.NotEqual(plaintext, encrypted);
        Assert.True(encrypted.All(c => (c >= '0' && c <= '9') || (c >= 'a' && c <= 'f')));
        Assert.Equal(plaintext, decrypted);
    }

    [Fact]
    public void DifferentialXOR_CustomKeyAndPassphrase_Roundtrip()
    {
        // Arrange
        var cipher = new DifferentialXorCipher();
        var options = new CipherOptions
        {
            Passphrase = "Hopes and dreams of a million years",
            Key = "MySecretKey",
            BlockSize = 64
        };
        string plaintext = "This is a test message for XOR encryption.";

        // Act
        string encrypted = cipher.Encrypt(plaintext, options);
        options.HexInput = true;
        string decrypted = cipher.Decrypt(encrypted, options);

        // Assert
        Assert.NotEqual(plaintext, encrypted);
        Assert.Equal(plaintext, decrypted);
    }

    [Fact]
    public void DifferentialXOR_EmptyString_Roundtrip()
    {
        // Arrange
        var cipher = new DifferentialXorCipher();
        var options = new CipherOptions
        {
            Passphrase = "Test",
            BlockSize = 64
        };
        string plaintext = "";

        // Act
        string encrypted = cipher.Encrypt(plaintext, options);
        options.HexInput = true;
        string decrypted = cipher.Decrypt(encrypted, options);

        // Assert
        Assert.Equal(string.Empty, decrypted);
    }

    #endregion

    #region Base64 Tests

    [Fact]
    public void Base64_BasicEncodeDecode_Success()
    {
        // Arrange
        var util = new Base64Util();
        var options = new CipherOptions();
        string plaintext = "Hello, World!";

        // Act
        string encoded = util.Encrypt(plaintext, options);
        string decoded = util.Decrypt(encoded, options);

        // Assert
        Assert.Equal("SGVsbG8sIFdvcmxkIQ==", encoded);
        Assert.Equal(plaintext, decoded);
    }

    [Fact]
    public void Base64_BinaryData_Roundtrip()
    {
        // Arrange
        var util = new Base64Util();
        var options = new CipherOptions();
        string plaintext = "Binary data: \x00\x01\x02\xFF";

        // Act
        string encoded = util.Encrypt(plaintext, options);
        string decoded = util.Decrypt(encoded, options);

        // Assert
        Assert.NotEqual(plaintext, encoded);
        Assert.Equal(plaintext, decoded);
    }

    #endregion

    #region TextNormalizer Tests

    [Fact]
    public void TextNormalizer_TurkishCharacter_ThrowsException()
    {
        // Arrange
        var options = new CipherOptions
        {
            StrictAscii = true
        };
        string inputWithTurkish = "Merhaba dünya"; // Contains 'ü'

        // Act & Assert
        var exception = Assert.Throws<ArgumentException>(() =>
            TextNormalizer.NormalizeForEncryption(inputWithTurkish, options));
        
        Assert.Contains("ASCII A-Z dışında", exception.Message);
    }

    [Fact]
    public void TextNormalizer_TurkishCharacter_RemovesWhenNotStrict()
    {
        // Arrange
        var options = new CipherOptions
        {
            StrictAscii = false,
            UseUppercaseOutput = true
        };
        string inputWithTurkish = "Merhaba dünya";

        // Act
        string normalized = TextNormalizer.NormalizeForEncryption(inputWithTurkish, options);

        // Assert
        Assert.DoesNotContain("ü", normalized);
        Assert.Equal("MERHABADNYA", normalized);
    }

    [Fact]
    public void TextNormalizer_PreserveNonLetters_Success()
    {
        // Arrange
        var options = new CipherOptions
        {
            StrictAscii = true,
            PreserveNonLetters = true,
            UseUppercaseOutput = true
        };
        string input = "Hello, World! 123";

        // Act
        string normalized = TextNormalizer.NormalizeForEncryption(input, options);

        // Assert
        Assert.Equal("HELLO, WORLD! 123", normalized);
    }

    #endregion

    #region Integration Tests

    [Fact]
    public void AllCiphers_EmptyString_HandledGracefully()
    {
        // Test all ciphers with empty string
        var ciphers = new List<(ICipher cipher, CipherOptions options)>
        {
            (new CaesarCipher(), new CipherOptions { Shift = 3 }),
            (new VigenereCipher(), new CipherOptions { Key = "KEY" }),
            (new Base64Util(), new CipherOptions())
        };

        foreach (var (cipher, options) in ciphers)
        {
            string encrypted = cipher.Encrypt("", options);
            options.HexInput = true; // For XOR
            string decrypted = cipher.Decrypt(encrypted, options);
            
            Assert.True(string.IsNullOrEmpty(decrypted), $"{cipher.GetType().Name} failed on empty string");
        }
    }

    #endregion
}
