import { getTax } from "@/domain/tax";

export function countryAdapter(data) {
  return {
    name: data?.name,
    tax: getTax(data?.name),
    flag: `https://flagcdn.com/w20/${data?.alpha_2?.toLowerCase()}.png`,
  };
}

export function countryAdapterClient(data) {
  const { results } = data;
  return {
    name: results[0]?.location?.country,
    tax: getTax(results[0]?.location?.country),
    flag: `https://flagcdn.com/w20/${results[0]?.nat?.toLowerCase()}.png`,
  };
}
