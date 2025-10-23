# 🚀 HIZLI BAŞLANGIÇ (Quick Start)

## ⚡ 3 Adımda Başla

### 1. Derleme
```bash
cd ClassicalCipherSuite
dotnet build src/ClassicalCipherSuite.csproj -c Release
```

### 2. Test Et
```bash
dotnet test tests/ClassicalCipherSuite.Tests.csproj
```

### 3. Kullan
```bash
# Caesar cipher örneği
echo "HELLO" | dotnet run --project src/ClassicalCipherSuite.csproj --framework net9.0 -- --cipher caesar --mode enc --shift 3

# Çıktı: KHOOR
```

## 📝 En Çok Kullanılan Örnekler

### Caesar Cipher
```bash
# Şifrele
dotnet run --project src -- -f net9.0 -- -c caesar -m enc -s 3 --in mesaj.txt

# Deşifrele
dotnet run --project src -- -f net9.0 -- -c caesar -m dec -s 3 --in sifre.txt
```

### Vigenère Cipher
```bash
# Klasik örnek: ATTACKATDAWN + LEMON = LXFOPVEFRNHR
echo "ATTACKATDAWN" | dotnet run --project src -- -f net9.0 -- -c vigenere -m enc -k LEMON
```

### Playfair Cipher
```bash
dotnet run --project src -- -f net9.0 -- -c playfair -m enc -k MONARCHY --in mesaj.txt
```

### Hill Cipher (2×2)
```bash
dotnet run --project src -- -f net9.0 -- -c hill -m enc --matrix "3,3;2,5" --in mesaj.txt
```

### Fun Cipher (XOR)
```bash
# Şifrele
dotnet run --project src -- -f net9.0 -- -c fun -m enc -p "MySecret" --in data.txt --out encrypted.hex

# Deşifrele
dotnet run --project src -- -f net9.0 -- -c fun -m dec -p "MySecret" --hex-in true --in encrypted.hex
```

## 🎯 Tek EXE Oluşturma

### macOS (M1/M2/M3)
```bash
dotnet publish src/ClassicalCipherSuite.csproj \
  -c Release \
  -r osx-arm64 \
  --self-contained true \
  /p:PublishSingleFile=true \
  -o ./publish

# Çalıştır
./publish/ClassicalCipherSuite --help
```

### Windows
```bash
dotnet publish src/ClassicalCipherSuite.csproj ^
  -c Release ^
  -r win-x64 ^
  --self-contained true ^
  /p:PublishSingleFile=true ^
  -o ./publish

# Çalıştır
.\publish\ClassicalCipherSuite.exe --help
```

### Linux
```bash
dotnet publish src/ClassicalCipherSuite.csproj \
  -c Release \
  -r linux-x64 \
  --self-contained true \
  /p:PublishSingleFile=true \
  -o ./publish

# Çalıştır
./publish/ClassicalCipherSuite --help
```

## ⚠️ Önemli Hatırlatmalar

1. **Türkçe karakter yasak**: Ç, Ğ, İ, Ö, Ş, Ü kullanmayın!
2. **Framework belirt**: `--framework net9.0` veya `--framework net8.0`
3. **Mode zorunlu**: `--mode enc` veya `--mode dec`
4. **Her cipher kendi anahtarını ister**: Caesar için `--shift`, Vigenère için `--key`

## 🔧 Sorun Giderme

### "Türkçe karakter" hatası
```bash
# Çözüm: --strict-ascii=false ekle
dotnet run --project src -- -f net9.0 -- -c caesar -m enc -s 3 --strict-ascii false --in mesaj.txt
```

### Hill matris hatası
```
Hill matrisinin determinantı terslenemiyor.
```
**Çözüm**: Farklı matris kullan (determinant ile 26 aralarında asal olmalı)

## 📚 Daha Fazla Bilgi

Detaylı kullanım için `README.md` dosyasına bakın.

## 🎓 Test Sonuçları

Tüm algoritmalar için roundtrip testleri başarılı:
```bash
dotnet test tests/ClassicalCipherSuite.Tests.csproj

# Sonuç: 21 test - Tümü başarılı ✓
```

---

**İyi şifrelemeler! 🔐**
