import { getCountryClient } from "@/infrastructure/getCountry";
import { useEffect, useState } from "react";

export default function useGetCountry() {
  //OJO que lo he puesto a true
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    setLoading(true);
    getCountryClient()
      .then((data) => {
        setCountry(data);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading, country };
}
