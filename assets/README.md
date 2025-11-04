# 📸 Assets - Screenshots and Images

Bu klasör projenin ekran görüntülerini ve görsellerini içerir.

## 📝 Gerekli Ekran Görüntüleri

### 1. screenshot-homepage.png
**Açıklama**: Ana sayfanın (localhost:3000) ekran görüntüsü  
**İçerik**:
- "Classical Cipher Studio" başlık
- 4 feature card (8 Algoritma, Şifreleme, Şifre Çözme, Doğrulama)
- "Cipher Playground'a Git" butonu
- Purple gradient arkaplan

**Nasıl Alınır**:
1. `cd classical-cipher-studio && npm run dev`
2. Tarayıcıda `http://localhost:3000` aç
3. Full page screenshot al (Cmd+Shift+3 veya browser dev tools)
4. Bu dosyayı `screenshot-homepage.png` olarak kaydet

### 2. screenshot-algorithms.png
**Açıklama**: Genişletilmiş algoritma kartlarının ekran görüntüsü  
**İçerik**:
- "Desteklenen Algoritmalar ve Teorik Açıklamaları" bölümü
- 8 algoritma kartı (2 sütun grid)
- En az 1-2 kart açık (expanded) durumda
- Detaylı içerik görünür (tarihçe, teori, güvenlik analizi)

**Nasıl Alınır**:
1. Ana sayfada aşağı scroll et
2. 1-2 algoritma kartını aç (örn: Caesar ve Hill)
3. Bu bölümün screenshot'ını al
4. Bu dosyayı `screenshot-algorithms.png` olarak kaydet

## 🎨 Görsel Spesifikasyonları

- **Format**: PNG (transparent background yoksa)
- **Çözünürlük**: En az 1920x1080 (Full HD)
- **Aspect Ratio**: 16:9 veya orijinal web sayfası oranı
- **Dosya Boyutu**: Max 2-3 MB (GitHub için optimize)
- **Optimizasyon**: TinyPNG veya benzer tool ile sıkıştırılabilir

## 📁 Klasör Yapısı

```
assets/
├── README.md                    # Bu dosya
├── screenshot-homepage.png      # Ana sayfa
└── screenshot-algorithms.png    # Algoritma kartları
```

## 🔗 README.md'de Kullanım

Görsel referansları README.md'de şu şekilde kullanılıyor:

```markdown
![Homepage](./assets/screenshot-homepage.png)
![Algorithm Cards](./assets/screenshot-algorithms.png)
```

## ✅ Checklist

Ekran görüntülerini ekledikten sonra:

- [ ] `screenshot-homepage.png` dosyası assets/ klasöründe
- [ ] `screenshot-algorithms.png` dosyası assets/ klasöründe
- [ ] Her iki dosya da 1920x1080 veya daha yüksek çözünürlükte
- [ ] Dosyalar 3 MB'dan küçük
- [ ] README.md'deki linkler çalışıyor (local olarak test et)
- [ ] Git'e commit ve push yapıldı

## 🚀 Sonraki Adımlar

Ekran görüntüleri eklendikten sonra:

```bash
git add assets/
git commit -m "docs: Add project screenshots to assets folder"
git push origin main
```

## 💡 İpucu

Eğer ekran görüntülerini henüz eklemediyseniz, README.md'deki görseller placeholder olarak kalacak ve GitHub'da "image not found" olarak görünecektir. Bu normal, görselleri eklediğinizde otomatik olarak düzelir.
