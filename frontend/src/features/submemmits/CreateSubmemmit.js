import React, { useState, useContext } from "react";
import axios from "axios";
import Upload from "../posts/Upload";
import { apiURL } from "../../util/apiURL";
import { AuthContext } from "../../providers/AuthContext";
import "../../css/CreateSubmemmit.css";
import { useHistory } from "react-router-dom";

const API = apiURL();

export default function CreateSubmemmit() {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [alert, setAlert] = useState("");
  const [path, setPath] = useState("");

  const history = useHistory();

  const addSubmemmit = async (e) => {
    e.preventDefault();
    if (name && path && about) {
      try {
        const res = await axios.post(`${API}/submemmits`, {
          name: name,
          owner_id: currentUser.id,
          banner_pic_url: path,
          about_community: about,
        });
        if (res.data.error) {
          if (res.data.error["detail"].includes("exists.")) {
            setAlert(
              "Submemmit name already exists. Please choose another name"
            );
          }
        } else {
          setAlert("Submemmit has successfully been created.");
          const { id } = res.data.body.submemmits[0];
          setTimeout(() => {
            history.push(`/submemmit/${id}`);
          }, 1000);
        }
        setName("");
        setAbout("");
      } catch (error) {
        console.log(error);
      }
    } else {
      setAlert("Please fill out all fields and upload a banner picture");
    }
  };

  return (
    <div className="createSubmemmit">
      <img
        id="communityBanner"
        alt="communityBanner"
        src="https://www.redditstatic.com/desktop2x/img/partner-connection.png"
      />
      <form className="formDiv" onSubmit={addSubmemmit}>
        <h1>Create a Submemmit Community</h1>
        <input
          className="submemmitInput"
          type="text"
          placeholder="Submemmit Name"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          className="submemmitInput"
          type="text"
          placeholder="What's your community about?"
          required
          value={about}
          onChange={(e) => {
            setAbout(e.target.value);
          }}
        />
        <div className="uploadContainer">
          <Upload cb={setPath} />
        </div>
        <br />
        <br />
        {alert ? (
          <>
            <h4 style={{ color: "red" }}>{alert}</h4>
            <br />
            <br />
          </>
        ) : null}
        <button className="submitBtn" type="submit">
          CREATE
        </button>
        <br />
        <br />
        <img
          style={{ borderRadius: "48%" }}
          alt="snoo art"
          src="https://www.clipartkey.com/mpngs/m/211-2113956_reddit-default-snoo.png"
        />
      </form>
    </div>
  );
}
