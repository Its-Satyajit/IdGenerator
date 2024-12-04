import { getRandomBytes } from "./baseFunctions";

let uuidV7LastTimestamp = 0n;
let uuidV7Counter = 0;

export function generateUuidV7(): string {
  const timestamp = BigInt(Date.now());

  if (timestamp <= uuidV7LastTimestamp) {
    uuidV7Counter++;
  } else {
    uuidV7Counter = 0;
    uuidV7LastTimestamp = timestamp;
  }

  const timestampBytes = new Uint8Array(8);
  const timestampView = new DataView(timestampBytes.buffer);
  timestampView.setBigUint64(0, timestamp, false);

  const randomBytes = getRandomBytes(10);

  let uuidBytes = new Uint8Array(16); // Use `let` instead of `const`
  uuidBytes.set(timestampBytes.slice(2), 0); // 48-bit timestamp
  uuidBytes.set(randomBytes, 6); // 16-bit counter and random bits

  // Modify the appropriate bits
  uuidBytes[6] = (uuidBytes[6] & 0x0f) | 0x70; // Clear top 4 bits and set version to 7
  uuidBytes[8] = (uuidBytes[8] & 0x3f) | 0x80; // Clear top 2 bits and set variant to 10

  const hexUuid = Array.from(uuidBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${hexUuid.slice(0, 8)}-${hexUuid.slice(8, 12)}-${hexUuid.slice(
    12,
    16
  )}-${hexUuid.slice(16, 20)}-${hexUuid.slice(20)}`;
}
