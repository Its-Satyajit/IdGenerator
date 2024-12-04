/**
 * Base64 ID generator that works in both Node.js and browser environments.
 * @param {number} length - Length of the ID.
 * @returns {string} Base64 ID string.
 */
export const base64Generator = (length: number): string => {
  let randomBytes: Uint8Array;

  // For browser environment, use window.crypto.getRandomValues
  if (typeof window !== "undefined" && window.crypto) {
    randomBytes = new Uint8Array(Math.ceil((length * 3) / 4));
    window.crypto.getRandomValues(randomBytes);
  }
  // For Node.js environment, use require('crypto').randomBytes
  else if (typeof process !== "undefined" && process.versions?.node) {
    const crypto = require("crypto");
    randomBytes = crypto.randomBytes(Math.ceil((length * 3) / 4));
  } else {
    throw new Error("No suitable crypto module available.");
  }

  // Convert the random bytes to Base64 string
  let base64String: string;

  if (typeof window !== "undefined") {
    // In browsers, convert Uint8Array to a string and then use btoa
    const binaryString = String.fromCharCode(...randomBytes);
    base64String = btoa(binaryString);
  } else if (typeof process !== "undefined" && process.versions?.node) {
    // In Node.js, use Buffer to convert to Base64
    base64String = Buffer.from(randomBytes).toString("base64");
  } else {
    throw new Error("No suitable encoding method available.");
  }

  // Handle Base64 URL-safe encoding
  base64String = base64String.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");

  // Return exactly the desired length
  return base64String.substring(0, length);
};
