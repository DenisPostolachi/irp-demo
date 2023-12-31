export function generateRandomString(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function generateRandomIP() {
  function randomIPv4() {
    return Array.from(Array(4))
      .map(() => Math.floor(Math.random() * 256))
      .join('.');
  }

  return randomIPv4();
}
