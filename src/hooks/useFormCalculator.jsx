import { useReducer } from "react";

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

export default function useFormCalculator(initialValues) {
  const [formData, setFormData] = useReducer(formReducer, initialValues);

  const handleCharacter = (e) => {
    setFormData({
      type: ACTIONS.UPDATE_CHARACTER,
      payload: e.target.value,
    });
  };

  const handleDragonVisible = () => {
    setFormData({
      type: ACTIONS.UPDATE_DRAGON,
    });
  };

  const handleQuantity = (e) => {
    setFormData({
      type: ACTIONS.UPDATE_QUANTITY,
      payload: e.target.value,
    });
  };

  // DEBERIA IR EN DOMINIO
  const total = (tax, dragonPrice) => {
    return tax
      ? formData.quantity *
          (parseFloat(formData.character) +
            parseFloat(formData.dragon ? dragonPrice : 0)) *
          (1 + tax / 100)
      : null;
  };

  return {
    handleCharacter,
    handleDragonVisible,
    handleQuantity,
    total,
    formData,
  };
}
