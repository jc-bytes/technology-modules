// Keep the original multiplication response field for saved work and PDF exports.
export function splitPower(value = '') {
  if (!String(value).trim()) return {digit:'', exponent:''};
  const match = String(value).match(/^\s*([0-9_]+)\s*[x×*]\s*2\s*\^\s*([0-9_]+)\s*$/i);
  return match ? {digit:match[1].replace('_',''), exponent:match[2].replace('_','')} : null;
}
export function joinPower(digit, exponent) {
  return digit || exponent ? `${digit || '_'}x2^${exponent || '_'}` : '';
}
