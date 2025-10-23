import Link from 'next/link';
import { ShieldCheck, Code2, Lock, Key } from 'lucide-react';

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
            8 klasik şifreleme algoritmasını keşfedin, test edin ve öğrenin
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <FeatureCard 
            icon={<Code2 className="w-8 h-8" />}
            title="8 Algoritma"
            description="Caesar, Vigenère, Playfair, Hill ve daha fazlası"
          />
          <FeatureCard 
            icon={<Lock className="w-8 h-8" />}
            title="Şifreleme"
            description="Metinlerinizi güvenli bir şekilde şifreleyin"
          />
          <FeatureCard 
            icon={<Key className="w-8 h-8" />}
            title="Şifre Çözme"
            description="Şifreli metinleri çözün ve anlayın"
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-8 h-8" />}
            title="Doğrulama"
            description="Türkçe karakter kontrolü ve validation"
          />
        </div>

        <div className="text-center">
          <Link 
            href="/cipher"
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-lg transition-colors"
          >
            Cipher Playground&apos;a Git
            <Code2 className="w-5 h-5" />
          </Link>
        </div>

        <div className="mt-16 bg-slate-800/50 backdrop-blur rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Desteklenen Algoritmalar ve Teorik Açıklamaları</h2>
          <p className="text-gray-400 mb-6 text-sm">
            Her algoritmanın detaylı açıklaması, çalışma prensibi ve örnekleri aşağıda yer almaktadır. 
            Ders notlarınızdaki klasik şifreleme yöntemlerinin uygulamalı versiyonlarıdır.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <AlgorithmItem 
              name="Caesar Cipher (Sezar Şifresi)" 
              desc="Kaydırma tabanlı substitution cipher"
              theory="En basit şifreleme yöntemi. Alfabedeki her harf sabit bir sayı kadar kaydırılır. Julius Caesar tarafından kullanıldığı için bu ismi almıştır. Şifreleme: C = (P + K) mod 26, Şifre Çözme: P = (C - K) mod 26"
              example="Plaintext: HELLO, Key: 3 → Ciphertext: KHOOR"
            />
            <AlgorithmItem 
              name="Monoalphabetic Substitution" 
              desc="Anahtar kelime ile tek alfabetik değişim"
              theory="Her harf başka bir harfle değiştirilir. Anahtar kelimeden oluşturulan permütasyon alfabesi kullanılır. Frekans analizi ile kırılabilir ancak Caesar'dan daha güvenlidir. Toplam 26! farklı anahtar mümkündür."
              example="Key: CIPHER → Alfabetik mapping ile HELLO → SNGGL"
            />
            <AlgorithmItem 
              name="Vigenère Cipher" 
              desc="Polyalphabetic şifreleme (autokey destekli)"
              theory="Her harf farklı kaydırma değeriyle şifrelenir. Anahtar kelime tekrar eder veya autokey modunda plaintext ile birleşir. Formül: Ci = (Pi + Ki) mod 26. Frekans analizine karşı dayanıklıdır."
              example="Plain: HELLO, Key: LEMON → SIXZT (autokey: SIXZG)"
            />
            <AlgorithmItem 
              name="Playfair Cipher" 
              desc="5×5 matris ile digraph (çift harf) şifreleme"
              theory="İlk digraph (2 harf birden) şifreleyen sistem. Anahtar kelimeden 5×5 matris oluşturulur (I/J birleştirilir). Aynı satır/sütundaki çiftler özel kurallara göre şifrelenir. Frekans analizine dayanıklıdır."
              example="Key: MONARCHY → Matrix oluştur → HE → YK, LL → PO"
            />
            <AlgorithmItem 
              name="Hill Cipher" 
              desc="Lineer cebir tabanlı N×N matris şifreleme"
              theory="Matematiksel şifreleme yöntemi. N harflik bloklar N×N anahtar matrisi ile çarpılır. C = K × P (mod 26). Şifre çözme için matris tersi gerekir: P = K⁻¹ × C. Frekans analizine tamamen dayanıklıdır."
              example="3×3 matris: [6,24,1; 13,16,10; 20,17,15] → ABC → POH"
            />
            <AlgorithmItem 
              name="Columnar Transposition" 
              desc="Sütun permütasyonu ile transpozisyon şifresi"
              theory="Substitution yerine karakterlerin pozisyonunu değiştirir (transpozisyon). Plaintext sütunlara yazılır, anahtar kelimeye göre sütunlar sıralanır ve satır satır okunur. Anagram prensibiyle çalışır."
              example="Key: ZEBRAS (5,6,1,4,2,3) → HELLO WORLD → yazıldıktan sonra sütun permütasyonu ile ELHLOL LOWRD"
            />
            <AlgorithmItem 
              name="Differential XOR Cipher" 
              desc="Blok tabanlı XOR operasyonu ile modern şifreleme"
              theory="Modern bir yöntem. Her karakter bir önceki karakterle XOR işlemi yapılır (differential encoding). XOR operasyonu: A ⊕ B ⊕ B = A (self-inverse). Stream cipher benzeri davranış gösterir."
              example="HELLO → HEX → 48 45 4C 4C 4F → XOR chain → şifreli"
            />
            <AlgorithmItem 
              name="Base64 Encoding" 
              desc="Binary veriyi ASCII metne dönüştürme"
              theory="Şifreleme değil encoding yöntemi. 3 byte (24 bit) veriyi 4 adet 6-bit gruba böler ve 64 karakterlik alfabe ile temsil eder. Email ve web'de binary veri taşımak için kullanılır. Güvenlik sağlamaz."
              example="HELLO → Binary → 010010000100010101001100... → SGVsbG8="
            />
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

function AlgorithmItem({ name, desc, theory, example }: { 
  name: string; 
  desc: string;
  theory?: string;
  example?: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 bg-slate-700/30 rounded hover:bg-slate-700/50 transition-all">
      <Lock className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <div className="font-semibold text-white mb-1">{name}</div>
        <div className="text-sm text-gray-400 mb-2">{desc}</div>
        {theory && (
          <div className="text-xs text-gray-500 mb-2 border-l-2 border-purple-500/30 pl-3">
            <span className="font-semibold text-purple-300">Teori: </span>
            {theory}
          </div>
        )}
        {example && (
          <div className="text-xs text-gray-500 font-mono bg-slate-800/50 p-2 rounded">
            <span className="font-semibold text-purple-300">Örnek: </span>
            {example}
          </div>
        )}
      </div>
    </div>
  );
}
