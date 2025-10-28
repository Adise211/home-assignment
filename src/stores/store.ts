import { configureStore } from "@reduxjs/toolkit";
import tableConfigSlice from "./tableConfigSlice";

export const store = configureStore({
  reducer: {
    tableConfig: tableConfigSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
