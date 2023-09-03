"use client";

import { CHARACTERS, DRAGON_PRICE } from "@/domain/characters";
import { currencyFormatter } from "@/lib/format";
import Image from "next/image";
import { useState } from "react";

export default function VersionSimple({ country }) {
  const [character, setCharacter] = useState(CHARACTERS[0].price);
  const [dragon, setDragon] = useState(false);
  const [dragonVisible, setDragonVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // useEffect(() => {
  //   const isDanerys = character?.name==="Danerys Targaryen" ? true : false
  //   setDragon(isDanerys)

  // }, [character])

  const handleCharacter = (e) => {
    const isDanerys = e.target.value === "16.5" ? true : false;
    setCharacter(e.target.value);
    setDragon(isDanerys);
    setDragonVisible(isDanerys);
  };

  const handleDragon = () => {
    setDragon((prev) => !prev);
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const total =
    quantity *
    (parseFloat(character) + parseFloat(dragon ? DRAGON_PRICE : 0)) *
    (1 + country.tax / 100);

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <div>
        <label htmlFor="character">Elige un personaje:</label>
        <select id="character" value={character} onChange={handleCharacter}>
          {CHARACTERS.map((character) => (
            <option key={character.name} value={character.price}>
              {character.name} ({character.price}€)
            </option>
          ))}
        </select>
      </div>
      {dragonVisible && (
        <div id="dragon-option">
          <input
            type="checkbox"
            id="dragon"
            checked={dragon}
            onChange={handleDragon}
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
          value={quantity}
          onChange={handleQuantity}
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
