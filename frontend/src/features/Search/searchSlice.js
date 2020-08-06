import { createSlice } from "@reduxjs/toolkit";

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
