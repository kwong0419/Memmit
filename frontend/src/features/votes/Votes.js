import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllVotes } from "./votesSlice";
import "../../css/Votes.css";

export default function Votes({ post_id }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllVotes(post_id));
  }, []);

  let votes = useSelector((state) => state.votes[post_id]);
  console.log(votes);
  return (
    <div className="votesComponent">
      <button className="voteBtn" id="upvoteBtn">
        <img
          alt="upvote"
          src="https://img.icons8.com/material/24/000000/up--v2.png"
        />
      </button>
      {votes ? <h4>{votes.length}</h4> : null}
      <button className="voteBtn" id="downvoteBtn">
        <img
          alt="downvote"
          src="https://img.icons8.com/material/24/000000/down--v2.png"
        />
      </button>
    </div>
  );
}
