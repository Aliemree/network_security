// Playfair Cipher
import { CipherOptions, CipherResult } from '../types';
import { normalizeInput, filterLettersOnly } from '../normalize';

function buildPlayfairMatrix(keyword: string, ijMerge: boolean): string[][] {
  const cleanKeyword = filterLettersOnly(keyword, true);
  const seen = new Set<string>();
  const matrix: string[] = [];

  // Add unique letters from keyword
  for (const char of cleanKeyword) {
    const c = ijMerge && char === 'J' ? 'I' : char;
    if (!seen.has(c)) {
      seen.add(c);
      matrix.push(c);
    }
  }

  // Add remaining letters
  for (let i = 0; i < 26; i++) {
    const char = String.fromCharCode(65 + i);
    const c = ijMerge && char === 'J' ? 'I' : char;
    if (!seen.has(c)) {
      seen.add(c);
      matrix.push(c);
    }
  }

  // Convert to 5x5
  const grid: string[][] = [];
  for (let i = 0; i < 5; i++) {
    grid.push(matrix.slice(i * 5, (i + 1) * 5));
  }

  return grid;
}

function findPosition(matrix: string[][], char: string): [number, number] {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (matrix[row][col] === char) {
        return [row, col];
      }
    }
  }
  return [0, 0]; // Should not happen
}

function preparePairs(text: string, padChar: string): string[] {
  const pairs: string[] = [];
  let i = 0;

  while (i < text.length) {
    const first = text[i];
    let second = i + 1 < text.length ? text[i + 1] : padChar;

    if (first === second) {
      second = padChar;
      i++;
    } else {
      i += 2;
    }

    pairs.push(first + second);
  }

  return pairs;
}

export function playfairEncrypt(plaintext: string, options: CipherOptions = {}): CipherResult {
  const { keyword, ijMerge = true, padChar = 'X', uppercaseOutput = true } = options;

  if (!keyword) {
    return { success: false, error: 'Playfair için anahtar kelime gerekli!' };
  }

  const normalized = normalizeInput(plaintext, options);
  if (normalized.error) {
    return { success: false, error: normalized.error };
  }

  let text = filterLettersOnly(normalized.text, true);
  if (ijMerge) {
    text = text.replace(/J/g, 'I');
  }

  const matrix = buildPlayfairMatrix(keyword, ijMerge);
  const pairs = preparePairs(text, padChar);

  let result = '';

  for (const pair of pairs) {
    const [r1, c1] = findPosition(matrix, pair[0]);
    const [r2, c2] = findPosition(matrix, pair[1]);

    if (r1 === r2) {
      // Same row
      result += matrix[r1][(c1 + 1) % 5];
      result += matrix[r2][(c2 + 1) % 5];
    } else if (c1 === c2) {
      // Same column
      result += matrix[(r1 + 1) % 5][c1];
      result += matrix[(r2 + 1) % 5][c2];
    } else {
      // Rectangle
      result += matrix[r1][c2];
      result += matrix[r2][c1];
    }
  }

  return { success: true, output: uppercaseOutput ? result : result.toLowerCase() };
}

export function playfairDecrypt(ciphertext: string, options: CipherOptions = {}): CipherResult {
  const { keyword, ijMerge = true, uppercaseOutput = true } = options;

  if (!keyword) {
    return { success: false, error: 'Playfair için anahtar kelime gerekli!' };
  }

  let text = filterLettersOnly(ciphertext, true);
  if (ijMerge) {
    text = text.replace(/J/g, 'I');
  }

  const matrix = buildPlayfairMatrix(keyword, ijMerge);
  const pairs: string[] = [];
  
  for (let i = 0; i < text.length; i += 2) {
    pairs.push(text.slice(i, i + 2));
  }

  let result = '';

  for (const pair of pairs) {
    if (pair.length < 2) break;
    
    const [r1, c1] = findPosition(matrix, pair[0]);
    const [r2, c2] = findPosition(matrix, pair[1]);

    if (r1 === r2) {
      // Same row
      result += matrix[r1][(c1 + 4) % 5];
      result += matrix[r2][(c2 + 4) % 5];
    } else if (c1 === c2) {
      // Same column
      result += matrix[(r1 + 4) % 5][c1];
      result += matrix[(r2 + 4) % 5][c2];
    } else {
      // Rectangle
      result += matrix[r1][c2];
      result += matrix[r2][c1];
    }
  }

  return { success: true, output: uppercaseOutput ? result : result.toLowerCase() };
}
