// Vigenère Cipher
import { CipherOptions, CipherResult, EncryptionStep } from '../types';
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
  const steps: EncryptionStep[] = [];

  // Initial step
  steps.push({
    stepNumber: 0,
    description: `Vigenère Cipher ${autokey ? '(Autokey mode)' : ''} ile şifreleme başlıyor`,
    input: text,
    output: '',
    details: `Anahtar: ${cleanKey}${autokey ? ' (sonra plaintext ile devam eder)' : ' (tekrar eder)'}`,
  });

  for (let i = 0; i < text.length; i++) {
    const plainChar = text[i].charCodeAt(0) - 65;
    const keyChar = currentKey[i % currentKey.length].charCodeAt(0) - 65;
    const encryptedChar = (plainChar + keyChar) % 26;
    const newChar = String.fromCharCode(65 + encryptedChar);
    
    result += newChar;

    const currentKeyChar = currentKey[i % currentKey.length];
    steps.push({
      stepNumber: i + 1,
      description: `Harf ${i + 1}: '${text[i]}' + anahtar '${currentKeyChar}' → '${newChar}'`,
      input: text[i],
      output: newChar,
      calculation: `${text[i]}(${plainChar}) + ${currentKeyChar}(${keyChar}) = ${encryptedChar} → ${newChar}`,
      details: `Pozisyon: ${plainChar} + Key: ${keyChar} = ${encryptedChar} (mod 26)`,
      highlight: {
        inputIndex: [i],
        outputIndex: [i],
      },
    });

    if (autokey && i >= cleanKey.length - 1) {
      currentKey += text[i];
    }
  }

  // Final step
  steps.push({
    stepNumber: text.length + 1,
    description: 'Şifreleme tamamlandı!',
    input: text,
    output: result,
    details: `Toplam ${text.length} harf şifrelendi. ${autokey ? 'Autokey: ' + currentKey : 'Anahtar: ' + cleanKey + ' (tekrarlandı)'}`,
  });

  return { success: true, output: uppercaseOutput ? result : result.toLowerCase(), steps };
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
