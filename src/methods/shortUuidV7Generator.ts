import { DEFAULT_ALPHABET, getRandomBytes, toBase } from "./baseFunctions";

let shortUuidV7Counter = 0;

export function generateShortUuidV7(): string {
  const timestamp = BigInt(Date.now());
  const counter = shortUuidV7Counter++;
  const random = getRandomBytes(8);

  const buffer = new ArrayBuffer(16);
  const view = new DataView(buffer);

  const timestampLower = Number(timestamp & BigInt(0xffffffff));
  const timestampUpper = Number((timestamp >> BigInt(32)) & BigInt(0xffff));
  view.setUint32(0, timestampLower);
  view.setUint16(4, timestampUpper);

  view.setUint8(6, counter % 256);

  random.forEach((byte, index) => {
    if (index < 9) view.setUint8(7 + index, byte);
  });

  const bytes = new Uint8Array(buffer);
  let num = BigInt(0);
  for (const byte of bytes) {
    num = (num << BigInt(8)) + BigInt(byte);
  }

  const result = toBase(num);
  return result.padStart(22, DEFAULT_ALPHABET);
}
