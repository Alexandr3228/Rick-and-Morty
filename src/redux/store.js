import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import character from "./slices/characterSlice";

export const store = configureStore({
  reducer: {
    character,
  },
});
