import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import { useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../../css/Submemmit.css";
import "../../css/Home.css";
import { NavLink } from "react-router-dom";
import Votes from "../votes/Votes";
import Linkify from "linkifyjs/react";
import {
  selectPosts,
  fetchAllPostsBySingleSubmemmit,
} from "../posts/postsSlice";

export default function Submemmit() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  const API = apiURL();
  const match = useRouteMatch();

  const [name, setName] = useState("");
  const [bannerPicUrl, setBannerPicUrl] = useState("");
  const [aboutCommunity, setAboutCommunity] = useState("");

  const fetchSubmemmit = async (id) => {
    try {
      let res = await axios.get(`${API}/submemmits/${id}`);
      let { name, banner_pic_url, about_community } = res.data.body.submemmit;
      setName(name);
      setBannerPicUrl(banner_pic_url);
      setAboutCommunity(about_community);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubmemmit(match.params.id);
    dispatch(fetchAllPostsBySingleSubmemmit(match.params.id));
  }, []);

  return (
    <div className="submemmit">
      <img id="bannerPic" alt="communityBannerImage" src={bannerPicUrl} />
      <div className="topContainer">
        <h1 className="submemmitName1">{name}</h1>
        <h4 className="submemmitName2">r/{name}</h4>
      </div>
      <div className="home">
        <div className="leftContainer">
          {posts.length ? (
            posts.map((post) => {
              let dateTime = post.timestamp;
              dateTime = new Date();
              return (
                <div className="post" key={post.id}>
                  <Votes post_id={post.id} fetchAllPosts={posts} />
                  <div className="postComponent">
                    <p>
                      <strong>m/{post.name} •</strong> Posted by /u/
                      {post.username} on {dateTime.toDateString()}
                    </p>
                    <h3>{post.title}</h3>
                    {post.image_url ? (
                      <img
                        src={post.image_url}
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
              <p id="searchErrorMsg">
                Sorry, there are no posts in this community yet! Start posting!
              </p>
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
                <h2>About Community</h2>
                <p style={{ padding: "0px", fontFamily: "inherit" }}>
                  {aboutCommunity}
                </p>
              </div>
            </div>
            <NavLink to={"/createPost"}>
              <button className="createBtn" id="postBtn">
                CREATE POST
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
    </div>
  );
}
