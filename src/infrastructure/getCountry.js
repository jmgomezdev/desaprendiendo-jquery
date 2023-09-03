import {
  countryAdapter,
  countryAdapterClient,
} from "@/infrastructure/countryAdapter";

export async function getCountry() {
  const res = await fetch(
    "https://api.apipip.com/v1/random-country/?format=json"
  );
  const data = await res.json();
  const country = countryAdapter(data);
  return country;
}

export async function getCountryClient() {
  return fetch("https://randomuser.me/api/")
    .then((res) => res.json())
    .then((data) => countryAdapterClient(data));
}
