import { getCountry } from "@/infrastructure/getCountry";
import VersionSimple from "@/view/VersionSimple";

export default async function Page() {
  const country = await getCountry();
  return <VersionSimple country={country} />;
}
