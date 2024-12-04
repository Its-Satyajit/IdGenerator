/**
 * Synchronous Hash ID generator using SHA-256 (manual implementation).
 * @param {string | Uint8Array} input - Input to hash.
 * @returns {string} Hash ID string (hexadecimal).
 */
export function generateHashId(input: string | Uint8Array): string {
  // Convert input to string if it is a Uint8Array
  let strInput: string = "";
  let message: number[] = [];

  if (typeof input === "string") {
    strInput = input;
    message = encodeMessage(strInput);
  } else if (input instanceof Uint8Array) {
    message = Array.from(input); // Convert Uint8Array to a regular number[]
  } else {
    throw new TypeError("Input must be a string or Uint8Array");
  }

  // SHA-256 constants
  const K: number[] = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4,
    0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe,
    0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f,
    0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc,
    0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
    0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116,
    0x1e376c08, 0x3f6e1a1f, 0x5a2f079a, 0x6ea6e483, 0x7f2d0c7e, 0x8c080a3e, 0x9f0b0e4e,
    0xa3e1d10d, 0xafb8e2c2, 0xb4efc84f, 0xc3b4b328, 0xd2d0b6a5, 0xe1e0be19, 0xf0f1ff8a,
    0x01f1f0e0,
  ];

  // Initial hash values
  let H: number[] = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab,
    0x5be0cd19,
  ];

  // Padding the message to be a multiple of 512 bits
  const paddedMessage: number[] = padMessage(message);

  // Processing the message in 512-bit chunks
  for (let i = 0; i < paddedMessage.length; i += 64) {
    const chunk = paddedMessage.slice(i, i + 64);
    const w: number[] = new Array(64);

    // Break chunk into 16 32-bit words
    for (let j = 0; j < 16; j++) {
      w[j] =
        (chunk[j * 4] << 24) |
        (chunk[j * 4 + 1] << 16) |
        (chunk[j * 4 + 2] << 8) |
        chunk[j * 4 + 3];
    }

    // Extend the 16 words into 64 words
    for (let j = 16; j < 64; j++) {
      const s0 =
        rightRotate(w[j - 15], 7) ^ rightRotate(w[j - 15], 18) ^ (w[j - 15] >>> 3);
      const s1 =
        rightRotate(w[j - 2], 17) ^ rightRotate(w[j - 2], 19) ^ (w[j - 2] >>> 10);
      w[j] = (w[j - 16] + s0 + w[j - 7] + s1) & 0xffffffff;
    }

    // Initialize working variables
    let [a, b, c, d, e, f, g, h] = H;

    // Main loop for the 64 words
    for (let j = 0; j < 64; j++) {
      const temp1 = (h + sigma1(e) + ch(e, f, g) + K[j] + w[j]) & 0xffffffff;
      const temp2 = (sigma0(a) + maj(a, b, c)) & 0xffffffff;

      h = g;
      g = f;
      f = e;
      e = (d + temp1) & 0xffffffff;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) & 0xffffffff;
    }

    // Add the compressed chunk to the hash values
    H[0] = (H[0] + a) & 0xffffffff;
    H[1] = (H[1] + b) & 0xffffffff;
    H[2] = (H[2] + c) & 0xffffffff;
    H[3] = (H[3] + d) & 0xffffffff;
    H[4] = (H[4] + e) & 0xffffffff;
    H[5] = (H[5] + f) & 0xffffffff;
    H[6] = (H[6] + g) & 0xffffffff;
    H[7] = (H[7] + h) & 0xffffffff;
  }

  // Convert hash values to hexadecimal
  return H.map((h) => ("00000000" + h.toString(16)).slice(-8)).join("");
}

// Helper functions
function encodeMessage(str: string): number[] {
  const message: number[] = [];
  for (let i = 0; i < str.length; i++) {
    message.push(str.charCodeAt(i));
  }
  return message;
}

function padMessage(message: number[]): number[] {
  const length = message.length * 8;
  message.push(0x80); // Append a single '1' bit
  while (message.length % 64 !== 56) {
    message.push(0x00); // Pad with '0' bits
  }

  // Append the length of the message as a 64-bit big-endian integer
  for (let i = 7; i >= 0; i--) {
    message.push((length >>> (i * 8)) & 0xff);
  }

  return message;
}

function rightRotate(value: number, bits: number): number {
  return (value >>> bits) | (value << (32 - bits));
}

function sigma0(x: number): number {
  return rightRotate(x, 2) ^ rightRotate(x, 13) ^ rightRotate(x, 22);
}

function sigma1(x: number): number {
  return rightRotate(x, 6) ^ rightRotate(x, 11) ^ rightRotate(x, 25);
}

function ch(x: number, y: number, z: number): number {
  return (x & y) ^ (~x & z);
}

function maj(x: number, y: number, z: number): number {
  return (x & y) ^ (x & z) ^ (y & z);
}
