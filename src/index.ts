/**
 * Utility class for generating various types of unique identifiers
 */
export class IdGenerator {
  private static readonly DEFAULT_ALPHABET =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  private static lastTimestamp = 0n;
  private static counter = 0;

  /**
   * Generates a fixed 10-character random ID
   * @returns A 16-character random string by default
   */
  static generate(size: number = 16): string {
    return IdGenerator.generateCustomId(size);
  }

  /**
   * Generates a custom length random ID
   * @param length The length of the ID to generate
   * @returns A random string of the specified length
   */
  private static generateCustomId(length: number): string {
    const bytes = new Uint8Array(length * 2);
    crypto.getRandomValues(bytes);

    let result = "";
    const alphabet = IdGenerator.DEFAULT_ALPHABET;
    const alphabetLength = alphabet.length;

    for (let i = 0; i < bytes.length && result.length < length; i++) {
      const randomValue = bytes[i];
      if (randomValue < Math.floor(256 / alphabetLength) * alphabetLength) {
        result += alphabet[randomValue % alphabetLength];
      }
    }

    while (result.length < length) {
      const bytes = new Uint8Array(1);
      crypto.getRandomValues(bytes);
      const randomValue = bytes[0];
      if (randomValue < Math.floor(256 / alphabetLength) * alphabetLength) {
        result += alphabet[randomValue % alphabetLength];
      }
    }

    return result;
  }

  /**
   * Generates a UUID v7 string
   * @returns A UUID v7 string
   */
  private static uuidV7(): string {
    const timestamp = BigInt(Date.now());

    if (timestamp <= IdGenerator.lastTimestamp) {
      IdGenerator.counter++;
    } else {
      IdGenerator.counter = 0;
      IdGenerator.lastTimestamp = timestamp;
    }

    const timestampHex = timestamp.toString(16).padStart(12, "0");
    const randomBytes = new Uint8Array(10);
    crypto.getRandomValues(randomBytes);

    randomBytes[0] = (randomBytes[0] & 0x0f) | 0x70;
    randomBytes[1] = (randomBytes[1] & 0x3f) | 0x80;

    const randomHex = Array.from(randomBytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const uuidHex = `${timestampHex}${randomHex}`;
    return uuidHex.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, "$1-$2-$3-$4-$5");
  }

  /**
   * Generates a 22-character shortened UUID v7
   * Format: base62(timestamp + random)
   * @returns A 22-character string
   */
  static shortUuidV7(): string {
    const timestamp = BigInt(Date.now());
    const counter = IdGenerator.counter++;
    const random = new Uint8Array(8);
    crypto.getRandomValues(random);

    // Combine timestamp, counter, and random into a single buffer
    const buffer = new ArrayBuffer(16);
    const view = new DataView(buffer);

    // Write timestamp (6 bytes)
    const timestampLower = Number(timestamp & BigInt(0xffffffff));
    const timestampUpper = Number((timestamp >> BigInt(32)) & BigInt(0xffff));
    view.setUint32(0, timestampLower);
    view.setUint16(4, timestampUpper);

    // Write counter (1 byte)
    view.setUint8(6, counter % 256);

    // Write random bytes (9 bytes)
    random.forEach((byte, index) => {
      if (index < 9) view.setUint8(7 + index, byte);
    });

    // Convert to base62
    const bytes = new Uint8Array(buffer);
    let num = BigInt(0);
    for (const byte of bytes) {
      num = (num << BigInt(8)) + BigInt(byte);
    }

    let result = "";
    const alphabet = IdGenerator.DEFAULT_ALPHABET;
    while (num > 0) {
      const remainder = Number(num % BigInt(62));
      result = alphabet[remainder] + result;
      num = num / BigInt(62);
    }

    // Pad to ensure consistent length
    return result.padStart(22, alphabet[0]);
  }

  /**
   * Generates a sortable time-based ID
   * Format: base36(timestamp)-base62(random)
   * @returns A time-based ID string
   */
  static timeId(): string {
    const timestamp = Date.now().toString(36);
    const random = IdGenerator.generateCustomId(8);
    return `${timestamp}-${random}`;
  }
}
