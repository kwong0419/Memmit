import React from "react";
import Linkify from "linkifyjs/react";
import { useSelector } from "react-redux";
import { selectSearchedPosts } from "./searchSlice";
import { apiURL } from "../../util/apiURL";
import { NavLink } from "react-router-dom";
import Votes from "../votes/Votes";
import "../../css/Home.css";

export default function SearchedPosts() {
  const API = apiURL();
  //   const dispatch = useDispatch();
  //   const { currentUser } = useContext(AuthContext);

  const searchedPosts = useSelector(selectSearchedPosts);

  //   useEffect(() => {
  // if (currentUser) {
  // dispatch(fetchAllPostsAuth);
  // } else {
  // dispatch();
  // }
  //   }, []);

  return (
    <div className="home">
      <div className="leftContainer">
        {searchedPosts.length ? (
          searchedPosts.map((post) => {
            let dateTime = post.timestamp;
            dateTime = new Date();
            return (
              <div className="post" key={post.post_id}>
                <Votes post_id={post.post_id} fetchAllPosts={searchedPosts} />
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
                    <img src={post.image_url} alt="postImage" id="postImage" />
                  ) : null}
                  {post.image_url.includes("/uploads/") ? (
                    <img
                      src={`${API}/${post.image_url}`}
                      alt="postImage"
                      id="postImage"
                    />
                  ) : null}
                  <Linkify tagName="p">{post.body}</Linkify>
                </div>
              </div>
            );
          })
        ) : (
          <div className="searchErrorContainer">
            <img
              src="https://preview.redd.it/hhwmkzqpqzpz.jpg?auto=webp&s=e0483f15583ed40c8f81a6e9d9c89bda11446dd4"
              alt="error"
            />
            <p id="searchErrorMsg">Sorry, there were no results found!</p>
          </div>
        )}
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
