import { BaseIdGenerator } from "./baseGenerator";

export class UuidV7Generator extends BaseIdGenerator {
  private static lastTimestamp = 0n;
  private static counter = 0;

  /**
   * Generates a UUID v7 string
   * @returns A UUID v7 string
   */
  generate(): string {
    const timestamp = BigInt(Date.now());

    if (timestamp <= UuidV7Generator.lastTimestamp) {
      UuidV7Generator.counter++;
    } else {
      UuidV7Generator.counter = 0;
      UuidV7Generator.lastTimestamp = timestamp;
    }

    // Convert timestamp to 48-bit representation
    const timestampBytes = new Uint8Array(8);
    const timestampView = new DataView(timestampBytes.buffer);
    timestampView.setBigUint64(0, timestamp, false);

    // Create random bytes
    const randomBytes = this.getRandomBytes(10);

    // Construct the UUID
    const uuidBytes = new Uint8Array(16);
    uuidBytes.set(timestampBytes.slice(2), 0); // 48-bit timestamp
    uuidBytes.set(randomBytes, 6); // 16-bit counter and random bits

    // Set version (7) in the 7th byte
    uuidBytes[6] = (uuidBytes[6] & 0x0f) | 0x70; // Clear top 4 bits and set version to 7

    // Set variant (10) in the 9th byte
    uuidBytes[8] = (uuidBytes[8] & 0x3f) | 0x80; // Clear top 2 bits and set variant to 10

    // Convert to hex string with proper formatting
    const hexUuid = Array.from(uuidBytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return `${hexUuid.slice(0, 8)}-${hexUuid.slice(8, 12)}-${hexUuid.slice(
      12,
      16
    )}-${hexUuid.slice(16, 20)}-${hexUuid.slice(20)}`;
  }
}
