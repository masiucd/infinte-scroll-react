export function sleep(ms = 1200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
