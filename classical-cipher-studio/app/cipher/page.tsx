'use client';

import { useState } from 'react';
import { ArrowLeft, Lock, Unlock, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import {
  caesarEncrypt,
  caesarDecrypt,
  monoEncrypt,
  monoDecrypt,
  vigenereEncrypt,
  vigenereDecrypt,
  playfairEncrypt,
  playfairDecrypt,
  hillEncrypt,
  hillDecrypt,
  columnarEncrypt,
  columnarDecrypt,
  funEncrypt,
  funDecrypt,
  base64Encode,
  base64Decode,
} from '@/lib/ciphers';

type CipherType = 'caesar' | 'mono' | 'vigenere' | 'playfair' | 'hill' | 'columnar' | 'fun' | 'base64';
type Mode = 'encrypt' | 'decrypt';

export default function CipherPage() {
  const [cipher, setCipher] = useState<CipherType>('caesar');
  const [mode, setMode] = useState<Mode>('encrypt');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Cipher-specific options
  const [shift, setShift] = useState(3);
  const [keyword, setKeyword] = useState('');
  const [matrix, setMatrix] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [autokey, setAutokey] = useState(false);
  const [ijMerge, setIjMerge] = useState(true);

  const handleProcess = () => {
    setError('');
    setOutput('');

    try {
      let result;
      const options = {
        shift,
        keyword,
        key: keyword,
        matrix,
        passphrase,
        autokey,
        ijMerge,
        strictAscii: true,
        uppercaseOutput: true,
      };

      switch (cipher) {
        case 'caesar':
          result = mode === 'encrypt' ? caesarEncrypt(input, options) : caesarDecrypt(input, options);
          break;
        case 'mono':
          result = mode === 'encrypt' ? monoEncrypt(input, options) : monoDecrypt(input, options);
          break;
        case 'vigenere':
          result = mode === 'encrypt' ? vigenereEncrypt(input, options) : vigenereDecrypt(input, options);
          break;
        case 'playfair':
          result = mode === 'encrypt' ? playfairEncrypt(input, options) : playfairDecrypt(input, options);
          break;
        case 'hill':
          result = mode === 'encrypt' ? hillEncrypt(input, options) : hillDecrypt(input, options);
          break;
        case 'columnar':
          result = mode === 'encrypt' ? columnarEncrypt(input, options) : columnarDecrypt(input, options);
          break;
        case 'fun':
          result = mode === 'encrypt' ? funEncrypt(input, options) : funDecrypt(input, options);
          break;
        case 'base64':
          result = mode === 'encrypt' ? base64Encode(input) : base64Decode(input);
          break;
      }

      if (result.success) {
        setOutput(result.output || '');
      } else {
        setError(result.error || 'Bilinmeyen hata');
      }
    } catch (err) {
      setError('İşlem sırasında bir hata oluştu: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200">
            <ArrowLeft className="w-5 h-5" />
            Ana Sayfaya Dön
          </Link>
        </div>

        <div className="bg-slate-800/70 backdrop-blur rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-white mb-6">Cipher Playground</h1>

          {/* Cipher Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { value: 'caesar', label: 'Caesar' },
              { value: 'mono', label: 'Monoalphabetic' },
              { value: 'vigenere', label: 'Vigenère' },
              { value: 'playfair', label: 'Playfair' },
              { value: 'hill', label: 'Hill' },
              { value: 'columnar', label: 'Columnar' },
              { value: 'fun', label: 'Diff. XOR' },
              { value: 'base64', label: 'Base64' },
            ].map((c) => (
              <button
                key={c.value}
                onClick={() => setCipher(c.value as CipherType)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  cipher === c.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Mode Selection */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setMode('encrypt')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold ${
                mode === 'encrypt'
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              <Lock className="w-5 h-5" />
              Şifrele
            </button>
            <button
              onClick={() => setMode('decrypt')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold ${
                mode === 'decrypt'
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              <Unlock className="w-5 h-5" />
              Çöz
            </button>
          </div>

          {/* Cipher-specific options */}
          <div className="mb-6 space-y-4">
            {cipher === 'caesar' && (
              <div>
                <label className="block text-white mb-2">Shift (Kaydırma):</label>
                <input
                  type="number"
                  value={shift}
                  onChange={(e) => setShift(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg"
                />
              </div>
            )}

            {(cipher === 'mono' || cipher === 'vigenere' || cipher === 'playfair' || cipher === 'columnar') && (
              <div>
                <label className="block text-white mb-2">
                  {cipher === 'vigenere' ? 'Anahtar (Key):' : 'Anahtar Kelime (Keyword):'}
                </label>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg"
                  placeholder={cipher === 'playfair' ? 'örn: MONARCHY' : 'örn: LEMON'}
                />
              </div>
            )}

            {cipher === 'vigenere' && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={autokey}
                  onChange={(e) => setAutokey(e.target.checked)}
                  className="w-4 h-4"
                />
                <label className="text-white">Autokey Modu</label>
              </div>
            )}

            {cipher === 'playfair' && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={ijMerge}
                  onChange={(e) => setIjMerge(e.target.checked)}
                  className="w-4 h-4"
                />
                <label className="text-white">I/J Birleştir</label>
              </div>
            )}

            {cipher === 'hill' && (
              <div>
                <label className="block text-white mb-2">Matris (örn: 6,24,1;13,16,10;20,17,15):</label>
                <input
                  type="text"
                  value={matrix}
                  onChange={(e) => setMatrix(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg font-mono"
                  placeholder="6,24,1;13,16,10;20,17,15"
                />
              </div>
            )}

            {cipher === 'fun' && (
              <div>
                <label className="block text-white mb-2">Passphrase:</label>
                <input
                  type="text"
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg"
                  placeholder="mysecretpassphrase"
                />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="mb-4">
            <label className="block text-white mb-2">
              {mode === 'encrypt' ? 'Düz Metin (Plaintext):' : 'Şifreli Metin (Ciphertext):'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-32 px-4 py-2 bg-slate-700 text-white rounded-lg resize-none font-mono"
              placeholder={mode === 'encrypt' ? 'ATTACKATDAWN' : 'Şifreli metni buraya yapıştırın...'}
            />
          </div>

          {/* Process Button */}
          <button
            onClick={handleProcess}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            {mode === 'encrypt' ? 'Şifrele' : 'Çöz'}
          </button>

          {/* Error */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500 text-red-200 rounded-lg">
              {error}
            </div>
          )}

          {/* Output */}
          {output && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-white">
                  {mode === 'encrypt' ? 'Şifreli Metin (Ciphertext):' : 'Düz Metin (Plaintext):'}
                </label>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Kopyalandı!' : 'Kopyala'}
                </button>
              </div>
              <div className="p-4 bg-slate-700 rounded-lg">
                <pre className="text-white font-mono whitespace-pre-wrap break-all">{output}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
