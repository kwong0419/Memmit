import { createSlice } from "@reduxjs/toolkit";
import { apiURL } from "../../util/apiURL";
import axios from "axios";
const API = apiURL();

export const fetchAllSubmemmits = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API}/submemmits`);
    dispatch(receiveAllSubmemmits(res.data.body.submemmits));
  } catch (err) {
    console.log(err);
  }
};

export const submemmitsSlice = createSlice({
  name: "submemmits",
  initialState: [],
  reducers: {
    receiveAllSubmemmits: (state, action) => action.payload,
  },
});

export const selectSubmemmits = (state) => state.submemmits;

export const { receiveAllSubmemmits } = submemmitsSlice.actions;
export default submemmitsSlice.reducer;
