import { createSlice } from "@reduxjs/toolkit";
import { apiURL } from "../../util/apiURL";
import axios from "axios";

const API = apiURL();

export const fetchAllVotes = (postId) => async (dispatch) => {
  try {
    let res = await axios.get(`${API}/votes/post/${postId}`);
    dispatch(receiveAllVotes(res.data.body));
  } catch (error) {
    console.log(error);
  }
};

export const votesSlice = createSlice({
  name: "votes",
  initialState: {},
  reducers: {
    receiveAllVotes: (state, action) => {
      let postId = action.payload.searchPostID;
      let votes = action.payload.result;
      state[postId] = votes;
    },
  },
});

export const { receiveAllVotes } = votesSlice.actions;
export default votesSlice.reducer;
