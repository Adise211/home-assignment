import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TableConfigState {
  rows: number;
}

const initialState: TableConfigState = {
  rows: 5,
};

export const tableConfigSlice = createSlice({
  name: "tableConfig",
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<number>) => {
      state.rows = action.payload;
    },
  },
});

export const { setRows } = tableConfigSlice.actions;

export default tableConfigSlice.reducer;
