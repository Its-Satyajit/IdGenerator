import { encodeTimestamp } from "./baseFunctions";

/**
 * Generates a unique ID with the specified length and allowed characters.
 * The first part of the ID is encoded timestamp, the second part is random.
 *
 * @param {number} length - The length of the generated ID.
 * @param {string} characters - The string of allowed characters from which the ID is generated.
 * @returns {string} A string of the specified length, where the first part is time-based and the second part is random.
 */
export const customIDGenerator = (length: number, characters: string): string => {
  const charactersLength = characters.length;
  const halfLength = Math.floor(length / 2); // First half for unique (timestamp) and second half for random

  // Generate the first half (unique part) using the current timestamp
  const timestamp = Date.now(); // Current timestamp in milliseconds
  let encodedTimestamp = encodeTimestamp(timestamp, characters); // Encode the timestamp using the allowed characters

  // Trim or pad the encoded timestamp to ensure it's half the required length
  if (encodedTimestamp.length > halfLength) {
    encodedTimestamp = encodedTimestamp.substring(0, halfLength); // Trim if it exceeds the halfLength
  } else if (encodedTimestamp.length < halfLength) {
    encodedTimestamp = encodedTimestamp.padStart(halfLength, characters[0]); // Pad if it's too short
  }

  // Generate the second half (random part) from the allowed characters
  let randomPart = "";
  for (let i = 0; i < length - halfLength; i++) {
    randomPart += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  // Combine the unique part (timestamp) and random part
  return encodedTimestamp + randomPart;
};
