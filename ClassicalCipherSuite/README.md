# Klasik Şifreleme Koleksiyonu (Classical Cipher Suite)

## 📖 Proje Hakkında

Bu proje, klasik kriptografi derslerinde öğretilen 8 farklı şifreleme algoritmasının eksiksiz C# .NET 8 implementasyonudur. Akademik çalışmalar ve eğitim amaçlı geliştirilmiştir.

### ✨ Desteklenen Algoritmalar

1. **Caesar Cipher** - Sabit kaydırmalı yerine koyma şifresi
2. **Monoalphabetic Substitution** - Tek permütasyonlu yerine koyma
3. **Playfair Cipher** - 5×5 matris ile ikili harf şifrelemesi
4. **Hill Cipher (N×N)** - Matris tabanlı blok şifreleme
5. **Vigenère Cipher** - Polyalphabetic yerine koyma (autokey destekli)
6. **Columnar Transposition** - Sütun permütasyonlu yer değiştirme
7. **Differential XOR (Fun Cipher)** - Blok-tabanlı XOR şifreleme
8. **Base64** - Encoding/Decoding yardımcı aracı

## ⚠️ ÖNEMLİ UYARILAR

### Türkçe Karakter Yasağı

**TÜM METİN İŞLEMLERİNDE TÜRKÇE KARAKTER (Ç, Ğ, İ, Ö, Ş, Ü) KULLANILAMAZ!**

- Varsayılan olarak `--strict-ascii=true` aktiftir
- Türkçe karakter içeren girdi hata verecektir
- Eğer Türkçe karakterleri görmezden gelmek isterseniz: `--strict-ascii=false`

### ASCII A-Z Kuralı

- Yalnızca ASCII A-Z harfleri şifreleme işlemlerinde kullanılır
- Harf olmayan karakterler (rakam, boşluk, noktalama) `--preserve-nonletters` ile kontrol edilir

## 🚀 Kurulum ve Derleme

### Gereksinimler

- .NET 8 SDK veya üzeri
- Windows, macOS veya Linux

### Projeyi Derleme

```bash
# Proje dizinine gidin
cd ClassicalCipherSuite

# Bağımlılıkları yükleyin
dotnet restore src/ClassicalCipherSuite.csproj

# Projeyi derleyin
dotnet build src/ClassicalCipherSuite.csproj -c Release

# Uygulamayı çalıştırın
dotnet run --project src/ClassicalCipherSuite.csproj -- --help
```

## 🧪 Testleri Çalıştırma

```bash
# Test projesini çalıştır
dotnet test tests/ClassicalCipherSuite.Tests.csproj

# Detaylı çıktı ile
dotnet test tests/ClassicalCipherSuite.Tests.csproj -v detailed
```

Tüm testler başarıyla geçmelidir (roundtrip testleri, edge case'ler, Türkçe karakter kontrolü).

## 📦 Tek EXE Dosyası Üretme

### Windows için (x64)

```bash
dotnet publish src/ClassicalCipherSuite.csproj \
  -c Release \
  -r win-x64 \
  --self-contained true \
  /p:PublishSingleFile=true \
  /p:IncludeNativeLibrariesForSelfExtract=true \
  -o ./publish/win-x64
```

Çıktı: `./publish/win-x64/ClassicalCipherSuite.exe`

### Linux için (x64)

```bash
dotnet publish src/ClassicalCipherSuite.csproj \
  -c Release \
  -r linux-x64 \
  --self-contained true \
  /p:PublishSingleFile=true \
  -o ./publish/linux-x64
```

Çıktı: `./publish/linux-x64/ClassicalCipherSuite`

### macOS için (ARM64 - M1/M2/M3)

```bash
dotnet publish src/ClassicalCipherSuite.csproj \
  -c Release \
  -r osx-arm64 \
  --self-contained true \
  /p:PublishSingleFile=true \
  -o ./publish/osx-arm64
```

Çıktı: `./publish/osx-arm64/ClassicalCipherSuite`

### Desteklenen RID'ler

- `win-x64` - Windows 64-bit
- `win-x86` - Windows 32-bit
- `win-arm64` - Windows ARM64
- `linux-x64` - Linux 64-bit
- `linux-arm64` - Linux ARM64
- `osx-x64` - macOS Intel
- `osx-arm64` - macOS Apple Silicon (M1/M2/M3)

## 💻 Kullanım Örnekleri

### Temel Kullanım

```bash
ClassicalCipherSuite --cipher <algoritma> --mode <enc|dec> [parametreler]
```

### 1. Caesar Cipher

```bash
# Şifreleme (shift=3)
ClassicalCipherSuite --cipher caesar --mode enc --shift 3 --in samples/attack.txt --out cipher.txt

# Deşifreleme
ClassicalCipherSuite --cipher caesar --mode dec --shift 3 --in cipher.txt

# Negatif kaydırma
ClassicalCipherSuite --cipher caesar --mode enc --shift -5 --in message.txt
```

**Örnek:**
- Plaintext: `ATTACKATDAWN`
- Shift: `3`
- Ciphertext: `DWWDFNDWGDZQ`

### 2. Monoalphabetic Substitution

```bash
# Keyword ile şifreleme
ClassicalCipherSuite --cipher mono --mode enc --keyword CIPHER --in message.txt

# 26 harflik anahtar ile
ClassicalCipherSuite --cipher mono --mode enc --key ZEBRASCDFGHIJKLMNOPQTUVWXY --in message.txt

# Deşifreleme
ClassicalCipherSuite --cipher mono --mode dec --keyword CIPHER --in cipher.txt
```

### 3. Vigenère Cipher

```bash
# Klasik Vigenère
ClassicalCipherSuite --cipher vigenere --mode enc --key LEMON --in message.txt

# Autokey modu
ClassicalCipherSuite --cipher vigenere --mode enc --key SECRET --autokey true --in message.txt

# Deşifreleme
ClassicalCipherSuite --cipher vigenere --mode dec --key LEMON --in cipher.txt
```

**Klasik Örnek:**
- Plaintext: `ATTACKATDAWN`
- Key: `LEMON`
- Ciphertext: `LXFOPVEFRNHR`

### 4. Playfair Cipher

```bash
# Şifreleme
ClassicalCipherSuite --cipher playfair --mode enc --key MONARCHY --in message.txt

# I/J birleştirmesiz
ClassicalCipherSuite --cipher playfair --mode enc --key PLAYFAIR --ij-merge false --in message.txt

# Farklı padding karakteri
ClassicalCipherSuite --cipher playfair --mode enc --key SECRET --padchar Z --in message.txt

# Deşifreleme
ClassicalCipherSuite --cipher playfair --mode dec --key MONARCHY --in cipher.txt
```

**Not:** Playfair çift sayıda harf gerektirir, tek harf kalırsa padding eklenir.

### 5. Hill Cipher

```bash
# 2×2 matris ile şifreleme
ClassicalCipherSuite --cipher hill --mode enc --matrix "3,3;2,5" --in message.txt

# 3×3 matris ile
ClassicalCipherSuite --cipher hill --mode enc --matrix "6,24,1;13,16,10;20,17,15" --in message.txt

# Matris dosyası ile
ClassicalCipherSuite --cipher hill --mode enc --matrix-file key_matrix.txt --in message.txt

# Deşifreleme
ClassicalCipherSuite --cipher hill --mode dec --matrix "3,3;2,5" --in cipher.txt
```

**Matris Format Örnekleri:**

2×2 matris:
```
3,3;2,5
```

3×3 matris:
```
6,24,1;13,16,10;20,17,15
```

**⚠️ Önemli:** Hill matrisinin determinantı mod 26'da terslenebilir olmalıdır (`gcd(det, 26) = 1`).

Eğer hata alırsanız:
```
Hill matrisinin determinantı (X) mod 26'da terslenemiyor.
```

Matris elemanlarını değiştirip tekrar deneyin. Örnekler:
- ✅ İyi matrisler: `[[3,3],[2,5]]` (det=9), `[[2,3],[1,4]]` (det=5)
- ❌ Kötü matrisler: `[[2,4],[1,2]]` (det=0), `[[1,2],[2,4]]` (det=0)

### 6. Columnar Transposition

```bash
# Şifreleme
ClassicalCipherSuite --cipher columnar --mode enc --key ZEBRA --in message.txt

# Deşifreleme
ClassicalCipherSuite --cipher columnar --mode dec --key ZEBRA --in cipher.txt
```

**Örnek:**
- Plaintext: `MEETMEATMIDNIGHT`
- Key: `ZEBRA` (sütun sırası: 4,1,0,3,2)
- Ciphertext: (sütunlar yeniden düzenlenir)

### 7. Differential XOR (Fun Cipher)

```bash
# Varsayılan passphrase ile şifreleme
ClassicalCipherSuite --cipher fun --mode enc --in message.txt --out cipher.hex

# Özel passphrase
ClassicalCipherSuite --cipher fun --mode enc --passphrase "MySecret" --in data.txt --out data.hex

# Özel key ve passphrase
ClassicalCipherSuite --cipher fun --mode enc --passphrase "Pass" --key "KeyValue" --blocksize 128 --in data.txt

# Deşifreleme (hex input otomatik algılanır)
ClassicalCipherSuite --cipher fun --mode dec --passphrase "MySecret" --hex-in true --in cipher.hex

# Stdin/stdout kullanımı
echo "Hello World" | ClassicalCipherSuite --cipher fun --mode enc --passphrase "test"
```

**Parametreler:**
- `--passphrase`: Şifre cümlesi (varsayılan: "Hopes and dreams of a million years")
- `--key`: Anahtar (opsiyonel, yoksa passphrase kullanılır)
- `--blocksize`: Blok boyutu bit cinsinden (varsayılan: 64)
- `--hex-in`: Decrypt için hex girdi (otomatik algılanır)

**Çıktı:** Hex formatında (lowercase, separator yok)

**Python Uyumluluğu:**

Bu implementasyon Python EncryptForFun/DecryptForFun ile uyumludur. Aynı plaintext, key ve passphrase ile aynı hex çıktısını üretir.

Test için:
```bash
# C# ile şifrele
ClassicalCipherSuite --cipher fun --mode enc --passphrase "test" --in message.txt --out cs_output.hex

# Python ile şifrele (eğer Python kodu varsa)
python EncryptForFun.py message.txt test > py_output.hex

# Karşılaştır
diff cs_output.hex py_output.hex
```

### 8. Base64 Encoding/Decoding

```bash
# Encode
ClassicalCipherSuite --cipher base64 --mode enc --in data.bin --out data.b64

# Decode
ClassicalCipherSuite --cipher base64 --mode dec --in data.b64 --out data.bin

# Metin encode
echo "Hello, World!" | ClassicalCipherSuite --cipher base64 --mode enc
# Çıktı: SGVsbG8sIFdvcmxkIQ==
```

## 🎯 Genel CLI Parametreleri

### Zorunlu

- `--cipher, -c <tür>`: Algoritma (caesar, mono, playfair, hill, vigenere, columnar, fun, base64)
- `--mode, -m <mod>`: İşlem (enc veya dec)

### Girdi/Çıktı

- `--in, --input <dosya>`: Girdi dosyası (yoksa stdin/prompt)
- `--out, --output <dosya>`: Çıktı dosyası (yoksa stdout)

### Genel Seçenekler

- `--strict-ascii <bool>`: Türkçe karakter kontrolü (varsayılan: true)
- `--preserve-nonletters <bool>`: Harf olmayan karakterleri koru (varsayılan: false)
- `--uppercase <bool>`: Çıktı büyük harf (varsayılan: true)

### Algoritma-Özgü

Her algoritmanın özel parametreleri yukarıdaki örneklerde gösterilmiştir.

## 📊 Test Sonuçları ve Doğrulama

### Roundtrip Testleri

Tüm algoritmalar için: `Decrypt(Encrypt(plaintext)) == plaintext` (normalization farkları hariç)

```bash
dotnet test tests/ClassicalCipherSuite.Tests.csproj --filter "FullyQualifiedName~Roundtrip"
```

### Örnek Test Senaryoları

**Test 1: Caesar Roundtrip**
```
Input:  ATTACKATDAWN
Shift:  3
Cipher: DWWDFNDWGDZQ
Decrypt: ATTACKATDAWN ✓
```

**Test 2: Vigenère Classic**
```
Input:  ATTACKATDAWN
Key:    LEMON
Cipher: LXFOPVEFRNHR
Decrypt: ATTACKATDAWN ✓
```

**Test 3: Differential XOR**
```
Input:  Hello, World!
Pass:   TestPassphrase
Hex:    (varying based on IV/key derivation)
Decrypt: Hello, World! ✓
```

## 🔧 Troubleshooting

### Hill Cipher Hatası

```
Hill matrisinin determinantı (X) mod 26'da terslenemiyor.
```

**Çözüm:** Matris determinantı ile 26 aralarında asal olmalı. Farklı matris deneyin.

### Türkçe Karakter Hatası

```
Girdi stringi ASCII A-Z dışında karakter içeriyor ('ü').
```

**Çözüm:** 
- Metni düzeltin (Türkçe karakterleri kaldırın)
- Veya `--strict-ascii=false` ile çalıştırın (karakterler atlanır)

### Playfair Padding

Playfair decrypt sonrası padding karakterleri (X) görülebilir. Bu normaldir.

### Hex Format Hatası (Fun Cipher)

```
Hex string çift sayıda karakter içermelidir.
```

**Çözüm:** Decrypt için `--hex-in true` kullanın ve girdi dosyasının geçerli hex olduğundan emin olun.

## 📚 Akademik Referanslar

Bu implementasyonlar aşağıdaki klasik kriptografi kurallarına göre yapılmıştır:

1. **Caesar Cipher**: Substitution with fixed shift
2. **Monoalphabetic**: Single-alphabet substitution (vulnerable to frequency analysis)
3. **Playfair**: Digraph substitution with 5×5 matrix
4. **Hill**: Linear algebra based block cipher (mod 26)
5. **Vigenère**: Polyalphabetic substitution (Kasiski examination ile kırılabilir)
6. **Columnar Transposition**: Permutation cipher
7. **Differential XOR**: Block cipher with chaining
8. **Base64**: RFC 4648 standard encoding

## 🤝 Katkı ve Lisans

Bu proje akademik ödev amaçlıdır. Dış kütüphane kullanımı minimumda tutulmuştur (yalnızca .NET standart kütüphaneleri ve xUnit test framework'ü).

## 📧 İletişim ve Destek

Sorularınız için:
1. README.md dosyasını kontrol edin
2. `--help` komutu ile CLI yardımına bakın
3. Test dosyalarını inceleyin (`tests/CipherRoundtripTests.cs`)

## 🎓 Öğrenme Kaynakları

- **Caesar & Monoalphabetic**: Frekans analizi zayıflığı
- **Playfair**: Digraph özellikleri
- **Hill**: Matris tersi ve modular aritmetik
- **Vigenère**: Kasiski examination
- **Transposition**: Anagram özellikleri
- **XOR**: Bit-level operasyonlar ve IV kullanımı

---

**Versiyon:** 1.0  
**Tarih:** 2025  
**Platform:** .NET 8.0  
**Dil:** C# 12

**Başarılar! 🎉**
