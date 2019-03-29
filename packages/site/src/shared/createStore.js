import { createStore } from "redux";

export default initState => {
  return createStore((state = { ...initState }, action) => {
    switch (action.type) {
      case "SET_STATE":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  });
};
