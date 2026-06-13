import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../app/slices/counter";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
