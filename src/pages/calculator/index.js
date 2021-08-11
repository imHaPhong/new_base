import { Link } from "react-router-dom";
import { useCalculator } from "src/contexts/calculator/calculator";

function Button({ label, className, ...props }) {
  return (
    <button
      className={`bg-gray-600 border border-black text-white w-full font-bold py-6 cursor-pointer hover:text-black hover:border-gray-500 ${className}`}
      {...props}
    >
      {label}
    </button>
  );
}

export default function Calculator() {
  const data = useCalculator();

  const { listOperator } = data.state;
  const dispatch = data.dispatch;
  const operators = ["+", "-", "*", "/"];

  function clickHandler(value) {
    if (value === ".") {
      if (listOperator.includes(value)) return;
    }
    if (
      operators.includes(listOperator[listOperator.length - 1]) &&
      listOperator[listOperator.length - 1] === value
    ) {
      return;
    }
    if (value === "reset") return dispatch({ type: "reset" });
    if (value === "=") {
      if (listOperator.length === 0) {
        return;
      }
      if (operators.includes(listOperator[listOperator.length - 1])) {
        dispatch({ type: "addElement", payload: 0 });
      }
      dispatch({ type: "caculate" });
      return;
    }
    dispatch({ type: "addElement", payload: value });
  }

  return (
    <div className="flex items-center justify-center bg-gray-400 w-screen h-screen flex-col">
      <Link to="/todolist" className="text-xl mb-5 flex items-center ">
        {" "}
        <p className="mr-5">Next to Todo list</p>{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Link>
      <div className="bg-black px-1 py-1 w-10/12 container sm:w-6/12 md:w-6/12 lg:w-6/12 xl:w-3/12 2xl:w-1/5 ">
        <div className="w-full bg-black text-yellow-200 flex flex-col items-end slashed-zero text-2xl">
          <div className="py-1 text-xl">{listOperator.toString().replaceAll(",", "") || 0}</div>
          <div className="py-1 text-white">{listOperator[listOperator.length - 1] || 0}</div>
        </div>
        <div className="grid grid-cols-4 auto-rows-min grid-flow-row	">
          {new Array(9).fill(0).map((el, index) => (
            <Button
              key={index}
              onClick={() => clickHandler(10 - (index + 1))}
              value={10 - (index + 1)}
              label={10 - (index + 1)}
            />
          ))}
          <Button onClick={() => clickHandler(0)} value="0" label="0" className="col-span-2" />
          <Button onClick={() => clickHandler(".")} value="." label="." />
          <Button
            onClick={() => clickHandler("+")}
            value="+"
            label="+"
            className="bg-gray-700 col-start-4 col-end-5 row-start-3 row-end-4"
          />
          <Button
            onClick={() => clickHandler("-")}
            value="-"
            label="-"
            className="bg-gray-700 row-start-2 row-end-3 col-start-4 col-end-5"
          />
          <Button
            onClick={() => clickHandler("*")}
            value="x"
            label="x"
            className="bg-gray-700 row-start-1 row-end-2 col-start-4 col-end-5"
          />
          <Button
            onClick={() => clickHandler("/")}
            value="/"
            label="/"
            className="bg-gray-700  row-start-1 row-end-1 col-start-3 col-end-4"
          />
          <Button
            onClick={() => clickHandler("=")}
            value="="
            label="="
            className=" row-start-4 row-span-2 col-start-4 col-end-5 bg-indigo-900"
          />
          <Button
            onClick={() => clickHandler("reset")}
            value="AC"
            label="AC"
            className="bg-red-800 col-start-1 col-end-3 row-start-1 row-end-1 "
          />
        </div>
      </div>
    </div>
  );
}
