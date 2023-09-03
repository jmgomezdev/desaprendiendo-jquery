"use client";

import { CHARACTERS, DRAGON_PRICE } from "@/domain/characters";
import { currencyFormatter } from "@/lib/format";
import Image from "next/image";
import { useReducer, useState } from "react";

const ACTIONS = {
  UPDATE_CHARACTER: "UPDATE_CHARACTER",
  UPDATE_DRAGON: "UPDATE_DRAGON",
  UPDATE_DRAGON_VISIBLE: "UPDATE_DRAGON_VISIBLE",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_CHARACTER: {
      const isDanerys = action.payload === "16.5" ? true : false;
      return {
        ...state,
        character: action.payload,
        dragon: isDanerys,
        dragonVisible: isDanerys,
      };
    }
    case ACTIONS.UPDATE_DRAGON:
      return {
        ...state,
        dragon: !state.dragon,
      };
    // case ACTIONS.UPDATE_DRAGON_VISIBLE:
    //   return {
    //     ...state,
    //     dragonVisible: action.payLoad,
    //   };
    case ACTIONS.UPDATE_QUANTITY: {
      return {
        ...state,
        quantity: action.payload,
      };
    }
    default:
      return state;
  }
};

export default function VersionReducer({ country }) {
  const [formData, setFormData] = useReducer(formReducer, {
    character: CHARACTERS[0].price,
    dragon: false,
    dragonVisible: false,
    quantity: 1,
  });

  const total =
    formData.quantity *
    (parseFloat(formData.character) +
      parseFloat(formData.dragon ? DRAGON_PRICE : 0)) *
    (1 + country.tax / 100);

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <div>
        <label htmlFor="character">Elige un personaje:</label>
        <select
          name="character"
          id="character"
          onChange={(e) => {
            setFormData({
              type: ACTIONS.UPDATE_CHARACTER,
              payload: e.target.value,
            });
          }}
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
            onChange={() => {
              setFormData({
                type: ACTIONS.UPDATE_DRAGON,
              });
            }}
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
          onChange={(e) => {
            setFormData({
              type: ACTIONS.UPDATE_QUANTITY,
              payload: e.target.value,
            });
          }}
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
