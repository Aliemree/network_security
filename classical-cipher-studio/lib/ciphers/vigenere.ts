// Vigenère Cipher
import { CipherOptions, CipherResult } from '../types';
import { normalizeInput, filterLettersOnly } from '../normalize';

export function vigenereEncrypt(plaintext: string, options: CipherOptions = {}): CipherResult {
  const { key, autokey = false, uppercaseOutput = true } = options;

  if (!key) {
    return { success: false, error: 'Vigenère için anahtar gerekli!' };
  }

  const normalized = normalizeInput(plaintext, options);
  if (normalized.error) {
    return { success: false, error: normalized.error };
  }

  const text = filterLettersOnly(normalized.text, true);
  const cleanKey = filterLettersOnly(key, true);

  let currentKey = cleanKey;
  let result = '';

  for (let i = 0; i < text.length; i++) {
    const plainChar = text[i].charCodeAt(0) - 65;
    const keyChar = currentKey[i % currentKey.length].charCodeAt(0) - 65;
    const encryptedChar = (plainChar + keyChar) % 26;
    
    result += String.fromCharCode(65 + encryptedChar);

    if (autokey && i >= cleanKey.length - 1) {
      currentKey += text[i];
    }
  }

  return { success: true, output: uppercaseOutput ? result : result.toLowerCase() };
}

export function vigenereDecrypt(ciphertext: string, options: CipherOptions = {}): CipherResult {
  const { key, autokey = false, uppercaseOutput = true } = options;

  if (!key) {
    return { success: false, error: 'Vigenère için anahtar gerekli!' };
  }

  const text = filterLettersOnly(ciphertext, true);
  const cleanKey = filterLettersOnly(key, true);

  let currentKey = cleanKey;
  let result = '';

  for (let i = 0; i < text.length; i++) {
    const cipherChar = text[i].charCodeAt(0) - 65;
    const keyChar = currentKey[i % currentKey.length].charCodeAt(0) - 65;
    const decryptedChar = ((cipherChar - keyChar + 26) % 26);
    
    const decChar = String.fromCharCode(65 + decryptedChar);
    result += decChar;

    if (autokey && i >= cleanKey.length - 1) {
      currentKey += decChar;
    }
  }

  return { success: true, output: uppercaseOutput ? result : result.toLowerCase() };
}
