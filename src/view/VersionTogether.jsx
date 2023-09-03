"use client";

import { CHARACTERS, DRAGON_PRICE } from "@/domain/characters";
import { currencyFormatter } from "@/lib/format";
import Image from "next/image";
import { useState } from "react";

export default function VersionTogether({ country }) {
  const [values, setValues] = useState({
    character: CHARACTERS[0].price,
    dragon: false,
    dragonVisible: false,
    quantity: 1,
  });

  const handleChangeInput = (e) => {
    const { name, value, checked } = e.target;
    if (name === "character") {
      const isDanerys = value === "16.5" ? true : false;
      setValues((prev) => ({
        ...prev,
        dragon: isDanerys,
        dragonVisible: isDanerys,
      }));
    }
    if (name === "dragon") {
      setValues((prev) => ({ ...prev, dragon: checked }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const total =
    values.quantity *
    (parseFloat(values.character) +
      parseFloat(values.dragon ? DRAGON_PRICE : 0)) *
    (1 + country.tax / 100);

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <div>
        <label htmlFor="character">Elige un personaje:</label>
        <select
          name="character"
          id="character"
          onChange={handleChangeInput}
          defaultValue={CHARACTERS[0].price}
        >
          {CHARACTERS.map((character) => (
            <option key={character.name} value={character.price}>
              {character.name} ({character.price}€)
            </option>
          ))}
        </select>
      </div>
      {values.dragonVisible && (
        <div id="dragon-option">
          <input
            type="checkbox"
            id="dragon"
            name="dragon"
            defaultChecked={true}
            onChange={handleChangeInput}
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
          name="quantity"
          min="1"
          defaultValue={1}
          onChange={handleChangeInput}
        />
      </div>

      <div id="tax" className="flex items-center gap-2">
        <Image
          src={country.flag}
          alt={country.name}
          width={20}
          height={20}
          loading="lazy"
        />
        Impuesto: <span id="tax-percentage">{country.tax}%</span>
      </div>
      <div id="result">
        <h3 className="text-base lg:text-lg">
          Precio total:{" "}
          <span id="total">{currencyFormatter.format(total)}</span>
        </h3>
      </div>
    </main>
  );
}
