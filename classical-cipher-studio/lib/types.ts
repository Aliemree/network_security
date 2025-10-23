// Şifreleme seçenekleri
export interface CipherOptions {
  // Genel
  strictAscii?: boolean;
  preserveNonLetters?: boolean;
  uppercaseOutput?: boolean;
  keepSpaces?: boolean;

  // Caesar
  shift?: number;

  // Mono
  key?: string;
  keyword?: string;

  // Playfair
  ijMerge?: boolean;
  padChar?: string;

  // Hill
  matrix?: string;

  // Vigenere
  autokey?: boolean;

  // Fun/XOR
  passphrase?: string;
  blockSizeBits?: number;
  hexInput?: boolean;
}

export interface CipherResult {
  success: boolean;
  output?: string;
  error?: string;
}
