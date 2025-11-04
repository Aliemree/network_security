// Monoalphabetic Substitution Cipher
import { CipherOptions, CipherResult, EncryptionStep } from '../types';
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

  const steps: EncryptionStep[] = [];
  const normalAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Initial step - show alphabet mapping
  steps.push({
    stepNumber: 0,
    description: `Monoalphabetic Substitution Cipher - Anahtar: ${keyword}`,
    input: text,
    output: '',
    details: `Normal: ${normalAlphabet}\nCipher: ${substitutionAlphabet}`,
  });

  let result = '';

  text.split('').forEach((char, index) => {
    const charIndex = char.charCodeAt(0) - 65;
    const newChar = substitutionAlphabet[charIndex];
    result += newChar;

    steps.push({
      stepNumber: index + 1,
      description: `Harf ${index + 1}: '${char}' → '${newChar}'`,
      input: char,
      output: newChar,
      calculation: `${char} (pozisyon ${charIndex}) → ${newChar} (substitution alphabet)`,
      details: `Normal alfabede pozisyon ${charIndex}, cipher alfabede '${newChar}'`,
      highlight: {
        inputIndex: [index],
        outputIndex: [index],
      },
    });
  });

  // Final step
  steps.push({
    stepNumber: text.length + 1,
    description: 'Şifreleme tamamlandı!',
    input: text,
    output: result,
    details: `Toplam ${text.length} harf substitution ile değiştirildi`,
  });

  return { success: true, output: uppercaseOutput ? result : result.toLowerCase(), steps };
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
