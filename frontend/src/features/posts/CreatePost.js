import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../../providers/AuthContext";
import { useHistory } from "react-router-dom";
import {
  selectSubmemmits,
  fetchAllSubmemmits,
} from "../submemmits/submemmitsSlice";
import { apiURL } from "../../util/apiURL";
import { NavLink } from "react-router-dom";
import Upload from "./Upload";
import axios from "axios";
import "../../css/CreatePost.css";
const API = apiURL();

export default function CreatePost() {
  const dispatch = useDispatch();
  const submemmits = useSelector(selectSubmemmits);
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    dispatch(fetchAllSubmemmits());
  }, []);

  const [titleInput, setTitleInput] = useState("");
  const [submemmitID, setSubmemmitID] = useState("");
  const [path, setPath] = useState("");
  const [bodyInput, setBodyInput] = useState("");

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (path && titleInput) {
      try {
        await axios.post(`${API}/posts/`, {
          owner_id: currentUser.id,
          submemmit_id: submemmitID,
          title: titleInput,
          image_url: path,
          body: bodyInput,
        });
        history.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="createPost">
      <div className="leftCreateDiv">
        <h1>Create a post</h1>
        <hr id="whiteline" />
        <form id="postForm" onSubmit={handleCreatePost}>
          <select
            name="submemmitList"
            id="submemmitSelect"
            onChange={(e) => {
              setSubmemmitID(e.target.value);
            }}
          >
            <option selected disabled value="">
              Choose a community
            </option>
            {submemmits.map((submemmit) => {
              return (
                <option key={submemmit.id} value={submemmit.id}>
                  {submemmit.name}
                </option>
              );
            })}
          </select>
          <div className="titleSection">
            <input
              id="titleInput"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              type="text"
              required
              placeholder="Title"
              maxLength={300}
            />
            <div className="uploadContainer">
              <Upload cb={setPath} />
            </div>
          </div>
          <textarea
            id="textArea"
            type="text"
            placeholder="Text (optional)"
            value={bodyInput}
            onChange={(e) => {
              setBodyInput(e.target.value);
            }}
          />
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
          <hr className="greyline" />
          <h4>1. Remember the human</h4>
          <hr className="greyline" />
          <h4>2. Behave like you would in real life</h4>
          <hr className="greyline" />
          <h4>3. Look for the original source of content</h4>
          <hr className="greyline" />
          <h4>4. Search for duplicates before posting</h4>
          <hr className="greyline" />
          <h4>5. Read the community's rules</h4>
          <hr className="greyline" />
        </div>
      </div>
    </div>
  );
}
