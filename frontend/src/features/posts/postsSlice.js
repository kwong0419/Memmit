import { createSlice } from "@reduxjs/toolkit";
import { apiURL } from "../../util/apiURL";
import axios from "axios";
const API = apiURL();

export const fetchAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API}/posts`);
    dispatch(receiveAllPosts(res.data.body.posts));
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllPostsAuth = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API}/posts/`);
    dispatch(receiveAllPosts(res.data.body.posts));
  } catch (err) {
    console.log(err);
  }
};

export const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    receiveAllPosts: (state, action) => action.payload,
  },
});

export const selectPosts = (state) => state.posts;

export const { addPost, receiveAllPosts } = postsSlice.actions;
export default postsSlice.reducer;
