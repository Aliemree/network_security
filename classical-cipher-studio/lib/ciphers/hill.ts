// Hill Cipher (NxN Matrix)
import { CipherOptions, CipherResult, EncryptionStep } from '../types';
import { normalizeInput, filterLettersOnly } from '../normalize';

function parseMatrix(matrixStr: string): number[][] | null {
  try {
    const rows = matrixStr.split(';').map(row => 
      row.split(',').map(val => parseInt(val.trim(), 10))
    );
    
    const n = rows.length;
    if (rows.some(row => row.length !== n)) {
      return null;
    }
    
    return rows;
  } catch {
    return null;
  }
}

function modInverse(a: number, m: number): number {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  return -1;
}

function determinant(matrix: number[][]): number {
  const n = matrix.length;
  if (n === 1) return matrix[0][0];
  if (n === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }

  let det = 0;
  for (let col = 0; col < n; col++) {
    const minor = matrix.slice(1).map(row => 
      row.filter((_, idx) => idx !== col)
    );
    const sign = col % 2 === 0 ? 1 : -1;
    det += sign * matrix[0][col] * determinant(minor);
  }
  return det;
}

function cofactorMatrix(matrix: number[][]): number[][] {
  const n = matrix.length;
  if (n === 1) return [[1]];

  const cofactors: number[][] = [];
  for (let row = 0; row < n; row++) {
    const cofactorRow: number[] = [];
    for (let col = 0; col < n; col++) {
      const minor = matrix
        .filter((_, r) => r !== row)
        .map(r => r.filter((_, c) => c !== col));
      const sign = (row + col) % 2 === 0 ? 1 : -1;
      cofactorRow.push(sign * determinant(minor));
    }
    cofactors.push(cofactorRow);
  }
  return cofactors;
}

function transposeMatrix(matrix: number[][]): number[][] {
  const n = matrix.length;
  const transposed: number[][] = [];
  for (let col = 0; col < n; col++) {
    const row: number[] = [];
    for (let r = 0; r < n; r++) {
      row.push(matrix[r][col]);
    }
    transposed.push(row);
  }
  return transposed;
}

function invertMatrix(matrix: number[][]): number[][] | null {
  const det = determinant(matrix);
  const detMod = ((det % 26) + 26) % 26;
  const detInv = modInverse(detMod, 26);

  if (detInv === -1) {
    return null;
  }

  const cofactors = cofactorMatrix(matrix);
  const adjugate = transposeMatrix(cofactors);

  const n = matrix.length;
  const inverse: number[][] = [];
  for (let row = 0; row < n; row++) {
    const invRow: number[] = [];
    for (let col = 0; col < n; col++) {
      const val = (detInv * adjugate[row][col]) % 26;
      invRow.push(((val % 26) + 26) % 26);
    }
    inverse.push(invRow);
  }

  return inverse;
}

function multiplyMatrixVector(matrix: number[][], vector: number[]): number[] {
  return matrix.map(row =>
    row.reduce((sum, val, idx) => sum + val * vector[idx], 0) % 26
  );
}

export function hillEncrypt(plaintext: string, options: CipherOptions = {}): CipherResult {
  const { matrix: matrixStr, uppercaseOutput = true } = options;

  if (!matrixStr) {
    return { success: false, error: 'Hill Cipher için matris gerekli!' };
  }

  const matrix = parseMatrix(matrixStr);
  if (!matrix) {
    return { success: false, error: 'Geçersiz matris formatı! Örnek: "6,24,1;13,16,10;20,17,15"' };
  }

  const n = matrix.length;
  const det = determinant(matrix);
  const detMod = ((det % 26) + 26) % 26;
  const detInv = modInverse(detMod, 26);

  if (detInv === -1) {
    return { success: false, error: `Matris tersi alınamaz! (determinant mod 26 = ${detMod})` };
  }

  const normalized = normalizeInput(plaintext, options);
  if (normalized.error) {
    return { success: false, error: normalized.error };
  }

  let text = filterLettersOnly(normalized.text, true);

  // Pad to multiple of n
  while (text.length % n !== 0) {
    text += 'X';
  }

  const steps: EncryptionStep[] = [];

  // Show matrix
  const matrixDisplay = matrix.map(row => row.join(' ')).join('\n');
  steps.push({
    stepNumber: 0,
    description: `Hill Cipher - ${n}×${n} Matris`,
    input: text,
    output: '',
    details: `Matris:\n${matrixDisplay}\n\nDeterminant: ${det} (mod 26 = ${detMod})\nTersi alınabilir: ✓`,
  });

  let result = '';
  let blockIndex = 0;

  for (let i = 0; i < text.length; i += n) {
    const block = text.slice(i, i + n).split('').map(c => c.charCodeAt(0) - 65);
    const encrypted = multiplyMatrixVector(matrix, block);
    const encryptedChars = encrypted.map(val => String.fromCharCode(65 + val)).join('');
    result += encryptedChars;

    const blockStr = text.slice(i, i + n);
    const vectorStr = `[${block.join(', ')}]`;
    const resultStr = `[${encrypted.join(', ')}]`;

    steps.push({
      stepNumber: blockIndex + 1,
      description: `Blok ${blockIndex + 1}: '${blockStr}' → '${encryptedChars}'`,
      input: blockStr,
      output: encryptedChars,
      calculation: `Matrix × ${vectorStr} = ${resultStr} (mod 26)`,
      details: `${n} harflik blok matris çarpımı ile dönüştürüldü`,
      highlight: {
        inputIndex: Array.from({ length: n }, (_, idx) => i + idx),
        outputIndex: Array.from({ length: n }, (_, idx) => i + idx),
      },
    });

    blockIndex++;
  }

  // Final step
  steps.push({
    stepNumber: blockIndex + 1,
    description: 'Hill Cipher şifreleme tamamlandı!',
    input: text,
    output: result,
    details: `Toplam ${blockIndex} blok (${n}×${blockIndex} = ${text.length} harf) şifrelendi`,
  });

  return { success: true, output: uppercaseOutput ? result : result.toLowerCase(), steps };
}

export function hillDecrypt(ciphertext: string, options: CipherOptions = {}): CipherResult {
  const { matrix: matrixStr, uppercaseOutput = true } = options;

  if (!matrixStr) {
    return { success: false, error: 'Hill Cipher için matris gerekli!' };
  }

  const matrix = parseMatrix(matrixStr);
  if (!matrix) {
    return { success: false, error: 'Geçersiz matris formatı!' };
  }

  const inverseMatrix = invertMatrix(matrix);
  if (!inverseMatrix) {
    return { success: false, error: 'Matris tersi alınamaz!' };
  }

  const text = filterLettersOnly(ciphertext, true);
  const n = matrix.length;

  let result = '';

  for (let i = 0; i < text.length; i += n) {
    const block = text.slice(i, i + n).split('').map(c => c.charCodeAt(0) - 65);
    const decrypted = multiplyMatrixVector(inverseMatrix, block);
    result += decrypted.map(val => String.fromCharCode(65 + val)).join('');
  }

  return { success: true, output: uppercaseOutput ? result : result.toLowerCase() };
}
