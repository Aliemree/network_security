# Classical Cipher Studio - Web Application

Modern web uygulaması olarak geliştirilmiş 8 klasik şifreleme algoritması koleksiyonu.

## 🚀 Özellikler

- **8 Klasik Şifreleme Algoritması**:
  - Caesar Cipher (Kaydırma tabanlı)
  - Monoalphabetic Cipher (Anahtar kelime ile değişim)
  - Vigenère Cipher (Polyalphabetic, autokey destekli)
  - Playfair Cipher (5×5 matris, digraph)
  - Hill Cipher (N×N matris, matematiksel)
  - Columnar Transposition (Sütun permütasyonu)
  - Differential XOR (Blok XOR, Python-uyumlu)
  - Base64 (Binary-to-text encoding)

- **Modern Web Arayüzü**:
  - Next.js 15 (App Router)
  - React 19
  - TypeScript
  - Tailwind CSS
  - Lucide Icons

- **Türkçe Karakter Kontrolü**:
  - Strict ASCII validation
  - Otomatik hata mesajları
  - Türkçe karakterleri tespit eder ve uyarır

## 📋 Gereksinimler

- Node.js 18+ veya 20+
- npm veya yarn veya pnpm

## 🛠️ Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Tarayıcıda aç: http://localhost:3000
```

## 🎮 Kullanım

1. Ana sayfada "Cipher Playground'a Git" butonuna tıklayın
2. Bir algoritma seçin (Caesar, Vigenere, Playfair, vb.)
3. Mod seçin: **Şifrele** veya **Çöz**
4. Gerekli parametreleri girin:
   - **Caesar**: Shift değeri (örn: 3)
   - **Monoalphabetic/Vigenère/Playfair/Columnar**: Keyword/Key
   - **Hill**: Matris (örn: `6,24,1;13,16,10;20,17,15`)
   - **Differential XOR**: Passphrase
5. Metninizi girin
6. "Şifrele" veya "Çöz" butonuna tıklayın
7. Sonucu kopyalayın

## 📝 Örnekler

### Caesar Cipher
- **Input**: `ATTACKATDAWN`
- **Shift**: `3`
- **Output**: `DWWDFNDWGDZQ`

### Vigenère Cipher
- **Input**: `ATTACKATDAWN`
- **Key**: `LEMON`
- **Output**: `LXFOPVEFRNHR`

### Playfair Cipher
- **Input**: `ATTACKATDAWN`
- **Keyword**: `MONARCHY`
- **Output**: `NBSMAUOBCNCY`

### Hill Cipher (3×3)
- **Input**: `ATTACKATDAWN`
- **Matrix**: `6,24,1;13,16,10;20,17,15`
- **Output**: `PQCFKUGGFLMQ`

### Differential XOR
- **Input**: `HELLO WORLD`
- **Passphrase**: `mysecretpassphrase`
- **Output**: `7a6561657b3e652e352a6a676e3e00...` (hex)

## 🏗️ Proje Yapısı

```
classical-cipher-studio/
├── app/
│   ├── page.tsx              # Ana sayfa (dashboard)
│   ├── cipher/
│   │   └── page.tsx          # Cipher playground
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   ├── types.ts              # TypeScript tipleri
│   ├── normalize.ts          # Metin normalleştirme
│   └── ciphers/              # Şifreleme algoritmaları
│       ├── caesar.ts
│       ├── mono.ts
│       ├── vigenere.ts
│       ├── playfair.ts
│       ├── hill.ts
│       ├── columnar.ts
│       ├── fun.ts
│       ├── base64.ts
│       └── index.ts
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 🧪 Build ve Deploy

```bash
# Production build
npm run build

# Production server'ı çalıştır
npm start

# Lint kontrolü
npm run lint
```

## ⚠️ Önemli Notlar

1. **Türkçe Karakterler**: Tüm algoritmalar (Base64 ve XOR hariç) Türkçe karakterleri kabul etmez. Sadece A-Z harfleri kullanılmalıdır.

2. **Hill Cipher**: Matris determinantı mod 26'da tersi alınabilir olmalıdır. Örnek geçerli matrisler:
   - 2×2: `3,3;2,5`
   - 3×3: `6,24,1;13,16,10;20,17,15`

3. **Differential XOR**: Çıktı hex formatındadır ve Python DecryptForFun.py ile uyumludur.

4. **Playfair**: Varsayılan olarak I ve J birleştirilir. Padding karakteri 'X'tir.

## 🔗 İlgili Projeler

- **C# Console Uygulaması**: `../ClassicalCipherSuite/`
- **Python Scriptleri**: `../Lecture2Code/`

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

---

**Not**: Bu uygulama klasik şifreleme algoritmalarını eğitim amaçlı göstermektedir. Modern güvenlik uygulamalarında kullanılmamalıdır.
