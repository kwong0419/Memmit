import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import { useRouteMatch } from "react-router-dom";
import "../../css/Submemmit.css";

export default function Submemmit() {
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
  }, []);

  return (
    <div className="submemmit">
      <img id="bannerPic" alt="community banner picture" src={bannerPicUrl} />
      <h1>{name}</h1>
      <p>{aboutCommunity}</p>
    </div>
  );
}
