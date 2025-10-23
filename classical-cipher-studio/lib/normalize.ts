// Metin normalizasyon ve ASCII kontrolü

const TURKISH_CHARS = ['ç', 'Ç', 'ğ', 'Ğ', 'ı', 'İ', 'ö', 'Ö', 'ş', 'Ş', 'ü', 'Ü'];

export function hasTurkishChars(text: string): boolean {
  return TURKISH_CHARS.some(char => text.includes(char));
}

export function strictAsciiCheck(text: string): boolean {
  // Sadece ASCII A-Z, a-z, boşluk ve noktalama
  return /^[a-zA-Z\s.,;:!?'-]*$/.test(text);
}

export function normalizeInput(
  text: string,
  options: {
    strictAscii?: boolean;
    keepSpaces?: boolean;
    preserveNonLetters?: boolean;
    uppercaseOutput?: boolean;
  } = {}
): { text: string; error?: string } {
  const {
    strictAscii = true,
    keepSpaces = false,
    preserveNonLetters = false,
    uppercaseOutput = true,
  } = options;

  // Türkçe karakter kontrolü
  if (strictAscii && hasTurkishChars(text)) {
    return {
      text: '',
      error: 'Girdi Türkçe karakter içeriyor (ç,ğ,ı,ö,ş,ü). Strict ASCII modu etkin!',
    };
  }

  if (strictAscii && !strictAsciiCheck(text)) {
    return {
      text: '',
      error: 'Girdi ASCII A-Z dışında karakter içeriyor. Lütfen düzeltin!',
    };
  }

  let result = text;

  // Harfleri normalize et
  if (!preserveNonLetters) {
    result = result
      .split('')
      .filter(c => {
        if (/[a-zA-Z]/.test(c)) return true;
        if (keepSpaces && c === ' ') return true;
        return false;
      })
      .join('');
  }

  // Büyük/küçük harf
  result = uppercaseOutput ? result.toUpperCase() : result.toLowerCase();

  return { text: result };
}

export function filterLettersOnly(text: string, uppercase = true): string {
  const letters = text.replace(/[^a-zA-Z]/g, '');
  return uppercase ? letters.toUpperCase() : letters.toLowerCase();
}
