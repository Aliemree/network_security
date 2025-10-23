# Network Security - Classical Cipher Suite

Bu proje, klasik şifreleme algoritmalarının hem **C# Console Application** hem de **Next.js Web Application** implementasyonlarını içerir.

## 📁 Proje Yapısı

```
network_security/
├── ClassicalCipherSuite/          # C# .NET Console Application
│   ├── Ciphers/                   # 8 şifreleme algoritması (C#)
│   ├── Tests/                     # xUnit test suite
│   ├── interactive_menu.sh        # Bash interactive menu
│   ├── interactive_menu.bat       # Windows batch menu
│   └── README.md                  # C# proje dokümantasyonu
│
├── classical-cipher-studio/       # Next.js 15 Web Application
│   ├── app/                       # Next.js App Router pages
│   ├── lib/                       # TypeScript cipher implementations
│   └── README.md                  # Web app dokümantasyonu
│
└── Lecture2Code/                  # Orijinal Python scriptleri
    ├── EncryptForFun.py
    └── DecryptForFun.py
```

## 🎯 Desteklenen Algoritmalar

Her iki implementasyonda da aşağıdaki 8 klasik şifreleme algoritması mevcuttur:

1. **Caesar Cipher** - Kaydırma tabanlı basit şifreleme
2. **Monoalphabetic Cipher** - Anahtar kelime ile alfabetik değişim
3. **Vigenère Cipher** - Polyalphabetic şifreleme (autokey destekli)
4. **Playfair Cipher** - 5×5 matris ile digraph şifreleme
5. **Hill Cipher** - N×N matris ile matematiksel şifreleme
6. **Columnar Transposition** - Sütun permütasyonu
7. **Differential XOR** - Blok XOR cipher (Python-compatible)
8. **Base64** - Binary-to-text encoding

## 🚀 Hızlı Başlangıç

### C# Console Application

```bash
cd ClassicalCipherSuite
dotnet run -- --cipher caesar --mode encrypt --text "HELLO" --shift 3
```

Veya interactive menu kullanın:
```bash
./interactive_menu.sh
```

### Next.js Web Application

```bash
cd classical-cipher-studio
npm install
npm run dev
# http://localhost:3000
```

## 📦 Web App Deployment

Web uygulaması Vercel'de deploy edilmiştir:
- **Production URL**: [TBD - Vercel deployment sonrası eklenecek]

## 🧪 Test Edilen Örnekler

### Caesar Cipher
- Input: `ATTACKATDAWN`
- Shift: `3`
- Output: `DWWDFNDWGDZQ`

### Vigenère Cipher
- Input: `ATTACKATDAWN`
- Key: `LEMON`
- Output: `LXFOPVEFRNHR`

### Hill Cipher (3×3)
- Input: `ATTACKATDAWN`
- Matrix: `6,24,1;13,16,10;20,17,15`
- Output: `PQCFKUGGFLMQ`

## ⚠️ Önemli Notlar

1. **Türkçe Karakterler**: Çoğu algoritma (Base64 ve XOR hariç) sadece A-Z harflerini kabul eder
2. **C# ve TypeScript Uyumluluğu**: Her iki implementasyon da aynı sonuçları üretir
3. **Python Uyumluluk**: Differential XOR algoritması Python scriptleri ile uyumludur

## 📚 Dokümantasyon

- [C# Console App Dokümantasyonu](./ClassicalCipherSuite/README.md)
- [Next.js Web App Dokümantasyonu](./classical-cipher-studio/README.md)

## 🛠️ Teknolojiler

### C# Console App
- .NET 8/9
- xUnit (Testing)
- C# 12

### Web App
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Lucide Icons

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

---

**Not**: Bu uygulama klasik şifreleme algoritmalarını eğitim amaçlı göstermektedir. Modern güvenlik uygulamalarında kullanılmamalıdır.
