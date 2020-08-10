import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchAllVotes } from "./votesSlice";
import "../../css/Votes.css";
import { AuthContext } from "../../providers/AuthContext";
import { apiURL } from "../../util/apiURL";
import axios from "axios";
const API = apiURL();

export default function Votes({ post_id }) {
  const { currentUser, token } = useContext(AuthContext);
  const dispatch = useDispatch();
  const history = useHistory();

  const upVotePost = async () => {
    if (currentUser && token) {
      try {
        await axios({
          method: "post",
          url: `${API}/votes/post/${post_id}/${currentUser.id}`,
          headers: {
            AuthToken: token,
          },
        });
        dispatch(fetchAllVotes(post_id));
      } catch (error) {
        console.log(error);
      }
    } else {
      history.push("/login");
    }
  };

  const downVotePost = async () => {
    if (currentUser && token) {
      try {
        await axios({
          method: "delete",
          url: `${API}/votes/post/${post_id}/${currentUser.id}`,
          headers: {
            AuthToken: token,
          },
        });
        dispatch(fetchAllVotes(post_id));
      } catch (error) {
        console.log(error);
      }
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {
    dispatch(fetchAllVotes(post_id));
  }, []);

  let votes = useSelector((state) => state.votes[post_id]);

  return (
    <div className="votesComponent">
      <button className="voteBtn" id="upvoteBtn" onClick={upVotePost}>
        ↑
        {/* <img
          alt="upvote"
          src="https://img.icons8.com/material/24/000000/up--v2.png"
        /> */}
      </button>
      {votes ? <h4>{votes.length}</h4> : null}
      <button className="voteBtn" id="downvoteBtn" onClick={downVotePost}>
        {/* <img
          alt="downvote"
          src="https://img.icons8.com/material/24/000000/down--v2.png"
        /> */}
        ↓
      </button>
    </div>
  );
}
