# 🎮 KULLANIM REHBERİ - İnteraktif Menü

## ✨ Uygulama Hazır ve Çalışıyor!

Klasik Şifreleme Koleksiyonu artık **3 farklı şekilde** kullanılabilir:

---

## 🚀 Kullanım Yöntemleri

### 1️⃣ İnteraktif Menü (En Kolay) 🎯

#### macOS / Linux:
```bash
cd ClassicalCipherSuite
./interactive_menu.sh
```

#### Windows:
```cmd
cd ClassicalCipherSuite
interactive_menu.bat
```

**Özellikler:**
- ✅ Menü tabanlı arayüz
- ✅ Adım adım yönlendirme
- ✅ Her algoritma için örnekler
- ✅ Tüm algoritmaları test et seçeneği
- ✅ Kullanıcı dostu

---

### 2️⃣ Komut Satırı (Hızlı Kullanım) ⚡

```bash
# Caesar Cipher
echo "HELLO" | dotnet run --project src --framework net9.0 -- \
  --cipher caesar --mode enc --shift 3

# Vigenère Cipher
echo "ATTACKATDAWN" | dotnet run --project src --framework net9.0 -- \
  --cipher vigenere --mode enc --key LEMON

# Dosya ile
dotnet run --project src --framework net9.0 -- \
  --cipher caesar --mode enc --shift 5 \
  --in mesaj.txt --out sifre.txt
```

---

### 3️⃣ Tek EXE Dosyası (Taşınabilir) 📦

#### Önce üret:
```bash
# macOS
dotnet publish src/ClassicalCipherSuite.csproj -c Release -r osx-arm64 \
  --self-contained true /p:PublishSingleFile=true -o ./publish

# Windows
dotnet publish src/ClassicalCipherSuite.csproj -c Release -r win-x64 \
  --self-contained true /p:PublishSingleFile=true -o ./publish

# Linux
dotnet publish src/ClassicalCipherSuite.csproj -c Release -r linux-x64 \
  --self-contained true /p:PublishSingleFile=true -o ./publish
```

#### Sonra kullan:
```bash
# macOS/Linux
./publish/ClassicalCipherSuite --cipher caesar --mode enc --shift 3

# Windows
.\publish\ClassicalCipherSuite.exe --cipher caesar --mode enc --shift 3
```

---

## 🎬 Canlı Demo

### İnteraktif Menü Ekran Görüntüsü:

```
╔════════════════════════════════════════════════════════════╗
║   KLASİK ŞİFRELEME KOLEKSİYONU - İNTERAKTİF MENÜ         ║
║                                                            ║
║   8 Farklı Klasik Şifreleme Algoritması                   ║
╚════════════════════════════════════════════════════════════╝

┌────────────────────────────────────────────────────────────┐
│  Şifreleme Algoritmaları:                                  │
├────────────────────────────────────────────────────────────┤
│  1. Caesar Cipher          (Sabit kaydırma)               │
│  2. Monoalphabetic         (Permütasyon)                  │
│  3. Vigenère Cipher        (Polyalphabetic)               │
│  4. Playfair Cipher        (5×5 matris)                   │
│  5. Hill Cipher            (Matris tabanlı)               │
│  6. Columnar Transposition (Sütun permütasyonu)           │
│  7. Differential XOR       (Fun Cipher)                   │
│  8. Base64                 (Encoding)                     │
├────────────────────────────────────────────────────────────┤
│  9. Tüm Algoritmaları Test Et                             │
│  0. Çıkış                                                  │
└────────────────────────────────────────────────────────────┘

Seçiminiz (0-9): _
```

---

## 📝 Hızlı Örnekler

### Caesar Cipher (İnteraktif)
```
Seçim: 1
Şifrele/Deşifrele: e
Kaydırma: 3
Metin: HELLO

Sonuç: KHOOR ✓
```

### Vigenère Cipher (Komut Satırı)
```bash
$ echo "ATTACKATDAWN" | dotnet run --project src -f net9.0 -- -c vigenere -m enc -k LEMON

LXFOPVEFRNHR ✓
```

### Fun Cipher (Dosya)
```bash
$ dotnet run --project src -f net9.0 -- \
  --cipher fun --mode enc --passphrase "secret" \
  --in data.txt --out encrypted.hex

✓ Şifreleme tamamlandı!
```

---

## 🎯 Hangi Yöntemi Seçmeliyim?

| Durum | Önerilen Yöntem |
|-------|-----------------|
| İlk kez kullanıyorum | 🎮 İnteraktif Menü |
| Hızlı test yapmak istiyorum | ⚡ Komut Satırı |
| Başka bilgisayarda çalıştıracağım | 📦 Tek EXE |
| Script/otomasyon | ⚡ Komut Satırı |
| Öğrenmek/denemek | 🎮 İnteraktif Menü |

---

## 🔥 Hemen Başla!

### macOS/Linux:
```bash
cd /Users/aliemre/Projects/network_security/ClassicalCipherSuite
./interactive_menu.sh
```

### Veya komut satırından hızlı test:
```bash
echo "HELLO WORLD" | dotnet run --project src -f net9.0 -- -c caesar -m enc -s 5
```

---

## 📚 Tüm Algoritmaları Test Et

İnteraktif menüden **"9"** seçeneğini seçin veya:

```bash
./demo_all_ciphers.sh
```

Bu script tüm algoritmaları "ATTACKATDAWN" metni ile test eder:
- ✓ Caesar
- ✓ Vigenère
- ✓ Monoalphabetic
- ✓ Base64
- ✓ Fun/XOR

---

## 🆘 Yardım

Her zaman yardım alabilirsiniz:
```bash
dotnet run --project src -f net9.0 -- --help
```

Veya dokümantasyona bakın:
- `README.md` - Tam kullanım kılavuzu
- `QUICKSTART.md` - Hızlı başlangıç
- `REFERENCE_CARD.md` - Hızlı referans

---

## ✅ Özet

**✨ Uygulama şu anda çalışıyor ve kullanıma hazır!**

1. ✅ **21 test** - tümü başarılı
2. ✅ **8 algoritma** - hepsi çalışıyor
3. ✅ **3 kullanım modu** - ihtiyacına göre seç
4. ✅ **Cross-platform** - Windows, macOS, Linux

**Hemen kullanmaya başla:**
```bash
./interactive_menu.sh
```

---

**🎉 İyi şifrelemeler! 🔐**
