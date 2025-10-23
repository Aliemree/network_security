# 🎯 Hızlı Referans Kartı

## Temel Komut Yapısı
```bash
dotnet run --project src --framework net9.0 -- \
  --cipher <TÜR> \
  --mode <enc|dec> \
  [PARAMETRELER]
```

## 8 Algoritma Hızlı Referans

| # | Algoritma | Komut | Anahtar Parametresi |
|---|-----------|-------|---------------------|
| 1 | Caesar | `--cipher caesar` | `--shift 3` |
| 2 | Monoalphabetic | `--cipher mono` | `--keyword CIPHER` |
| 3 | Playfair | `--cipher playfair` | `--key MONARCHY` |
| 4 | Hill | `--cipher hill` | `--matrix "3,3;2,5"` |
| 5 | Vigenère | `--cipher vigenere` | `--key LEMON` |
| 6 | Columnar | `--cipher columnar` | `--key ZEBRA` |
| 7 | Fun/XOR | `--cipher fun` | `--passphrase "secret"` |
| 8 | Base64 | `--cipher base64` | (anahtar yok) |

## Kısa Form Komutlar

```bash
# Caesar
echo "HELLO" | dotnet run --project src -f net9.0 -- -c caesar -m enc -s 5

# Vigenère (klasik test)
echo "ATTACKATDAWN" | dotnet run --project src -f net9.0 -- -c vigenere -m enc -k LEMON
# Sonuç: LXFOPVEFRNHR

# Fun Cipher
echo "test" | dotnet run --project src -f net9.0 -- -c fun -m enc -p "key"
```

## Test Komutları

```bash
# Tüm testler
dotnet test

# Sadece roundtrip testler
dotnet test --filter "FullyQualifiedName~Roundtrip"

# Belirli algoritma
dotnet test --filter "FullyQualifiedName~Caesar"
```

## Publish Komutları

```bash
# macOS ARM
dotnet publish src/ClassicalCipherSuite.csproj -c Release -r osx-arm64 \
  --self-contained true /p:PublishSingleFile=true -o ./publish

# Windows
dotnet publish src/ClassicalCipherSuite.csproj -c Release -r win-x64 \
  --self-contained true /p:PublishSingleFile=true -o ./publish

# Linux
dotnet publish src/ClassicalCipherSuite.csproj -c Release -r linux-x64 \
  --self-contained true /p:PublishSingleFile=true -o ./publish
```

## Yaygın Hatalar ve Çözümleri

| Hata | Çözüm |
|------|-------|
| Türkçe karakter | `--strict-ascii=false` ekle |
| Hill matris terslenemiyor | Farklı matris kullan (det ve 26 aralarında asal) |
| Hex format hatası | `--hex-in true` ekle (decrypt için) |
| Framework hatası | `--framework net9.0` veya `--framework net8.0` |

## Örnek Giriş/Çıkış Dosyaları

```bash
# Dosyadan oku, dosyaya yaz
dotnet run --project src -f net9.0 -- \
  -c caesar -m enc -s 3 \
  --in message.txt \
  --out encrypted.txt

# Dosyadan oku, ekrana yaz
dotnet run --project src -f net9.0 -- \
  -c caesar -m dec -s 3 \
  --in encrypted.txt

# Pipe kullanımı
cat message.txt | dotnet run --project src -f net9.0 -- -c vigenere -m enc -k LEMON
```

## Parametre Özeti

### Genel
- `--strict-ascii <bool>` - Türkçe karakter kontrolü (varsayılan: true)
- `--preserve-nonletters <bool>` - Harf olmayan karakterleri koru (varsayılan: false)
- `--uppercase <bool>` - Çıktı büyük harf (varsayılan: true)

### Caesar
- `--shift, -s <int>` - Kaydırma (-∞ to +∞)

### Monoalphabetic
- `--key <26char>` - 26 harflik anahtar
- `--keyword <word>` - Anahtar kelime

### Playfair
- `--key <word>` - Anahtar kelime
- `--ij-merge <bool>` - I/J birleştir (varsayılan: true)
- `--padchar <char>` - Padding karakteri (varsayılan: X)

### Hill
- `--matrix <string>` - Matris ("a,b;c,d")
- `--matrix-file <path>` - Matris dosyası

### Vigenère
- `--key <word>` - Anahtar kelime
- `--autokey <bool>` - Autokey modu (varsayılan: false)

### Columnar
- `--key <word>` - Sütun sırası

### Fun/XOR
- `--passphrase, -p <text>` - Passphrase
- `--key <text>` - Anahtar (opsiyonel)
- `--blocksize, -b <int>` - Blok boyutu bit (varsayılan: 64)
- `--hex-in <bool>` - Hex girdi (decrypt)

## Test Sonuçları

```
✓ 21 test
✓ %100 başarı
✓ Tüm algoritmalar roundtrip
✓ Edge case'ler kapsandı
```

## Hızlı Test

```bash
# Build
dotnet build src -c Release

# Test
dotnet test tests

# Run
echo "HELLO" | dotnet run --project src -f net9.0 -- -c caesar -m enc -s 3
# Beklenen: KHOOR
```

---

**🔖 Bu kartı kolayca erişilebilir bir yere kaydedin!**
