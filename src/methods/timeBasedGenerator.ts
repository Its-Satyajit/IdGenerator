import { generateRandomId } from "./randomIDGenerator";

export function generateTimeBasedId(): string {
  const timestamp = Date.now().toString(36);
  const random = generateRandomId(8);
  return `${timestamp}-${random}`;
}

export function validateTimeBasedId(id: string): boolean {
  console.log(id);
  return true;
}
