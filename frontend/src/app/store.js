import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import votesReducer from "../features/votes/votesSlice";
import submemmitsReducer from "../features/submemmits/submemmitsSlice";
import searchReducer from "../features/search/searchSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    votes: votesReducer,
    submemmits: submemmitsReducer,
    search: searchReducer,
  },
});
