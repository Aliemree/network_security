'use client';

import Link from 'next/link';
import { ShieldCheck, Code2, Lock, Key, ChevronDown, ChevronUp, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <ShieldCheck className="w-20 h-20 text-purple-400" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Classical Cipher Studio
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore, test, and learn 8 classical encryption algorithms
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <FeatureCard 
            icon={<Code2 className="w-8 h-8" />}
            title="8 Algorithms"
            description="Caesar, Vigenère, Playfair, Hill and more"
          />
          <FeatureCard 
            icon={<Lock className="w-8 h-8" />}
            title="Encryption"
            description="Encrypt your texts securely"
          />
          <FeatureCard 
            icon={<Key className="w-8 h-8" />}
            title="Decryption"
            description="Decrypt and understand ciphertexts"
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-8 h-8" />}
            title="Validation"
            description="Character validation and checks"
          />
        </div>

        <div className="text-center">
          <Link 
            href="/cipher"
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-lg transition-colors"
          >
            Go to Cipher Playground
            <Code2 className="w-5 h-5" />
          </Link>
        </div>

        <div className="mt-16 bg-slate-800/50 backdrop-blur rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Supported Algorithms and Theoretical Explanations</h2>
          <p className="text-gray-400 mb-6 text-sm">
            Detailed explanations, working principles, and examples of each algorithm are provided below. 
            These are practical versions of the classical encryption methods covered in your course notes.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <AlgorithmItem details={{
              name: "Caesar Cipher (Sezar Şifresi)",
              desc: "Kaydırma tabanlı substitution cipher",
              history: "M.Ö. 100-44 yılları arasında Julius Caesar tarafından askeri iletişimde kullanılmıştır. Suetonius'un 'The Twelve Caesars' eserinde belgelenmiştir. En eski ve basit şifreleme yöntemlerinden biridir.",
              theory: "Monoalphabetic substitution cipher ailesinin en basit üyesidir. Her plaintext harfi, alfabede sabit bir pozisyon kaydırılarak ciphertext harfine dönüştürülür. Matematik formülü: E(x) = (x + n) mod 26, D(x) = (x - n) mod 26. Burada n shift değeri (genellikle 1-25 arası), x harf pozisyonudur.",
              howItWorks: [
                "Şifreleme anahtarı olarak 1-25 arası bir kaydırma değeri (shift) seçilir",
                "Plaintext'teki her harf alfabedeki pozisyonuna göre numaralandırılır (A=0, B=1, ..., Z=25)",
                "Her harfin pozisyonuna shift değeri eklenir ve mod 26 işlemi uygulanır",
                "Yeni pozisyon değerine karşılık gelen harf ciphertext'te kullanılır",
                "Şifre çözme için aynı işlem ters yönde (shift değeri çıkarılarak) yapılır"
              ],
              example: "Plaintext: ATTACKATDAWN\nKey (shift): 3\n\nAdım adım:\nA(0) + 3 = D(3)\nT(19) + 3 = W(22)\nT(19) + 3 = W(22)\n...\n\nCiphertext: DWWDFNDWGDZQ",
              security: {
                level: 'low',
                vulnerabilities: [
                  "Sadece 25 farklı anahtar var (brute force çok kolay)",
                  "Frekans analizi ile kolayca kırılır",
                  "Harf dağılımı korunduğu için istatistiksel saldırılara açık"
                ],
                strengths: [
                  "Çok hızlı ve basit implementasyon",
                  "Eğitim amaçlı mükemmel başlangıç",
                  "Matematiksel temel sağlar"
                ]
              },
              complexity: "O(n) - Linear Time",
              useCase: "Modern kriptografide kullanılmaz. Sadece eğitim ve ROT13 gibi basit obfuscation amaçlı. Tarihsel önem taşır."
            }} />

            <AlgorithmItem details={{
              name: "Monoalphabetic Substitution",
              desc: "Anahtar kelime ile alfabetik değişim",
              history: "Orta Çağ'da Araplar tarafından geliştirilmiştir. Al-Kindi (801-873) frekans analizi ile kırılabileceğini ilk keşfeden kişidir. 15-16. yüzyılda Avrupa'da yaygınlaşmıştır.",
              theory: "Her plaintext harfi farklı bir ciphertext harfine eşlenir (1-1 mapping). Anahtar kelimeden tekrarsız harfler çıkarılıp alfabeye eklenerek 26 harflik permütasyon alfabesi oluşturulur. Total 26! ≈ 4×10²⁶ farklı anahtar vardır ancak frekans analizi ile kırılabilir.",
              howItWorks: [
                "Anahtar kelime seçilir (örn: CIPHER)",
                "Anahtar kelimeden tekrar eden harfler çıkarılır → CIPHERABDFGJKLMNOQSTUVWXYZ",
                "Bu alfabe substitution tablosu olarak kullanılır",
                "Normal alfabe: ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                "Cipher alfabe: CIPHERABDFGJKLMNOQSTUVWXYZ",
                "Her plaintext harfi cipher alfabedeki karşılığı ile değiştirilir"
              ],
              example: "Keyword: CIPHER\n\nSubstitution:\nA→C, B→I, C→P, D→H, E→E...\n\nPlaintext: HELLO\nCiphertext: DEGGJ\n\n(Normal alfabede H→C alfabede D, E→E, L→G...)",
              security: {
                level: 'low',
                vulnerabilities: [
                  "Frekans analizi ile kırılabilir (İngilizcede E, T, A en sık)",
                  "Digraph frekansları korunur (TH, HE, IN...)",
                  "Known-plaintext attack'e karşı savunmasız"
                ],
                strengths: [
                  "26! farklı anahtar (brute force imkansız)",
                  "Caesar'dan çok daha güçlü",
                  "Basit ve hızlı implementasyon"
                ]
              },
              complexity: "O(n) - Linear Time",
              useCase: "Günümüzde kullanılmaz. Puzzle ve bulmaca çözümlerinde eğlence amaçlı. Kriptanaliz eğitiminde önemli."
            }} />

            <AlgorithmItem details={{
              name: "Vigenère Cipher",
              desc: "Polyalphabetic şifreleme (autokey destekli)",
              history: "1553'te Giovan Battista Bellaso tarafından icat edildi, ancak Blaise de Vigenère (1586) adıyla anıldı. 300 yıl boyunca 'le chiffre indéchiffrable' (kırılamaz şifre) olarak bilinirdi. 1863'te Charles Babbage tarafından kırıldı.",
              theory: "Polyalphabetic substitution cipher. Her harf farklı bir Caesar shift'i ile şifrelenir. Anahtar kelime tekrar eder veya autokey modunda plaintext'in kendisi anahtar olarak kullanılır. Formül: Ci = (Pi + Ki) mod 26. Frekans analizi çok zorlaşır çünkü aynı harf farklı şekilde şifrelenir.",
              howItWorks: [
                "Anahtar kelime seçilir (örn: LEMON)",
                "Anahtar plaintext uzunluğuna kadar tekrar eder: LEMONLEMONLE...",
                "Her plaintext harfi, karşılığındaki anahtar harfi kadar kaydırılır",
                "L=11, E=4, M=12, O=14, N=13 shift değerleri kullanılır",
                "Autokey modunda: İlk harf anahtar, sonraki harfler plaintext'in kendisi",
                "Her pozisyonda farklı Caesar cipher uygulanmış olur"
              ],
              example: "Plaintext: ATTACKATDAWN\nKey: LEMON (tekrarlı)\n\nAdım adım:\nA(0)+L(11)=L(11)\nT(19)+E(4)=X(23)\nT(19)+M(12)=F(5)\n...\n\nCiphertext: LXFOPVEFRNHR\n\nAutokey: LEMON+ATTACK\nCiphertext: LXFOPVLEOLHY",
              security: {
                level: 'medium',
                vulnerabilities: [
                  "Kasiski examination ile anahtar uzunluğu bulunabilir",
                  "Index of Coincidence ile kırılabilir",
                  "Anahtar uzunluğu belli olunca Caesar'a dönüşür"
                ],
                strengths: [
                  "Frekans analizi çok zor",
                  "Basit Caesar'dan çok güçlü",
                  "Autokey modu daha güvenli"
                ]
              },
              complexity: "O(n) - Linear Time",
              useCase: "19. yüzyılda diplomatik iletişim. Günümüzde kullanılmaz ama kriptografi tarihinde önemli. Modern stream cipher'ların atası."
            }} />

            <AlgorithmItem details={{
              name: "Playfair Cipher",
              desc: "5×5 matris ile digraph (çift harf) şifreleme",
              history: "1854'te Charles Wheatstone tarafından icat edildi ancak Lord Playfair tarafından tanıtıldı. 1. Dünya Savaşı'nda İngilizler tarafından kullanıldı. İlk pratik digraph şifrelemedir.",
              theory: "5×5 matris kullanır (26 harf → I/J birleştirilir). Anahtar kelimeden matris doldurulur. Plaintext 2'li gruplara (digraph) bölünür. Aynı satır→sağa kayma, aynı sütun→aşağı kayma, farklı satır/sütun→dikdörtgen köşeleri kuralları uygulanır. Digraph frekanslarını bozar.",
              howItWorks: [
                "5×5 matris oluştur, anahtar kelimeyi (MONARCH) yerleştir, kalanını alfabeyle doldur",
                "Plaintext'i 2'li gruplara böl (HE-LL-O → HE-LX-LO, çift harflere X ekle)",
                "Her digraph için kuralları uygula:",
                "- Aynı satırda → her harf sağdaki harfle değişir (döngüsel)",
                "- Aynı sütunda → her harf altındaki harfle değişir (döngüsel)",
                "- Farklı → dikdörtgen oluştur, köşegendeki harflerle değiştir",
                "Ciphertext digraph'ları birleştir"
              ],
              example: "Key: MONARCHY\nMatrix:\nM O N A R\nC H Y B D\nE F G I/J K\nL P Q S T\nU V W X Z\n\nHE → YK (dikdörtgen)\nLX → PM (dikdörtgen)\nLO → RM (dikdörtgen)\n\nCiphertext: YKPMRM",
              security: {
                level: 'medium',
                vulnerabilities: [
                  "Digraph frekans analizi mümkün (ama zor)",
                  "25 × 24 = 600 digraph var (normal 676)",
                  "Known-plaintext attack'e karşı zayıf"
                ],
                strengths: [
                  "Tek harf frekansı kaybolur",
                  "Manuel uygulanabilir (1. Dünya Savaşı)",
                  "Caesar ve monoalphabetic'ten çok güçlü"
                ]
              },
              complexity: "O(n) - Linear Time (digraph bazlı)",
              useCase: "1. Dünya Savaşı'nda askeri iletişim. Günümüzde kullanılmaz ama digraph şifrelemenin öncüsü. CTF ve puzzle'larda görülür."
            }} />

            <AlgorithmItem details={{
              name: "Hill Cipher",
              desc: "Lineer cebir tabanlı N×N matris şifreleme",
              history: "1929'da Lester S. Hill tarafından icat edildi. İlk pratik polygraph ve matematiksel şifreleme sistemidir. Modern blok şifrelemelerinin temelini oluşturur.",
              theory: "Linear algebra kullanır. N harflik bloklar vektör olarak N×N invertible anahtar matrisi ile çarpılır. C = K × P (mod 26). Şifre çözme: P = K⁻¹ × C (mod 26). Matris mod 26'da terslenebilir olmalı (det(K) ve 26 aralarında asal). Frekans analizine tamamen dayanıklıdır.",
              howItWorks: [
                "N×N invertible matris seç (örn: 3×3, determinant 26 ile aralarında asal)",
                "Plaintext'i N'li bloklara böl (ABC, DEF...)",
                "Her bloğu vektör olarak temsil et ([A=0, B=1, C=2])",
                "Vektörü matris ile çarp: C = K × P (mod 26)",
                "Sonuç vektörü harfe çevir",
                "Şifre çözme: K⁻¹ matrisini bul (mod 26), P = K⁻¹ × C"
              ],
              example: "3×3 Matris K:\n[6  24  1 ]\n[13 16 10]\n[20 17 15]\n\nPlaintext: ACT → [0,2,19]\n\nC = K × P (mod 26)\n= [6×0+24×2+1×19] mod 26 = [67] mod 26 = [15] → P\n= [13×0+16×2+10×19] mod 26 = [222] mod 26 = [14] → O\n= [20×0+17×2+15×19] mod 26 = [319] mod 26 = [7] → H\n\nCiphertext: POH",
              security: {
                level: 'high',
                vulnerabilities: [
                  "Known-plaintext attack ile matris bulunabilir (n² denklem gerekir)",
                  "Chosen-plaintext attack'e karşı zayıf",
                  "Matris seçimi kritik (weak key'ler var)"
                ],
                strengths: [
                  "Frekans analizi tamamen etkisiz",
                  "Blok şifreleme (modern AES benzeri)",
                  "Matematiksel olarak güçlü",
                  "Diffusion sağlar (her plaintext bit tüm ciphertext'i etkiler)"
                ]
              },
              complexity: "O(n) - Block bazlı (matris çarpımı O(n²) ama sabit boyut)",
              useCase: "Tarihsel önemi var. Günümüzde kullanılmaz ama modern blok şifrelemelerinin (AES, DES) atası. Akademik ve eğitim amaçlı."
            }} />

            <AlgorithmItem details={{
              name: "Columnar Transposition",
              desc: "Sütun permütasyonu ile transpozisyon şifresi",
              history: "Antik Spartalılar'ın Scytale'si (MÖ 5. yüzyıl) en eski transpozisyon örneğidir. Columnar versiyon 19. yüzyılda geliştirildi. 2. Dünya Savaşı'nda kullanıldı.",
              theory: "Substitution yerine transposition (yer değiştirme) yapar. Karakterler değişmez, sadece sırası karışır (anagram). Plaintext satır satır matrise yazılır, anahtar kelimeye göre sütunlar permute edilir, sonra sütun sütun okunur. Frekans korunur ama pozisyon kaybolur.",
              howItWorks: [
                "Anahtar kelime seç (örn: ZEBRAS → uzunluk 6)",
                "Anahtar harflerini alfabetik sıraya göre numaralandır (Z=5, E=2, B=1, R=4, A=0, S=3)",
                "Plaintext'i 6 sütunlu matrise satır satır yaz",
                "Sütunları anahtar sırasına göre yeniden düzenle (0,1,2,3,4,5 sırası)",
                "Yeni matrisi sütun sütun oku (yukarıdan aşağıya)",
                "Şifre çözme: Ters işlem (sütun uzunluğu hesapla, sütunlara böl, ters permütasyon)"
              ],
              example: "Plaintext: ATTACKATDAWN\nKey: ZEBRAS (6 sütun)\nSıralama: 5,6,1,4,2,3 → 4,2,0,5,1,3\n\nMatrise yaz:\nA T T A C K\nA T D A W N\n\nSıralı sütunlar (4,2,0,5,1,3):\nC T A K T A\nW D A N T A\n\nSütun sütun oku:\nCWTDAAKNTTAA\n\nCiphertext: CWTDAAKNTTAA",
              security: {
                level: 'low',
                vulnerabilities: [
                  "Frekans analizi hala çalışır (harfler değişmez)",
                  "Anagramming tekniği ile kırılabilir",
                  "Anahtar uzunluğu bulununca kolay çözülür"
                ],
                strengths: [
                  "Basit ve hızlı",
                  "Substitution ile birleştirilince güçlü (product cipher)",
                  "Manuel uygulanabilir"
                ]
              },
              complexity: "O(n) - Linear Time",
              useCase: "Günümüzde tek başına kullanılmaz. Substitution ile kombine edilir (ör: Enigma). Diffusion sağlar, modern şifrelerde bu önemli."
            }} />

            <AlgorithmItem details={{
              name: "Differential XOR Cipher",
              desc: "Blok tabanlı XOR operasyonu ile modern şifreleme",
              history: "XOR şifreleme 20. yüzyılda gelişti. One-time pad (Vernam cipher, 1917) XOR tabanlıdır ve teorik olarak kırılamaz. Differential encoding ise hata düzeltme ve stream cipher'larda kullanılır.",
              theory: "Her byte bir önceki byte ile XOR edilir (differential/chain encoding). XOR özellikleri: A⊕B⊕B=A (self-inverse), A⊕0=A, A⊕A=0. Stream cipher benzeri davranış, diffusion sağlar. İlk byte için IV (initialization vector) gerekir. Avalanche effect: 1 bit değişiklik tüm sonraki byte'ları etkiler.",
              howItWorks: [
                "Plaintext'i byte dizisine çevir",
                "İlk byte'ı olduğu gibi al (veya IV ile XOR)",
                "Her sonraki byte için: Cᵢ = Pᵢ ⊕ Pᵢ₋₁",
                "Böylece differential encoding oluşur",
                "Şifre çözme: P₀ = C₀, Pᵢ = Cᵢ ⊕ Pᵢ₋₁ (chain'i geri sar)",
                "Hex formatında sakla"
              ],
              example: "Plaintext: HELLO\nBytes: 48 45 4C 4C 4F\n\nXOR Chain:\nC₀ = P₀ = 48\nC₁ = P₁⊕P₀ = 45⊕48 = 0D\nC₂ = P₂⊕P₁ = 4C⊕45 = 09\nC₃ = P₃⊕P₂ = 4C⊕4C = 00\nC₄ = P₄⊕P₃ = 4F⊕4C = 03\n\nCiphertext: 48 0D 09 00 03",
              security: {
                level: 'medium',
                vulnerabilities: [
                  "Known-plaintext attack kolay (XOR key recovery)",
                  "Hata yayılır (1 bit hatası sonraki tüm byte'ları bozar)",
                  "Gerçek kriptografik anahtar kullanmaz"
                ],
                strengths: [
                  "Çok hızlı (XOR hardware'de native)",
                  "Diffusion sağlar",
                  "Stream cipher benzeri",
                  "Basit implementasyon"
                ]
              },
              complexity: "O(n) - Linear Time",
              useCase: "Tek başına güvenli değil. Modern sistemlerde: error detection, data obfuscation. Gerçek uygulamada AES-GCM, ChaCha20 gibi kanıtlanmış algoritmalar kullanılır."
            }} />

            <AlgorithmItem details={{
              name: "Base64 Encoding",
              desc: "Binary veriyi ASCII metne dönüştürme",
              history: "1987'de RFC 989'da tanımlandı. MIME (email) standardının bir parçası olarak popülerleşti. Binary veriyi text-safe formata dönüştürür. Günümüzde web ve email'de yaygın kullanılır.",
              theory: "Encoding yöntemi, şifreleme DEĞİL! 3 byte (24 bit) veriyi 4×6-bit gruba böler. Her 6-bit grup (0-63) Base64 alfabesindeki (A-Z, a-z, 0-9, +, /) bir karaktere karşılık gelir. Padding için = kullanılır (3'e tam bölünmeyen uzunluklar için). %33 boyut artışı oluşur.",
              howItWorks: [
                "Input'u byte dizisine çevir",
                "Her 3 byte'ı (24 bit) al",
                "24 bit'i 4×6-bit gruba böl",
                "Her 6-bit (0-63) değeri Base64 tablosundan karaktere çevir",
                "Uzunluk 3'ün katı değilse = ile padding ekle (1 byte → ==, 2 byte → =)",
                "Output ASCII metindir, güvenlik sağlamaz ama taşınabilirlik sağlar"
              ],
              example: "Plaintext: HELLO\nBytes: 48 45 4C 4C 4F (5 byte)\n\nBinary (8-bit):\n01001000 01000101 01001100\n01001100 01001111\n\n6-bit gruplara böl:\n010010 000100 010101 001100\n010011 000100 1111\n\nBase64:\nS(18) G(4) V(21) s(44)\nb(27) G(4) 8(60) = (padding)\n\nCiphertext: SGVsbG8=",
              security: {
                level: 'low',
                vulnerabilities: [
                  "ŞİFRELEME DEĞİL! Güvenlik sağlamaz",
                  "Kolayca decode edilir",
                  "Obfuscation bile değil",
                  "Gizlilik için KULLANILMAMALI"
                ],
                strengths: [
                  "Binary veri → text dönüşümü",
                  "Email ve URL'de binary taşıma",
                  "Platform bağımsız",
                  "Standart ve yaygın"
                ]
              },
              complexity: "O(n) - Linear Time",
              useCase: "Email attachments (MIME), JSON Web Tokens (JWT), URL'de binary data, API'larda image/file transfer. ŞİFRELEME DEĞİL, sadece encoding!"
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 text-center hover:bg-slate-800/70 transition-colors">
      <div className="flex justify-center text-purple-400 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

interface AlgorithmDetails {
  name: string;
  desc: string;
  history: string;
  theory: string;
  howItWorks: string[];
  example: string;
  security: {
    level: 'low' | 'medium' | 'high';
    vulnerabilities: string[];
    strengths: string[];
  };
  complexity: string;
  useCase: string;
}

function AlgorithmItem({ details }: { details: AlgorithmDetails }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const securityColor = {
    low: 'text-red-400',
    medium: 'text-yellow-400',
    high: 'text-green-400'
  }[details.security.level];

  const securityLabel = {
    low: 'Low Security',
    medium: 'Medium Security',
    high: 'High Security'
  }[details.security.level];

  return (
    <div className="bg-slate-700/30 rounded-lg overflow-hidden hover:bg-slate-700/50 transition-all">
      <div 
        className="flex items-start gap-3 p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Lock className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-white mb-1">{details.name}</div>
              <div className="text-sm text-gray-400">{details.desc}</div>
            </div>
            <button className="text-purple-400 p-2 hover:bg-purple-500/10 rounded transition-colors">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className={`text-xs font-semibold ${securityColor}`}>
              {securityLabel}
            </span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500">{details.complexity}</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-slate-600/50 pt-4">
          {/* Tarihçe */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <h4 className="text-sm font-semibold text-purple-300">History</h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{details.history}</p>
          </div>

          {/* Teori */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <h4 className="text-sm font-semibold text-purple-300">Theoretical Explanation</h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{details.theory}</p>
          </div>

          {/* Nasıl Çalışır? */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Key className="w-4 h-4 text-purple-400" />
              <h4 className="text-sm font-semibold text-purple-300">Step-by-Step Working Principle</h4>
            </div>
            <ol className="list-decimal list-inside space-y-1">
              {details.howItWorks.map((step, idx) => (
                <li key={idx} className="text-xs text-gray-400 leading-relaxed">{step}</li>
              ))}
            </ol>
          </div>

          {/* Örnek */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <h4 className="text-sm font-semibold text-purple-300">Practical Example</h4>
            </div>
            <div className="text-xs text-gray-400 font-mono bg-slate-800/70 p-3 rounded border border-purple-500/20">
              {details.example}
            </div>
          </div>

          {/* Güvenlik Analizi */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <h4 className="text-sm font-semibold text-purple-300">Security Analysis</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <AlertCircle className="w-3 h-3 text-red-400" />
                  <span className="text-xs font-semibold text-red-300">Weaknesses</span>
                </div>
                <ul className="space-y-1">
                  {details.security.vulnerabilities.map((vuln, idx) => (
                    <li key={idx} className="text-xs text-gray-400 pl-4">• {vuln}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                  <span className="text-xs font-semibold text-green-300">Strengths</span>
                </div>
                <ul className="space-y-1">
                  {details.security.strengths.map((strength, idx) => (
                    <li key={idx} className="text-xs text-gray-400 pl-4">• {strength}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Kullanım Alanı */}
          <div className="bg-purple-500/10 border border-purple-500/20 rounded p-3">
            <h4 className="text-xs font-semibold text-purple-300 mb-1">📚 Use Cases</h4>
            <p className="text-xs text-gray-400">{details.useCase}</p>
          </div>
        </div>
      )}
    </div>
  );
}
