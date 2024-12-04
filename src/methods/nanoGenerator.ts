import { DEFAULT_ALPHABET } from "./baseFunctions";

/**
 * Nano ID generator (No dependencies, works in both browser and Node.js, URL-safe).
 * @param {number} [length=21] - Length of the generated ID.
 * @returns {string} Nano ID string.
 */
export const nanoGenerator = (length = 21) => {
  // URL-safe characters (letters, digits)
  const chars = DEFAULT_ALPHABET;
  let result = "";

  // Check if we are in a browser environment
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    // Browser environment: Use crypto.getRandomValues for secure randomness
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
      result += chars[randomValues[i] % chars.length];
    }
  } else if (typeof require === "function") {
    // Node.js environment: Use crypto.randomBytes for secure randomness
    const crypto = require("crypto");
    const randomValues = crypto.randomBytes(length);

    for (let i = 0; i < length; i++) {
      result += chars[randomValues[i] % chars.length];
    }
  } else {
    // Fallback to Math.random for environments without crypto (should be rare)
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }

  return result;
};
