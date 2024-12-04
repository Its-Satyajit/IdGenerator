export function generateUUIDv1(): string {
  // Helper function to generate a random 48-bit node (MAC address emulation)
  function generateNode() {
    const node = Math.floor(Math.random() * (1 << 48)); // Random 48-bit node (MAC address)
    return node.toString(16).padStart(12, "0"); // Return as a 12-character hex string
  }

  // Helper function to get the current timestamp in 100-nanosecond intervals
  function generateTimestamp() {
    const now = new Date().getTime() * 10000 + 0x01b21dd213814000; // Convert current time to 100ns intervals
    return now;
  }

  // Get the current timestamp
  const timestamp = generateTimestamp();

  // Get the clock sequence (for simplicity, we use a random 14-bit value)
  const clockSequence = Math.floor(Math.random() * (1 << 14)); // Random 14-bit number

  // Get the node (using a random MAC address emulation here)
  const node = generateNode();

  // Break the timestamp into its components (100ns intervals)
  const timeLow = (timestamp & 0xffffffff).toString(16).padStart(8, "0"); // 32 bits
  const timeMid = ((timestamp >> 32) & 0xffff).toString(16).padStart(4, "0"); // 16 bits
  const timeHighAndVersion = (((timestamp >> 48) & 0x0fff) | 0x1000)
    .toString(16)
    .padStart(4, "0"); // Version 1 (UUID)
  const clockSeq = clockSequence.toString(16).padStart(4, "0"); // 14 bits as a 4-character string

  // Construct the UUID v1 format: time-low + time-mid + time-high-and-version + clock-sequence + node
  const uuid = `${timeLow}-${timeMid}-${timeHighAndVersion}-${clockSeq}-${node}`;

  return uuid;
}
