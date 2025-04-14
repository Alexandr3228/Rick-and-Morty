import { configureStore } from "@reduxjs/toolkit";

import character from "./slices/characterSlice.ts";

export const store = configureStore({
  reducer: {
    character,
  },
});
