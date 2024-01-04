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

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}

export { getFormattedKeys, formatDate };
