import React, { useEffect } from "react";
import Linkify from "linkifyjs/react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosts, fetchAllPosts } from "./postsSlice";
import { NavLink } from "react-router-dom";
import Votes from "../votes/Votes";
import "../../css/Home.css";
import Comments from "../comments/Comments";

export default function Home() {
  const dispatch = useDispatch();
  // const { currentUser } = useContext(AuthContext);

  const posts = useSelector(selectPosts);

  useEffect(() => {
    // if (currentUser) {
    // dispatch(fetchAllPostsAuth);
    // } else {
    dispatch(fetchAllPosts());
    // }
  }, []);

  return (
    <div className="home">
      <div className="leftContainer">
        {posts.map((post) => {
          let dateTime = post.timestamp;
          dateTime = new Date();
          return (
            <div className="post" key={post.post_id}>
              <Votes post_id={post.post_id} fetchAllPosts={fetchAllPosts} />
              <div className="postComponent">
                <p>
                  <NavLink
                    exact
                    path
                    to={`/submemmit/${post.submemmit_id}`}
                    className="submemmitLink"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    <strong>m/{post.submemmit_name} </strong>
                  </NavLink>
                  • Posted by /u/
                  {post.username} on {dateTime.toDateString()}
                </p>
                <h3>{post.title}</h3>
                {post.image_url.includes("https") ? (
                  <img src={post.image_url} alt="" id="postImage" />
                ) : null}
                <Linkify tagName="p">{post.body}</Linkify>
                <Comments post_id={post.post_id} />
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
