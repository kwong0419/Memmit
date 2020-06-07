import { createSlice } from "@reduxjs/toolkit";
import { apiURL } from "../../util/apiURL";
import axios from "axios";
const API = apiURL();

export const submemmitsSlice = createSlice({
  name: "submemmits",
  initialState: [],
  reducers: {
    addSubmemmit: (state, action) => state.push(action.payload),
    receiveAllSubmemmits: (state, action) => action.payload,
  },
});

export const selectSubmemmits = (state) => state.submemmits;

export const { addSubmemmit, receiveAllSubmemmits } = submemmitsSlice.actions;
export default submemmitsSlice.reducer;
