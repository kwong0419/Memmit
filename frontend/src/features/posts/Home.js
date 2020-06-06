import React, { useEffect, useContext } from "react";
import Linkify from "linkifyjs/react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosts, fetchAllPosts, fetchAllPostsAuth } from "./postsSlice";
import { AuthContext } from "../../providers/AuthContext";
import { NavLink } from "react-router-dom";
import Votes from "../votes/Votes";
import "../../css/Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // if (currentUser) {
    // dispatch(fetchAllPostsAuth);
    // } else {
    dispatch(fetchAllPosts());
    // }
  }, []);

  const posts = useSelector(selectPosts);

  return (
    <div className="home">
      <div className="leftContainer">
        {posts.map((post) => {
          let dateTime = post.timestamp;
          dateTime = new Date();

          return (
            <div className="post" key={post.post_id}>
              <Votes post_id={post.post_id} />
              <div className="postComponent">
                <p>
                  <strong>m/{post.submemmit_name} •</strong> Posted by /u/
                  {post.username} on {dateTime.toDateString()}
                </p>
                <h3>{post.title}</h3>
                {post.image_url ? (
                  <img alt="" id="postImage" src={post.image_url} />
                ) : null}
                <Linkify tagName="p">{post.body}</Linkify>
              </div>
            </div>
          );
        })}
      </div>
      <div className="rightContainer">
        <div className="createDiv">
          <img
            id="banner2"
            alt="banner2"
            src="https://www.redditstatic.com/desktop2x/img/id-cards/home-banner@2x.png"
          />
          <div className="midSection">
            <img
              id="snooImg"
              alt="snoo"
              src="https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png"
            ></img>
            <div className="midDescription">
              <h2>Home</h2>
              <p style={{ padding: "0px", fontFamily: "" }}>
                Your personal Memmit frontpage. Come here to check in with your
                favorite communities.
              </p>
            </div>
          </div>
          <NavLink to={"/createPost"}>
            <button className="createBtn" id="postBtn">
              CREATE POST
            </button>
          </NavLink>
          <NavLink to={"/createSubmemmit"}>
            <button className="createBtn" id="submemmitBtn">
              CREATE COMMUNITY
            </button>
          </NavLink>
        </div>
        <button
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          id="backtopBtn"
        >
          Back to top
        </button>
      </div>
    </div>
  );
}
