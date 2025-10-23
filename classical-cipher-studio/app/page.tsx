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
          <h2 className="text-2xl font-bold text-white mb-4">Desteklenen Algoritmalar</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <AlgorithmItem name="Caesar Cipher" desc="Kaydırma tabanlı basit şifreleme" />
            <AlgorithmItem name="Monoalphabetic" desc="Anahtar kelime ile alfabetik değişim" />
            <AlgorithmItem name="Vigenère Cipher" desc="Polyalphabetic şifreleme (autokey destekli)" />
            <AlgorithmItem name="Playfair Cipher" desc="5×5 matris ile digraph şifreleme" />
            <AlgorithmItem name="Hill Cipher" desc="N×N matris ile matematiksel şifreleme" />
            <AlgorithmItem name="Columnar Transposition" desc="Sütun permütasyonu ile transpozisyon" />
            <AlgorithmItem name="Differential XOR" desc="Blok XOR tabanlı modern cipher" />
            <AlgorithmItem name="Base64" desc="Binary-to-text encoding" />
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

function AlgorithmItem({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded">
      <Lock className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
      <div>
        <div className="font-semibold text-white">{name}</div>
        <div className="text-sm text-gray-400">{desc}</div>
      </div>
    </div>
  );
}
