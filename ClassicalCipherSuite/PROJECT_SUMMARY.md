# Klasik Şifreleme Koleksiyonu - Proje Dosyaları

## 📁 Proje Yapısı

```
ClassicalCipherSuite/
├── ClassicalCipherSuite.sln          # Visual Studio çözüm dosyası
├── README.md                          # Ana dokümantasyon (Türkçe)
├── QUICKSTART.md                      # Hızlı başlangıç kılavuzu
│
├── src/                               # Ana uygulama kodu
│   ├── ClassicalCipherSuite.csproj   # Proje tanımı
│   ├── Program.cs                     # CLI ana program
│   ├── ICipher.cs                     # Şifreleme arayüzü
│   ├── CipherOptions.cs               # Şifreleme seçenekleri
│   ├── TextNormalizer.cs              # Metin normalizasyon yardımcısı
│   │
│   └── Ciphers/                       # Şifreleme algoritmaları
│       ├── CaesarCipher.cs           # Caesar cipher
│       ├── MonoalphabeticCipher.cs   # Monoalphabetic substitution
│       ├── PlayfairCipher.cs         # Playfair cipher
│       ├── HillCipherNxN.cs          # Hill cipher (N×N matris)
│       ├── VigenereCipher.cs         # Vigenère cipher
│       ├── ColumnarTranspositionCipher.cs  # Columnar transposition
│       ├── DifferentialXorCipher.cs  # Differential XOR (Fun cipher)
│       └── Base64Util.cs             # Base64 encoding/decoding
│
├── tests/                             # Birim testleri
│   ├── ClassicalCipherSuite.Tests.csproj  # Test projesi
│   └── CipherRoundtripTests.cs       # Tüm cipher roundtrip testleri
│
└── samples/                           # Örnek dosyalar
    ├── attack.txt                     # Örnek plaintext dosyası
    └── encrypted_fun.hex              # Örnek şifreli hex dosyası
```

## 📊 Dosya İstatistikleri

### Kaynak Kod Dosyaları

| Dosya | Satır Sayısı (tahmini) | Açıklama |
|-------|------------------------|----------|
| Program.cs | ~340 | CLI argument parsing ve ana akış |
| ICipher.cs | ~30 | Temel arayüz tanımı |
| CipherOptions.cs | ~120 | Tüm parametreler ve ayarlar |
| TextNormalizer.cs | ~120 | Metin normalizasyon mantığı |
| CaesarCipher.cs | ~50 | En basit substitution cipher |
| MonoalphabeticCipher.cs | ~150 | Keyword-based key generation |
| PlayfairCipher.cs | ~200 | 5×5 matris, digraph işleme |
| HillCipherNxN.cs | ~220 | Matris işlemleri, modular inverse |
| VigenereCipher.cs | ~100 | Polyalphabetic + autokey |
| ColumnarTranspositionCipher.cs | ~120 | Sütun permütasyonu |
| DifferentialXorCipher.cs | ~250 | Block XOR, IV derivation, hex I/O |
| Base64Util.cs | ~35 | Basit wrapper |
| CipherRoundtripTests.cs | ~300 | 21 kapsamlı test |
| **TOPLAM** | **~2,035 satır** | **12 sınıf, 8 algoritma** |

### Test Kapsamı

- ✅ 21 test senaryosu
- ✅ Tüm algoritmalar için roundtrip testleri
- ✅ Edge case'ler (boş string, Türkçe karakter, padding)
- ✅ Integration testleri
- ✅ %100 başarı oranı

## 🎯 Temel Özellikler

### Desteklenen Platformlar
- ✅ Windows (x64, x86, ARM64)
- ✅ Linux (x64, ARM64)
- ✅ macOS (Intel x64, Apple Silicon ARM64)

### Framework Desteği
- ✅ .NET 8.0
- ✅ .NET 9.0

### Özellik Matrisi

| Algoritma | Encrypt | Decrypt | Roundtrip Test | Python Uyumlu |
|-----------|---------|---------|----------------|---------------|
| Caesar | ✅ | ✅ | ✅ | N/A |
| Monoalphabetic | ✅ | ✅ | ✅ | N/A |
| Playfair | ✅ | ✅ | ✅ | N/A |
| Hill (N×N) | ✅ | ✅ | ✅ | N/A |
| Vigenère | ✅ | ✅ | ✅ | N/A |
| Columnar | ✅ | ✅ | ✅ | N/A |
| Differential XOR | ✅ | ✅ | ✅ | ✅ |
| Base64 | ✅ | ✅ | ✅ | N/A |

## 🔑 Algoritma Detayları

### 1. Caesar Cipher
- **Tip**: Substitution
- **Anahtar**: Integer shift (-∞ to +∞)
- **Blok boyutu**: 1 karakter
- **Güvenlik**: Çok zayıf (26 olası anahtar)

### 2. Monoalphabetic Substitution
- **Tip**: Substitution
- **Anahtar**: 26 harf permütasyonu veya keyword
- **Blok boyutu**: 1 karakter
- **Güvenlik**: Zayıf (frekans analizi ile kırılabilir)

### 3. Playfair
- **Tip**: Digraph substitution
- **Anahtar**: Keyword (5×5 matris oluşturur)
- **Blok boyutu**: 2 karakter
- **Güvenlik**: Orta (digraph frekansı ile kırılabilir)

### 4. Hill Cipher
- **Tip**: Linear algebraic
- **Anahtar**: N×N matris (mod 26)
- **Blok boyutu**: N karakter
- **Güvenlik**: Orta (known-plaintext saldırısına açık)
- **Kısıt**: det(K) ve 26 aralarında asal olmalı

### 5. Vigenère
- **Tip**: Polyalphabetic substitution
- **Anahtar**: Keyword (tekrar eden)
- **Blok boyutu**: 1 karakter
- **Güvenlik**: Orta (Kasiski examination ile kırılabilir)
- **Özellik**: Autokey modu destekli

### 6. Columnar Transposition
- **Tip**: Transposition (permutation)
- **Anahtar**: Column order keyword
- **Blok boyutu**: Değişken (anahtar uzunluğuna bağlı)
- **Güvenlik**: Zayıf (anagram analizi ile kırılabilir)

### 7. Differential XOR (Fun)
- **Tip**: Block cipher (XOR chaining)
- **Anahtar**: Passphrase + optional key
- **Blok boyutu**: Configurable (default 64 bit)
- **Güvenlik**: Orta (IV ve key derivation'a bağlı)
- **Özellik**: Python EncryptForFun/DecryptForFun uyumlu

### 8. Base64
- **Tip**: Encoding (ŞİFRELEME DEĞİL!)
- **Anahtar**: Yok
- **Blok boyutu**: 3 byte → 4 karakter
- **Güvenlik**: Yok (plaintext encoding)

## 📋 Kullanım Senaryoları

### Akademik Çalışmalar
- Klasik kriptografi dersi ödevleri
- Algoritma analizi ve karşılaştırma
- Frekans analizi deneyleri
- Cryptanalysis eğitimi

### Öğrenme
- Şifreleme algoritmalarını anlama
- Roundtrip kavramını öğrenme
- CLI uygulama geliştirme örneği
- .NET test yazma pratikleri

### Demo ve Sunum
- Şifreleme kavramlarını gösterme
- Canlı encryption/decryption demoları
- Güvenlik zayıflıklarını gösterme

## ⚠️ Güvenlik Uyarısı

**BU ALGORITMALAR ÜRETİM ORTAMINDA KULLANILMAMALIDIR!**

Tüm implementasyonlar **akademik ve eğitim amaçlıdır**. Modern güvenlik gereksinimleri için:
- AES (Advanced Encryption Standard)
- RSA (Asymmetric encryption)
- ChaCha20
- Modern TLS/SSL protokolleri

kullanılmalıdır.

## 🔧 Geliştirici Notları

### Kod Kalitesi
- ✅ Nullable reference types enabled
- ✅ Exception handling ile hata yönetimi
- ✅ XML dokümantasyon yorumları
- ✅ Deterministik davranış (no random)
- ✅ SOLID prensiplerine uygun

### Genişletilebilirlik
Yeni algoritma eklemek için:
1. `ICipher` arayüzünü implement et
2. `Ciphers/` klasörüne ekle
3. `Program.cs` içinde switch case'e ekle
4. Test yaz (`CipherRoundtripTests.cs`)

### Test Komutları
```bash
# Tüm testleri çalıştır
dotnet test

# Belirli test sınıfı
dotnet test --filter "FullyQualifiedName~CaesarCipher"

# Verbose output
dotnet test -v detailed

# Code coverage (opsiyonel, paket gerektirir)
dotnet test /p:CollectCoverage=true
```

## 📖 Referanslar

1. **Classical Cryptography**: Stallings, W. (2017). Cryptography and Network Security
2. **Hill Cipher**: Hill, L. S. (1929). Cryptography in an Algebraic Alphabet
3. **Playfair**: Wikipedia - Playfair Cipher
4. **Vigenère**: Kahn, D. (1996). The Codebreakers
5. **.NET Cryptography**: Microsoft Docs - System.Security.Cryptography

## 🎓 Öğrenme Çıktıları

Bu projeyi tamamlayan öğrenciler:
- ✅ Klasik şifreleme algoritmalarını anlar
- ✅ Substitution vs Transposition farkını kavrar
- ✅ Modular aritmetik kullanabilir
- ✅ C# ve .NET ile CLI uygulaması geliştirebilir
- ✅ Unit test yazabilir ve TDD uygulayabilir
- ✅ Roundtrip kavramını anlar
- ✅ Şifreleme güvenlik zayıflıklarını tanır

## 📞 Destek

Sorunlar için:
1. README.md'yi oku
2. QUICKSTART.md'ye bak
3. Test dosyalarını incele
4. `--help` komutunu kullan

---

**Proje Durumu**: ✅ Tamamlandı ve test edildi  
**Son Güncelleme**: 2025  
**Toplam Kod Satırı**: ~2,035 satır  
**Test Sayısı**: 21  
**Başarı Oranı**: %100

**🎉 Başarılar dileriz!**
