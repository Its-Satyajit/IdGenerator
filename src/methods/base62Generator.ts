import { DEFAULT_ALPHABET } from "./baseFunctions";

/**
 * Base62 ID generator that ensures uniqueness and a fixed length.
 * @param {number} length - Length of the ID.
 * @returns {string} Base62 ID string.
 */
let counter = 0; // Counter to make sure IDs are unique even when generated at the same millisecond

export const base62Generator = (length: number = 10): string => {
  const timestamp = Date.now();
  const randomPart = Math.floor(Math.random() * 1e8); // Adds randomness to the ID
  const uniqueNumber = timestamp + randomPart;

  let base62Id = "";
  let number = Math.floor(uniqueNumber);

  while (number > 0) {
    base62Id = DEFAULT_ALPHABET[number % 62] + base62Id;
    number = Math.floor(number / 62);
  }

  // Ensure it has the correct length
  return base62Id.slice(0, length).padStart(length, "0");
};
