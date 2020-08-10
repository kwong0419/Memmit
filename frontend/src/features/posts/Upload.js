import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import "../../css/Upload.css";

const Upload = ({ cb }) => {
  const [file, setFile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [toggle, setToggle] = useState(false);
  const [toggleUploadMsg, setToggleUploadMsg] = useState(false);

  useEffect(() => {
    switchToggle();
  });

  const switchToggle = () => (file ? setToggle(true) : setToggle(false));

  const checkImageType = (e) => {
    let files = e.target.files;
    let err = "";
    const types = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    for (let x = 0; x < files.length; x++) {
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

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    if (checkImageType(e)) {
      setFile((imageFile) => image);
      setErrorMessage("");
    } else {
      setErrorMessage("File type is invalid, please upload jpeg, png, gif");
    }
  };

  const handleFirebaseUpload = (e, cb) => {
    e.preventDefault();
    if (file === "") {
      alert(`Please choose a valid file before uploading`);
    } else if (file !== null) {
      const uploadTask = storage.ref(`/images/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          var progress =
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          console.log(snapShot);
        },
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              cb(fireBaseUrl);
            });
        }
      );
      setToggleUploadMsg(true);
    } else {
      setToggleUploadMsg(false);
    }
  };

  return (
    <form
      id="uploadForm"
      onSubmit={(e) => {
        handleFirebaseUpload(e, cb);
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
        onChange={handleFileChange}
      />
      {toggle ? (
        <button className="cancelBtn" type="submit">
          upload
        </button>
      ) : null}
      {errorMessage ? <h4>{errorMessage}</h4> : null}
      {toggleUploadMsg ? <h5 id="uploadSuccess">Upload successful!</h5> : null}
    </form>
  );
};

export default Upload;
