import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SideType } from "../app/appSlice";

const initialState = {
  side: "fronts",
  muted: false,
} as PlayStateTypes;
export const playSlice = createSlice({
  name: "play",
  initialState,
  reducers: {
    setSide(state, action: PayloadAction<SideType>) {
      state.side = action.payload;
    },
    setMuted(state, action: PayloadAction<boolean>) {
      state.muted = action.payload;
    },
  },
});

export const playActions = playSlice.actions;
export default playSlice.reducer;

export interface PlayStateTypes {
  side: SideType;
  muted: boolean;
}
