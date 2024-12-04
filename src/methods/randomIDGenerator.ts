import { DEFAULT_ALPHABET, getRandomBytes } from "./baseFunctions";

export function generateRandomId(size: number = 16): string {
  const bytes = getRandomBytes(size * 2); // Fetch random bytes
  const alphabet = DEFAULT_ALPHABET;
  const alphabetLength = alphabet.length;

  let result = "";
  for (let i = 0; i < bytes.length && result.length < size; i++) {
    const randomValue = bytes[i]; // Ensure randomValue is a number
    if (randomValue < Math.floor(256 / alphabetLength) * alphabetLength) {
      result += alphabet[randomValue % alphabetLength]; // Use modulus to map to alphabet
    }
  }

  // Handle case where result is shorter than the desired size
  while (result.length < size) {
    const additionalBytes = getRandomBytes(1); // Get a single byte
    const randomValue = additionalBytes[0]; // Extract the value from the Uint8Array
    if (randomValue < Math.floor(256 / alphabetLength) * alphabetLength) {
      result += alphabet[randomValue % alphabetLength]; // Add to the result string
    }
  }

  return result;
}

export function validateRandomId(input: string): boolean {
  const idPattern = /^[a-zA-Z0-9]{16}$/; // Example pattern (16-character alphanumeric)
  return idPattern.test(input);
}
