export const CHARACTERS = [
  {
    name: "Jon Snow",
    price: 13.5,
  },
  {
    name: "Danerys Targaryen",
    price: 16.5,
  },
  {
    name: "Tyrion Lannister",
    price: 19,
  },
];

export const DRAGON_PRICE = 44.5;

export const getTax = (country) => {
  const charLower = country[0].toLowerCase();
  const isVowel = /^[aeiou]$/i.test(charLower);
  return isVowel ? 10 : 20;
};

export const isDanerys = (value) => {
  return value == CHARACTERS[1]["price"];
};

export const INITIAL_VALUES = {
  character: CHARACTERS[0].price,
  dragon: false,
  quantity: 1,
  tax: 0,
};

export const getTotal = ({ quantity, character, dragon }, tax = 0) => {
  const dragonValue = isDanerys(character) && dragon ? DRAGON_PRICE : 0;
  return tax
    ? quantity *
        (parseFloat(character) + parseFloat(dragonValue)) *
        (1 + tax / 100)
    : null;
};
