import { createSlice } from "@reduxjs/toolkit";
import { apiURL } from "../../util/apiURL";
import axios from "axios";
const API = apiURL();

export const submemmitsSlice = createSlice({
  name: "submemmits",
  initialState: [],
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    receiveAllSubmemmits: (state, action) => action.payload,
  },
});

export const selectSubmemmits = (state) => state.submemmits;

export const { addPost, receiveAllSubmemmits } = submemmitsSlice.actions;
export default submemmitsSlice.reducer;
