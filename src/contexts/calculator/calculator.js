import produce from "immer";
import { createContext, useContext, useReducer } from "react";

const CalculatorContext = createContext();

const initialState = {
  listOperator: [],
  isCalculate: false,
  result: "",
  display: "",
  currentValue: "",
};

function calculation(num) {
  if (num.length === 1) {
    return num;
  }
  if (num.length === 2) {
    if (num[num.length - 1].includes("-")) {
      num[0] = Number(num[0]) + Number(num[1]);
      num.splice(1, 1);
      return;
    }
  }
  for (let i = 0; i < num.length; i++) {
    if (num[i] === "*") {
      num[i - 1] = Number(num[i - 1] * num[i + 1]);
      num.splice(i, 1);
      num.splice(i, 1);
    }
    if (num[i] === "/") {
      num[i - 1] = Number(num[i - 1] / num[i + 1]);
      num.splice(i, 1);
      num.splice(i, 1);
    }
  }
  for (let i = 0; i < num.length; i++) {
    if (num[i] === "+") {
      num[i - 1] = Number(num[i - 1]) + Number(num[i + 1]);
      num.splice(i, 1);
      num.splice(i, 1);
    }
    if (num[i] === "-") {
      num[i - 1] = Number(num[i - 1]) - Number(num[i + 1]);
      num.splice(i, 1);
      num.splice(i, 1);
    }
  }
  if (num.length > 1) {
    calculation(num);
  } else {
    return num;
  }
}

function reducer(state, { type, payload }) {
  return produce(state, (draft) => {
    switch (type) {
      case "addElement":
        const lengthOfListOperator = draft.listOperator.length;
        // eslint-disable-next-line no-console
        if (draft.isCalculate) {
          draft.isCalculate = false;
          if (["+", "-", "*", "/"].includes(payload)) {
            draft.listOperator = [draft.listOperator[lengthOfListOperator - 1], payload];
            return;
          }
          draft.listOperator = [payload];
          return;
        }
        if (
          ["+", "*", "/"].includes(payload) &&
          ["+", "*", "/", "-"].includes(draft.listOperator[lengthOfListOperator - 1])
        ) {
          if (["+", "*", "/", "-"].includes(draft.listOperator[lengthOfListOperator - 2])) {
            draft.listOperator[lengthOfListOperator - 2] = payload;
            draft.listOperator[lengthOfListOperator - 1] = null;
            draft.listOperator = draft.listOperator.filter((el) => el !== null);
            return;
          }
          draft.listOperator[lengthOfListOperator - 1] = payload;
          return;
        }

        if (
          !["+", "-", "*", "/"].includes(payload) &&
          draft.listOperator[lengthOfListOperator - 1] === "-"
        ) {
          draft.listOperator[lengthOfListOperator - 1] = `${
            draft.listOperator[lengthOfListOperator - 1]
          }${payload}`;
          return;
        }

        if (
          !["+", "-", "*", "/"].includes(payload) &&
          lengthOfListOperator > 0 &&
          !["+", "-", "*", "/"].includes(draft.listOperator[lengthOfListOperator - 1])
        ) {
          draft.listOperator[lengthOfListOperator - 1] = `${
            draft.listOperator[lengthOfListOperator - 1]
          }${payload}`;
        } else {
          draft.listOperator = draft.listOperator.concat(payload);
        }
        return;
      case "caculate":
        draft.result = calculation(draft.listOperator);
        draft.isCalculate = true;
        return;
      case "reset":
        draft.listOperator = [];
        draft.isCalculate = false;
        draft.result = "";
        draft.display = "";
        draft.currentValue = "";
        return;
      default:
        return;
    }
  });
}

export function CalculatorProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CalculatorContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  return useContext(CalculatorContext);
}
