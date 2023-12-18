function getFormattedKeys(item) {
  const formattedKeys = {};
  for (const [key, value] of Object.entries(item)) {
    const formattedKey = key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace(/\s+/g, '');
    formattedKeys[formattedKey] = value;
  }
  return formattedKeys;
}

export { getFormattedKeys };
