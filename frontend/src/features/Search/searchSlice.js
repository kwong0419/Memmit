import { createSlice } from "@reduxjs/toolkit";
import { apiURL } from "../../util/apiURL";
import axios from "axios";
const API = apiURL();

export const searchSlice = createSlice({
  name: "search",
  initialState: [],
  reducers: {
    receiveAllSearchedPosts: (state, action) => action.payload,
  },
});

export const selectSearchedPosts = (state) => state.search;

export const { receiveAllSearchedPosts } = searchSlice.actions;
export default searchSlice.reducer;
