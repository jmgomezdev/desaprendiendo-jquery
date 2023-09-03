import { getCountry } from "@/infrastructure/getCountry";
import VersionTogether from "@/view/VersionTogether";

export default async function Page() {
  const country = await getCountry();
  return <VersionTogether country={country} />;
}
