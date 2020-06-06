import React from "react";
import "../../css/CreatePost.css";
import { NavLink } from "react-router-dom";

export default function CreatePost() {
  return (
    <div className="createPost">
      <div className="leftCreateDiv">
        <h1>Create a post</h1>
        <hr style={{ borderTop: "#fff", borderColor: "#fff" }} />
        <form id="postForm">
          <select name="submemmitList" id="submemmitSelect">
            <option selected disabled value={1}>
              Choose a community
            </option>
          </select>
          <div className="titleSection">
            <input
              id="titleInput"
              type="text"
              placeholder="Title"
              maxLength={300}
            />
            <div className="uploadContainer">
              <img
                id="uploadBtn"
                alt="upload"
                src="https://img.icons8.com/ios-glyphs/30/000000/image.png"
              />
              <span className="uploadText">Upload Picture</span>
            </div>
          </div>
          <textarea id="textArea" type="text" placeholder="Text (optional)" />
          <div className="createPostBtns">
            <NavLink to={"/"}>
              <button className="cancelBtn">CANCEL</button>
            </NavLink>
            <button className="submitBtn" type="submit">
              POST
            </button>
          </div>
        </form>
      </div>
      <div className="rightCreateDiv">
        <div className="rulesDiv">
          <div className="topSection">
            <img
              id="snooWinkImg"
              alt="snooWink"
              src="https://preview.redd.it/m1pd3gtxch431.jpg?width=640&crop=smart&auto=webp&s=f2b25a83466ff98c07d8afd41331626f5200dfb4"
            />
            <h2>Posting to Memmit</h2>
          </div>
          <hr />
          <h4>1. Remember the human</h4>
          <hr />
          <h4>2. Behave like you would in real life</h4>
          <hr />
          <h4>3. Look for the original source of content</h4>
          <hr />
          <h4>4. Search for duplicates before posting</h4>
          <hr />
          <h4>5. Read the community's rules</h4>
          <hr />
        </div>
      </div>
    </div>
  );
}
