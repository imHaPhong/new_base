import { useEffect, useRef, useState } from "react";
import { useTodo } from "src/contexts/todos";

export default function TodoItem({ todoData, changeItemStatus, id, ...props }) {
  const { dispatch } = useTodo();

  const { title, isDone } = todoData;

  const [value, setValue] = useState(title);
  const [hover, setHover] = useState(false);
  const [edit, isEdit] = useState(false);
  const editingTimeofRef = useRef(null);
  const editRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (edit) {
        if (editRef.current && !editRef.current.contains(event.target)) {
          isEdit(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [edit]);

  function userEditHandler() {
    if (editingTimeofRef.current) {
      isEdit(true);
    }
    editingTimeofRef.current = setTimeout(() => {}, 300);
  }

  function editHandler(e) {
    setValue(e.target.value);
    if (editingTimeofRef.current) {
      clearTimeout(editingTimeofRef.current);
    }
    editingTimeofRef.current = setTimeout(() => {
      dispatch({
        type: "edit",
        payload: {
          id,
          title: e.target.value,
        },
      });
    }, 300);
  }

  return (
    <li
      {...props}
      className="py-2 border border-b-0 px-3 border-gray-100 flex items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <input type="radio" className=" focus:outline-none opacity-0 absolute " name="listItem" />

      <label className="flex items-center" onClick={() => changeItemStatus(id)}>
        <span
          className={`h-8 w-8 border mr-5 rounded-full ${
            isDone ? "border-green-300" : ""
          } flex justify-center items-center
          ${isEdit ? "" : "invisible"}
          `}
        >
          {isDone && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </span>
      </label>
      {edit ? (
        <input
          type="text"
          value={value}
          onChange={editHandler}
          className="border w-full"
          ref={editRef}
        />
      ) : (
        <p
          className={`flex-1 font-medium break-all  ${
            isDone ? "line-through text-gray-300 transition duration-200" : ""
          }`}
          onClick={userEditHandler}
        >
          {title}
        </p>
      )}
      {hover === true && !edit && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => {
            dispatch({ type: "remove", payload: id });
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </li>
  );
}
