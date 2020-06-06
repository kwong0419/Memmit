import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllVotes } from "./votesSlice";
import "../../css/Votes.css";

export default function Votes({ post_id }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchAllVotes());
  }, []);
  return (
    <div className="votesComponent">
      <button class="voteBtn" id="upvoteBtn">
        <img
          alt="upvote"
          src="https://img.icons8.com/material/24/000000/up--v2.png"
        />
      </button>
      <h6>150</h6>
      <button class="voteBtn" id="downvoteBtn">
        <img
          alt="downvote"
          src="https://img.icons8.com/material/24/000000/down--v2.png"
        />
      </button>
    </div>
  );
}

// import React, { useEffect } from "react";
// import Linkify from "linkifyjs/react";
// import { useSelector, useDispatch } from "react-redux";
// import { selectPosts, fetchAllPosts } from "./postsSlice";

// export default function Home() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchAllPosts());
//   }, []);
