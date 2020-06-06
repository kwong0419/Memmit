import { createSlice } from "@reduxjs/toolkit";
import { apiURL } from "../../util/apiURL";
import axios from "axios";

const API = apiURL();

export const fetchAllVotes = async (dispatch) => {
  try {
    let res = await axios.get(`${API}/votes/post/`);
    dispatch(receiveAllVotes(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const votesSlice = createSlice({
  name: "votes",
  initialState: [],
  reducers: {
    receiveAllVotes: (state, action) => action.payload,
  },
});

export const selectVotes = (state) => state.votes;

export const { receiveAllVotes } = votesSlice.actions;
export default votesSlice.reducer;
