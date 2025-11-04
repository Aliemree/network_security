// Base64 Encoding/Decoding
import { CipherResult, EncryptionStep } from '../types';

const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export function base64Encode(input: string): CipherResult {
  try {
    const steps: EncryptionStep[] = [];
    
    // Initial step
    steps.push({
      stepNumber: 0,
      description: 'Base64 Encoding başlıyor',
      input: input,
      output: '',
      details: `${input.length} karakter → ${input.length} byte → Base64 encoding`,
    });

    // Convert to bytes
    const bytes: number[] = [];
    for (let i = 0; i < input.length; i++) {
      bytes.push(input.charCodeAt(i));
    }

    steps.push({
      stepNumber: 1,
      description: 'ASCII byte dizisine dönüştürülüyor',
      input: input,
      output: bytes.join(' '),
      details: `Her karakter ASCII koduna çevrildi (${bytes.length} byte)`,
    });

    // Process 3-byte groups
    let result = '';
    const groupCount = Math.ceil(bytes.length / 3);

    for (let i = 0; i < bytes.length; i += 3) {
      const b1 = bytes[i] || 0;
      const b2 = bytes[i + 1] || 0;
      const b3 = bytes[i + 2] || 0;

      // 3 bytes (24 bits) → 4 groups of 6 bits
      const n = (b1 << 16) | (b2 << 8) | b3;
      
      const c1 = BASE64_CHARS[(n >> 18) & 63];
      const c2 = BASE64_CHARS[(n >> 12) & 63];
      const c3 = i + 1 < bytes.length ? BASE64_CHARS[(n >> 6) & 63] : '=';
      const c4 = i + 2 < bytes.length ? BASE64_CHARS[n & 63] : '=';

      const groupResult = c1 + c2 + c3 + c4;
      result += groupResult;

      const binary1 = b1.toString(2).padStart(8, '0');
      const binary2 = b2 ? b2.toString(2).padStart(8, '0') : '00000000';
      const binary3 = b3 ? b3.toString(2).padStart(8, '0') : '00000000';

      steps.push({
        stepNumber: Math.floor(i / 3) + 2,
        description: `Grup ${Math.floor(i / 3) + 1}: 3 byte → 4 Base64 karakter`,
        input: `${b1} ${b2 || 0} ${b3 || 0}`,
        output: groupResult,
        calculation: `${binary1} ${binary2} ${binary3} → ${c1}${c2}${c3}${c4}`,
        details: `24 bit → 6-bit grupları: ${c1}(${(n >> 18) & 63}) ${c2}(${(n >> 12) & 63}) ${c3}${c4}`,
      });
    }

    // Final step
    steps.push({
      stepNumber: groupCount + 2,
      description: 'Base64 encoding tamamlandı!',
      input: input,
      output: result,
      details: `${bytes.length} byte → ${result.length} Base64 karakter (${Math.round((result.length / bytes.length) * 100)}% artış)`,
    });

    const encoded = btoa(input);
    return { success: true, output: encoded, steps };
  } catch (error) {
    return { success: false, error: 'Base64 encoding hatası!' };
  }
}

export function base64Decode(input: string): CipherResult {
  try {
    const decoded = atob(input);
    return { success: true, output: decoded };
  } catch (error) {
    return { success: false, error: 'Base64 decoding hatası: Geçersiz format!' };
  }
}
