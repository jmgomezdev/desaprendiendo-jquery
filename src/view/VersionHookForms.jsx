"use client";

import {
  CHARACTERS,
  DRAGON_PRICE,
  INITIAL_VALUES,
  getTotal,
  isDanerys,
} from "@/domain/model";
import useGetCountry from "@/hooks/useGetCountry";
import { currencyFormatter } from "@/lib/format";
import Image from "next/image";
import { useForm } from "react-hook-form";

export default function VersionHookForms() {
  const { country, loading } = useGetCountry();
  const { register, handleSubmit, watch } = useForm({
    mode: "change",
    // resolver: zodResolver(formSchema),
    defaultValues: INITIAL_VALUES,
  });

  const characterValue = watch("character");

  const onSubmit = (data) => {
    console.log(data);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="character">Elige un personaje:</label>
          <select {...register("character")}>
            {CHARACTERS.map((character) => (
              <option key={character.name} value={character.price}>
                {character.name} ({character.price}€)
              </option>
            ))}
          </select>
        </div>
        {isDanerys(characterValue) && (
          <div>
            <input type="checkbox" {...register("dragon")} />
            <label htmlFor="dragon">
              Con dragón en el hombro ({DRAGON_PRICE})
            </label>
          </div>
        )}

        <div>
          <label htmlFor="quantity">Cantidad:</label>
          <input type="number" min="1" {...register("quantity")} />
        </div>

        <div id="tax" className="flex items-center gap-2">
          <Image
            src={country?.flag}
            alt={country?.name}
            width={20}
            height={20}
            loading="lazy"
          />
          Impuesto: <span id="tax-percentage">{country?.tax}%</span>
        </div>
        <button type="submit">Calcular</button>
      </form>
      <div id="result">
        <h3 className="text-base lg:text-lg">
          Precio total:{" "}
          <span id="total">
            {currencyFormatter.format(getTotal(watch(), country?.tax))}
          </span>
        </h3>
      </div>
    </main>
  );
}
