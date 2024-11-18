import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NameUpdaterState {
  name: string;
}

const initialState: NameUpdaterState = {
  name: "_",
};

export const nameUpdaterSlice = createSlice({
  name: "nameUpdater",
  initialState,
  reducers: {
    updateNameClientSide: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { updateNameClientSide } = nameUpdaterSlice.actions;
export default nameUpdaterSlice.reducer;
