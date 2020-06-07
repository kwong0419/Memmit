import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
const API = apiURL();

const Upload = ({ cb }) => {
  const [file, setFile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    switchToggle();
  });

  const handleUploadSubmit = async (e, call) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imageUpload", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    if (file) {
      axios
        .post(`${API}/uploadphoto`, formData, config)
        .then((response) => {
          alert("The file is successfully uploaded");
          call(response.data);
        })
        .catch((error) => {
          alert("Could not upload... please upload valid image");
        });
    } else {
      alert("Could not upload... please upload valid image");
    }
  };

  const switchToggle = () => (file ? setToggle(true) : setToggle(false));

  const checkImageType = (e) => {
    let files = e.target.files;
    let err = "";
    const types = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    for (var x = 0; x < files.length; x++) {
      if (types.every((type) => files[x].type !== type)) {
        err += files[x].type + " is not a supported format\n";
      }
    }
    if (err !== "") {
      e.target.value = null;
      alert(err);
      return false;
    }
    return true;
  };

  const fileOnChange = (e) => {
    if (checkImageType(e)) {
      setFile(e.target.files[0]);
      setErrorMessage("");
    } else {
      setErrorMessage("File type is invalid, please upload jpeg, png, gif");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleUploadSubmit(e, cb);
      }}
    >
      <label for="imageInput">
        <img
          id="uploadBtn"
          alt="upload"
          src="https://img.icons8.com/ios-glyphs/30/000000/image.png"
        />
        <span className="uploadText">Upload Picture</span>
      </label>
      <input
        type="file"
        id="imageInput"
        name="imageUpload"
        onChange={fileOnChange}
        style={{ visibility: "hidden" }}
      />
      {toggle ? (
        <button className="cancelBtn" type="submit">
          upload
        </button>
      ) : null}
      {errorMessage ? <h4>{errorMessage}</h4> : null}
    </form>
  );
};

export default Upload;
