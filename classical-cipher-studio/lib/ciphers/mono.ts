// Monoalphabetic Substitution Cipher
import { CipherOptions, CipherResult } from '../types';
import { normalizeInput, filterLettersOnly } from '../normalize';

function generateSubstitutionAlphabet(keyword: string): string {
  const cleanKeyword = filterLettersOnly(keyword, true);
  const seen = new Set<string>();
  let alphabet = '';

  // Add unique letters from keyword
  for (const char of cleanKeyword) {
    if (!seen.has(char)) {
      seen.add(char);
      alphabet += char;
    }
  }

  // Add remaining letters
  for (let i = 0; i < 26; i++) {
    const char = String.fromCharCode(65 + i);
    if (!seen.has(char)) {
      alphabet += char;
    }
  }

  return alphabet;
}

export function monoEncrypt(plaintext: string, options: CipherOptions = {}): CipherResult {
  const { keyword, uppercaseOutput = true } = options;

  if (!keyword) {
    return { success: false, error: 'Monoalphabetic cipher için anahtar kelime gerekli!' };
  }

  const normalized = normalizeInput(plaintext, options);
  if (normalized.error) {
    return { success: false, error: normalized.error };
  }

  const text = filterLettersOnly(normalized.text, true);
  const substitutionAlphabet = generateSubstitutionAlphabet(keyword);

  const result = text
    .split('')
    .map(char => {
      const index = char.charCodeAt(0) - 65;
      return substitutionAlphabet[index];
    })
    .join('');

  return { success: true, output: uppercaseOutput ? result : result.toLowerCase() };
}

export function monoDecrypt(ciphertext: string, options: CipherOptions = {}): CipherResult {
  const { keyword, uppercaseOutput = true } = options;

  if (!keyword) {
    return { success: false, error: 'Monoalphabetic cipher için anahtar kelime gerekli!' };
  }

  const text = filterLettersOnly(ciphertext, true);
  const substitutionAlphabet = generateSubstitutionAlphabet(keyword);

  const result = text
    .split('')
    .map(char => {
      const index = substitutionAlphabet.indexOf(char);
      return String.fromCharCode(65 + index);
    })
    .join('');

  return { success: true, output: uppercaseOutput ? result : result.toLowerCase() };
}
