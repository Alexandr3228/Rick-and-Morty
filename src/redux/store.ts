import { configureStore } from "@reduxjs/toolkit";

import character from "./slices/characterSlice.ts";

export const store = configureStore({
  reducer: {
    character,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
