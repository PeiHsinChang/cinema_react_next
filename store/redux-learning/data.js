import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: { items: [], status: "idle", error: null },
  reducers: {
    hydrateData(state, action) {
      return action.payload;
    },
  },
});

export const { hydrateData } = dataSlice.actions;
export default dataSlice.reducer;
