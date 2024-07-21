export function removeProvinceCityPrefix(inputStr) {
  if (!inputStr) return inputStr;

  if (inputStr === 'Tỉnh Bà Rịa - Vũng Tàu') {
    return 'Vũng Tàu';
  }

  const prefixes = ['Thành Phố ', 'Tỉnh ', 'Thành phố '];
  for (let prefix of prefixes) {
    if (inputStr.startsWith(prefix)) {
      return inputStr.slice(prefix.length);
    }
  }
  return inputStr;
}
