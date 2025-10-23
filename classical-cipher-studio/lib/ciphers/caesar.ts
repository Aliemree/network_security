// Caesar Cipher
import { CipherOptions, CipherResult } from '../types';
import { normalizeInput, filterLettersOnly } from '../normalize';

export function caesarEncrypt(plaintext: string, options: CipherOptions = {}): CipherResult {
  const { shift = 3, uppercaseOutput = true } = options;

  const normalized = normalizeInput(plaintext, options);
  if (normalized.error) {
    return { success: false, error: normalized.error };
  }

  const text = filterLettersOnly(normalized.text, uppercaseOutput);
  const normalizedShift = ((shift % 26) + 26) % 26;

  const result = text
    .split('')
    .map(char => {
      const base = uppercaseOutput ? 65 : 97; // 'A' or 'a'
      const code = char.charCodeAt(0) - base;
      const newCode = (code + normalizedShift) % 26;
      return String.fromCharCode(base + newCode);
    })
    .join('');

  return { success: true, output: result };
}

export function caesarDecrypt(ciphertext: string, options: CipherOptions = {}): CipherResult {
  return caesarEncrypt(ciphertext, { ...options, shift: -(options.shift || 3) });
}
