// Caesar Cipher
import { CipherOptions, CipherResult, EncryptionStep } from '../types';
import { normalizeInput, filterLettersOnly } from '../normalize';

export function caesarEncrypt(plaintext: string, options: CipherOptions = {}): CipherResult {
  const { shift = 3, uppercaseOutput = true } = options;

  const normalized = normalizeInput(plaintext, options);
  if (normalized.error) {
    return { success: false, error: normalized.error };
  }

  const text = filterLettersOnly(normalized.text, uppercaseOutput);
  const normalizedShift = ((shift % 26) + 26) % 26;

  const steps: EncryptionStep[] = [];
  let result = '';

  // Initial step
  steps.push({
    stepNumber: 0,
    description: `Caesar Cipher ile şifreleme başlıyor (Shift: ${normalizedShift})`,
    input: text,
    output: '',
    details: `Her harf ${normalizedShift} pozisyon kaydırılacak`,
  });

  // Process each character
  text.split('').forEach((char, index) => {
    const base = uppercaseOutput ? 65 : 97;
    const code = char.charCodeAt(0) - base;
    const newCode = (code + normalizedShift) % 26;
    const newChar = String.fromCharCode(base + newCode);
    result += newChar;

    steps.push({
      stepNumber: index + 1,
      description: `Harf ${index + 1}: '${char}' → '${newChar}'`,
      input: char,
      output: newChar,
      calculation: `${char}(${code}) + ${normalizedShift} = ${newCode} → ${newChar}`,
      details: `Pozisyon: ${code} + Shift: ${normalizedShift} = ${newCode} (mod 26)`,
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
    details: `Toplam ${text.length} harf şifrelendi`,
  });

  return { success: true, output: result, steps };
}

export function caesarDecrypt(ciphertext: string, options: CipherOptions = {}): CipherResult {
  return caesarEncrypt(ciphertext, { ...options, shift: -(options.shift || 3) });
}
