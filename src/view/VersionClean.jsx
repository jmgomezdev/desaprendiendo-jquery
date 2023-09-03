"use client";

import { CHARACTERS, DRAGON_PRICE } from "@/domain/characters";
import useFormCalculator from "@/hooks/useFormCalculator";
import useGetCountry from "@/hooks/useGetCountry";
import { currencyFormatter } from "@/lib/format";
import Image from "next/image";

export default function VersionClean() {
  const { country, loading } = useGetCountry();
  const {
    formData,
    handleCharacter,
    handleDragonVisible,
    handleQuantity,
    total,
  } = useFormCalculator({
    character: CHARACTERS[0].price,
    dragon: false,
    dragonVisible: false,
    quantity: 1,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <div>
        <label htmlFor="character">Elige un personaje:</label>
        <select
          name="character"
          id="character"
          onChange={handleCharacter}
          value={formData.character}
        >
          {CHARACTERS.map((character) => (
            <option key={character.name} value={character.price}>
              {character.name} ({character.price}€)
            </option>
          ))}
        </select>
      </div>
      {formData.dragonVisible && (
        <div id="dragon-option">
          <input
            type="checkbox"
            id="dragon"
            name="dragon"
            checked={formData.dragon}
            onChange={handleDragonVisible}
          />
          <label htmlFor="dragon">
            Con dragón en el hombro ({DRAGON_PRICE})
          </label>
        </div>
      )}

      <div>
        <label htmlFor="quantity">Cantidad:</label>
        <input
          type="number"
          id="quantity"
          min="1"
          value={formData.quantity}
          onChange={handleQuantity}
        />
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
      <div id="result">
        <h3 className="text-base lg:text-lg">
          Precio total:{" "}
          <span id="total">
            {currencyFormatter.format(total(country?.tax, DRAGON_PRICE))}
          </span>
        </h3>
      </div>
    </main>
  );
}
