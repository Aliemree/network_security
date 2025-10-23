// Differential XOR Cipher (Python-compatible)
import { CipherOptions, CipherResult } from '../types';

function stringToBytes(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

function bytesToString(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

function deriveIVFromPassphrase(passphrase: string, blockSize: number): Uint8Array {
  const hash = new Uint8Array(blockSize);
  const passphraseBytes = stringToBytes(passphrase);
  
  for (let i = 0; i < blockSize; i++) {
    hash[i] = passphraseBytes[i % passphraseBytes.length];
  }
  
  return hash;
}

function deriveKeyFromPassphrase(passphrase: string, blockSize: number): Uint8Array {
  const key = new Uint8Array(blockSize);
  const passphraseBytes = stringToBytes(passphrase);
  
  for (let i = 0; i < blockSize; i++) {
    const idx = (i + blockSize) % passphraseBytes.length;
    key[i] = passphraseBytes[idx];
  }
  
  return key;
}

function xorBlocks(block1: Uint8Array, block2: Uint8Array): Uint8Array {
  const result = new Uint8Array(block1.length);
  for (let i = 0; i < block1.length; i++) {
    result[i] = block1[i] ^ block2[i];
  }
  return result;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

export function funEncrypt(plaintext: string, options: CipherOptions = {}): CipherResult {
  const { passphrase, blockSizeBits = 128 } = options;

  if (!passphrase) {
    return { success: false, error: 'Differential XOR için passphrase gerekli!' };
  }

  const blockSizeBytes = blockSizeBits / 8;
  const plainBytes = stringToBytes(plaintext);
  
  const iv = deriveIVFromPassphrase(passphrase, blockSizeBytes);
  const key = deriveKeyFromPassphrase(passphrase, blockSizeBytes);

  let previousBlock = iv;
  const encryptedBlocks: Uint8Array[] = [];

  for (let i = 0; i < plainBytes.length; i += blockSizeBytes) {
    const block = new Uint8Array(blockSizeBytes);
    const endIdx = Math.min(i + blockSizeBytes, plainBytes.length);
    
    for (let j = 0; j < blockSizeBytes; j++) {
      block[j] = i + j < endIdx ? plainBytes[i + j] : 0;
    }

    const xorWithPrev = xorBlocks(block, previousBlock);
    const encryptedBlock = xorBlocks(xorWithPrev, key);
    
    encryptedBlocks.push(encryptedBlock);
    previousBlock = encryptedBlock;
  }

  const allBytes = new Uint8Array(encryptedBlocks.length * blockSizeBytes);
  encryptedBlocks.forEach((block, idx) => {
    allBytes.set(block, idx * blockSizeBytes);
  });

  return { success: true, output: bytesToHex(allBytes) };
}

export function funDecrypt(ciphertext: string, options: CipherOptions = {}): CipherResult {
  const { passphrase, blockSizeBits = 128 } = options;

  if (!passphrase) {
    return { success: false, error: 'Differential XOR için passphrase gerekli!' };
  }

  try {
    const blockSizeBytes = blockSizeBits / 8;
    const cipherBytes = hexToBytes(ciphertext);
    
    const iv = deriveIVFromPassphrase(passphrase, blockSizeBytes);
    const key = deriveKeyFromPassphrase(passphrase, blockSizeBytes);

    let previousBlock = iv;
    const decryptedBlocks: Uint8Array[] = [];

    for (let i = 0; i < cipherBytes.length; i += blockSizeBytes) {
      const encryptedBlock = cipherBytes.slice(i, i + blockSizeBytes);
      const xorWithKey = xorBlocks(encryptedBlock, key);
      const decryptedBlock = xorBlocks(xorWithKey, previousBlock);
      
      decryptedBlocks.push(decryptedBlock);
      previousBlock = encryptedBlock;
    }

    const allBytes = new Uint8Array(decryptedBlocks.length * blockSizeBytes);
    decryptedBlocks.forEach((block, idx) => {
      allBytes.set(block, idx * blockSizeBytes);
    });

    // Remove null padding
    let length = allBytes.length;
    while (length > 0 && allBytes[length - 1] === 0) {
      length--;
    }

    const result = bytesToString(allBytes.slice(0, length));
    return { success: true, output: result };
  } catch (error) {
    return { success: false, error: 'Şifre çözme hatası: Geçersiz hex formatı veya passphrase!' };
  }
}
