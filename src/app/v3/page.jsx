import { getCountry } from "@/infrastructure/getCountry";
import VersionReducer from "@/view/VersionReducer";

export default async function Page() {
  const country = await getCountry();
  return <VersionReducer country={country} />;
}
