import produce from "immer";
import { createContext, useContext, useReducer } from "react";
const { uuid } = require("uuidv4");

const TodoContext = createContext();

function saveDataToLocal(data) {
  localStorage.setItem("todo", JSON.stringify(data));
}

function getDataFromLocal() {
  return JSON.parse(localStorage.getItem("todo")) || [];
}

const initialState = {
  filter: null,
  listItem: getDataFromLocal(),
};

function reducer(state, { type, payload }) {
  return produce(state, (draft) => {
    switch (type) {
      case "changeFilter":
        draft.filter = payload;
        break;
      case "check":
        draft.listItem.map((el) => {
          if (el.id === payload) {
            el.isDone = !el.isDone;
          }
          return el;
        });
        saveDataToLocal(draft.listItem);
        break;
      case "add":
        draft.listItem = draft.listItem.concat({
          id: uuid(),
          title: payload,
          isDone: false,
          editing: false,
        });
        saveDataToLocal(draft.listItem);
        break;
      case "edit":
        draft.listItem = draft.listItem.map((el) => {
          if (el.id === payload.id) {
            el.title = payload.title;
          }
          return el;
        });
        saveDataToLocal(draft.listItem);

        break;
      case "remove":
        draft.listItem.splice(payload, 1);
        break;
      case "removeComplete":
        draft.listItem = draft.listItem.filter((el) => el.isDone !== true);
        break;
      case "checkAll":
        draft.listItem = draft.listItem.map((el) => ({
          ...el,
          isDone: payload,
        }));
        saveDataToLocal(draft.listItem);
        break;
      default:
        break;
    }
  });
}

export default function TodoProvider({ children }) {
  const [todoList, dispatch] = useReducer(reducer, initialState);

  return (
    <TodoContext.Provider
      value={{
        todoList,
        dispatch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  return useContext(TodoContext);
}
