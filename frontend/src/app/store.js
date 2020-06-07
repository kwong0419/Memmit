import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import postsReducer from "../features/posts/postsSlice";
import votesReducer from "../features/votes/votesSlice";
import submemmitsReducer from "../features/submemmits/submemmitsSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    votes: votesReducer,
    submemmits: submemmitsReducer,
  },
});
