import React from "react";
import "../../css/CreateSubmemmit.css";
import { addSubmemmit } from "./submemmitsSlice";

export default function CreateSubmemmit() {
  return (
    <div className="createSubmemmit">
      <img
        id="communityBanner"
        alt="communityBanner"
        src="https://www.redditstatic.com/desktop2x/img/partner-connection.png"
      />
      <form className="formDiv">
        <h1>Create a Submemmit Community</h1>
        <input
          id="submemmitNameInput"
          type="text"
          placeholder="Submemmit Name"
        />
        <br />
        <br />
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
