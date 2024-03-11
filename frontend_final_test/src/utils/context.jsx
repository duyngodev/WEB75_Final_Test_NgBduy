import { createContext, useReducer, useState } from "react";

export const Context = createContext();
const initialState = {
  movie: {
    name: "",
    introduce: "",
    year: "",
    time: "",
    _id: "",
    image: {
      image_url: "",
      public_id: "",
    },
  },
  isOpen: false,
};
const reduce = (state, action) => {
  switch (action.type) {
    case "OPEN":
      return (state = { movie: action.payload, isOpen: true });
    case "CLOSE":
      return (state = { movie: initialState, isOpen: false });
  }
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reduce, initialState);
  const [input, setInput] = useState("");
  const [data, setData] = useState();
  return (
    <Context.Provider
      value={{ state, dispatch, input, setInput, data, setData }}>
      {children}
    </Context.Provider>
  );
};
