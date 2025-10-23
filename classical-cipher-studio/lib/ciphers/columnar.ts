// Columnar Transposition Cipher
import { CipherOptions, CipherResult } from '../types';
import { normalizeInput, filterLettersOnly } from '../normalize';

function getKeyOrder(key: string): number[] {
  const sortedKey = key
    .split('')
    .map((char, idx) => ({ char, idx }))
    .sort((a, b) => a.char.localeCompare(b.char));

  const order: number[] = new Array(key.length);
  sortedKey.forEach((item, rank) => {
    order[item.idx] = rank;
  });

  return order;
}

export function columnarEncrypt(plaintext: string, options: CipherOptions = {}): CipherResult {
  const { key, uppercaseOutput = true } = options;

  if (!key) {
    return { success: false, error: 'Columnar Transposition için anahtar gerekli!' };
  }

  const normalized = normalizeInput(plaintext, options);
  if (normalized.error) {
    return { success: false, error: normalized.error };
  }

  const text = filterLettersOnly(normalized.text, true);
  const cleanKey = filterLettersOnly(key, true);
  const keyLength = cleanKey.length;
  const order = getKeyOrder(cleanKey);

  // Build grid
  const rows = Math.ceil(text.length / keyLength);
  const grid: string[][] = Array(rows)
    .fill(null)
    .map(() => Array(keyLength).fill(''));

  let idx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < keyLength && idx < text.length; c++) {
      grid[r][c] = text[idx++];
    }
  }

  // Read columns in key order
  let result = '';
  for (let rank = 0; rank < keyLength; rank++) {
    const col = order.indexOf(rank);
    for (let r = 0; r < rows; r++) {
      if (grid[r][col]) {
        result += grid[r][col];
      }
    }
  }

  return { success: true, output: uppercaseOutput ? result : result.toLowerCase() };
}

export function columnarDecrypt(ciphertext: string, options: CipherOptions = {}): CipherResult {
  const { key, uppercaseOutput = true } = options;

  if (!key) {
    return { success: false, error: 'Columnar Transposition için anahtar gerekli!' };
  }

  const text = filterLettersOnly(ciphertext, true);
  const cleanKey = filterLettersOnly(key, true);
  const keyLength = cleanKey.length;
  const order = getKeyOrder(cleanKey);

  const rows = Math.ceil(text.length / keyLength);
  const fullCols = text.length % keyLength || keyLength;

  // Calculate column lengths
  const colLengths: number[] = Array(keyLength).fill(rows);
  for (let c = fullCols; c < keyLength; c++) {
    colLengths[c]--;
  }

  // Rebuild grid from columns
  const grid: string[][] = Array(rows)
    .fill(null)
    .map(() => Array(keyLength).fill(''));

  let idx = 0;
  for (let rank = 0; rank < keyLength; rank++) {
    const col = order.indexOf(rank);
    const colLen = colLengths[col];
    for (let r = 0; r < colLen; r++) {
      grid[r][col] = text[idx++];
    }
  }

  // Read row by row
  let result = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < keyLength; c++) {
      if (grid[r][c]) {
        result += grid[r][c];
      }
    }
  }

  return { success: true, output: uppercaseOutput ? result : result.toLowerCase() };
}
