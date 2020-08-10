import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import "../../css/Comments.css";
import { AuthContext } from "../../providers/AuthContext";
import { useHistory } from "react-router-dom";

export default function Comments({ post_id }) {
  const API = apiURL();
  const [comments, setComments] = useState([]);
  const [toggleComments, setToggleComments] = useState(false);
  const [toggleAddComment, setToggleAddComment] = useState(false);
  const [toggleDeleteComments, setToggleDeleteComments] = useState(false);

  const [content, setContent] = useState("");
  const { currentUser, token } = useContext(AuthContext);
  const history = useHistory();

  const toggle = (state, setState) => {
    !state ? setState(true) : setState(false);
  };

  const fetchAllCommentsByPost = async (id) => {
    try {
      const res = await axios.get(`${API}/comments/post/${id}`);
      setComments(res.data.body.comments);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllCommentsByPost(post_id);
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/comments/post/${post_id}/${currentUser.id}`, {
        content: content,
      });
      fetchAllCommentsByPost(post_id);
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/comments/${id}/${post_id}`);
      fetchAllCommentsByPost(post_id);
    } catch (err) {
      console.log(err);
    }
  };

  const displayComments = () => {
    let showComments = comments.map((comment, i) => {
      if (currentUser) {
        if (currentUser.id === comment.author_id && toggleDeleteComments) {
          return (
            <div className="comment">
              <p key={i} className="commentItem">
                <strong>{comment.username}</strong> commented "{comment.content}
                "
              </p>
              {toggleDeleteComments ? (
                <img
                  className="deleteBtn"
                  src="https://img.icons8.com/color/24/000000/delete-sign.png"
                  alt="delete"
                  onClick={() => {
                    handleDelete(comment.id);
                  }}
                />
              ) : null}
            </div>
          );
        } else {
          return (
            <div className="comment">
              <p key={i} className="commentItem">
                <strong>{comment.username}</strong> commented "{comment.content}
                "
              </p>
            </div>
          );
        }
      } else {
        return (
          <div className="comment">
            <p key={i} className="commentItem">
              <strong>{comment.username}</strong> commented "{comment.content}"
            </p>
          </div>
        );
      }
    });
    if (comments.length) {
      return (
        <>
          <div className="commentsBtns">
            <img
              className="addCommentBtn"
              src="https://img.icons8.com/ios/50/000000/send-comment.png"
              alt="add"
              onClick={() => {
                if (currentUser && token) {
                  toggle(toggleAddComment, setToggleAddComment);
                } else {
                  history.push("/login");
                }
              }}
            />
            <img
              className="deleteCommentsBtn"
              src="https://img.icons8.com/ios-filled/50/000000/delete-chat.png"
              alt="delete"
              onClick={() => {
                if (currentUser && token) {
                  toggle(toggleDeleteComments, setToggleDeleteComments);
                } else {
                  history.push("/login");
                }
              }}
            />
            {toggleAddComment ? (
              <form className="addCommentForm" onSubmit={handleAddSubmit}>
                <input
                  type="text"
                  placeholder="Comment"
                  required
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
                <button type="submit" className="enterBtn">
                  <img
                    src="https://img.icons8.com/material-sharp/24/000000/enter-2.png"
                    alt="enter"
                  />
                </button>
              </form>
            ) : null}
          </div>
          {showComments}
        </>
      );
    } else {
      return (
        <>
          <div className="commentsBtns">
            <img
              className="addCommentBtn"
              src="https://img.icons8.com/ios/50/000000/send-comment.png"
              alt="add"
              onClick={() => {
                toggle(toggleAddComment, setToggleAddComment);
              }}
            />
            {toggleAddComment ? (
              <form className="addCommentForm" onSubmit={handleAddSubmit}>
                <input
                  type="text"
                  placeholder="Comment"
                  required
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
                <button type="submit" className="enterBtn">
                  <img
                    src="https://img.icons8.com/material-sharp/24/000000/enter-2.png"
                    alt="enter"
                  />
                </button>
              </form>
            ) : null}
          </div>
          <h6 className="noComments">No comments yet!</h6>
        </>
      );
    }
  };

  return (
    <div className="commentsDiv">
      <p
        id={post_id}
        className="toggleCommentsBtn"
        onClick={() => {
          toggle(toggleComments, setToggleComments);
        }}
      >
        view comments
      </p>
      {toggleComments ? displayComments() : null}
    </div>
  );
}
