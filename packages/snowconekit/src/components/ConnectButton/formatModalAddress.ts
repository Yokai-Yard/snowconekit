export function formatModalAddress(address: string): string {
  const leadingChars = 6;
  const trailingChars = 8;

  return address.length < leadingChars + trailingChars
    ? address
    : `${address.substring(0, leadingChars)}\u2026${address.substring(
        address.length - trailingChars
      )}`;
}
