import { BaseIdGenerator } from "./baseGenerator";

/**
 * A concrete ID generator that produces shortened UUID v7 IDs.
 * This class extends the `BaseIdGenerator` and generates 22-character IDs in the format `base62(timestamp + random)`.
 */
export class ShortUuidV7Generator extends BaseIdGenerator {
  /**
   * A static counter used to ensure uniqueness in the generated IDs.
   */
  private static counter = 0;

  /**
   * Generates a 22-character shortened UUID v7.
   * The format of the ID is `base62(timestamp + random)`.
   * @returns A 22-character string representing the shortened UUID v7.
   * @example
   * const shortUuidV7 = new ShortUuidV7Generator().generate();
   */
  generate(): string {
    const timestamp = BigInt(Date.now());
    const counter = ShortUuidV7Generator.counter++;
    const random = this.getRandomBytes(8);

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

    const result = this.toBase(num);
    return result.padStart(22, BaseIdGenerator.DEFAULT_ALPHABET[0]);
  }
}
