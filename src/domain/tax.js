export const getTax = (country) => {
  const charLower = country[0].toLowerCase();
  const isVowel = /^[aeiou]$/i.test(charLower);
  return isVowel ? 10 : 20;
};
