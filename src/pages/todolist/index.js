import { useState } from "react";
import { Link } from "react-router-dom";
import { useTodo } from "src/contexts/todos";
import TodoContainer from "./TodoContainer";

export default function TodoList() {
  const { todoList, dispatch } = useTodo();

  const listchecked = todoList.listItem;

  const [value, setValue] = useState("");

  function inputHandler(e) {
    if (e.keyCode === 13) {
      if (value === "") return;
      dispatch({ type: "add", payload: value });
      setValue("");
    }
  }

  function onChangeHandler(e) {
    setValue(e.target.value);
  }

  return (
    <div className=" flex flex-col w-screen md:w-8/12 mx-auto lg:w-4/12 ">
      <div className="flex  justify-between">
        <Link to="/" className="flex">
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
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
          <p>Back to Calculator</p>
        </Link>
        <Link to="/quote" className="flex">
          <p> Next to Random Quote Machine</p>
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
      </div>
      <h1 className=" text-6xl text-opacity-45 font-medium md:text-8xl text-red-400 text-center lg:mb-10">
        todos
      </h1>
      <div className="shadow-2xl">
        <div className="flex items-center px-1 text-xl bg-white w-full h-full">
          <svg
            onClick={() =>
              dispatch({
                type: "checkAll",
                payload:
                  listchecked.length !== listchecked.filter((el) => el.isDone === true).length,
              })
            }
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 mr-2 cursor-pointer  ${
              listchecked.length === listchecked.filter((el) => el.isDone === true).length
                ? "text-gray-600"
                : "text-gray-200"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <input
            type="text"
            value={value}
            onChange={onChangeHandler}
            onKeyDown={inputHandler}
            placeholder="What needs to be done?"
            className="w-full h-full py-4 flex-1 focus:outline-none placeholder-italic"
          />
        </div>
        <TodoContainer />
      </div>
    </div>
  );
}
