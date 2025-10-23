// Base64 Encoding/Decoding
import { CipherResult } from '../types';

export function base64Encode(input: string): CipherResult {
  try {
    const encoded = btoa(input);
    return { success: true, output: encoded };
  } catch (error) {
    return { success: false, error: 'Base64 encoding hatası!' };
  }
}

export function base64Decode(input: string): CipherResult {
  try {
    const decoded = atob(input);
    return { success: true, output: decoded };
  } catch (error) {
    return { success: false, error: 'Base64 decoding hatası: Geçersiz format!' };
  }
}
