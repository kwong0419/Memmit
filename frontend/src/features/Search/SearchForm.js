import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import "../../css/SearchForm.css";
import { receiveAllSearchedPosts } from "./searchSlice";
import { useHistory } from "react-router-dom";

export default function SearchForm() {
  const API = apiURL();
  const dispatch = useDispatch();
  const history = useHistory();

  const [input, setInput] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.get(`${API}/posts/search/${input}`);
      dispatch(receiveAllSearchedPosts(res.data.body.search));
      history.push("/search");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="search" onSubmit={handleSearch}>
      <img
        id="searchIcon"
        alt="searchIcon"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAyMjYgMjI2IgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDIyNnYtMjI2aDIyNnYyMjZ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iIzg3OGE4YyI+PHBhdGggZD0iTTk3LjkzMzMzLDIyLjZjLTQxLjUxNjIyLDAgLTc1LjMzMzMzLDMzLjgxNzExIC03NS4zMzMzMyw3NS4zMzMzM2MwLDQxLjUxNjIyIDMzLjgxNzExLDc1LjMzMzMzIDc1LjMzMzMzLDc1LjMzMzMzYzE4LjA1MzY5LDAgMzQuNjMzNjMsLTYuNDEwOTcgNDcuNjI3NzQsLTE3LjA1M2w0NC45NzkzLDQ0Ljk3OTNjMS44ODk0OCwxLjk2ODAxIDQuNjk1MjgsMi43NjA3OCA3LjMzNTI3LDIuMDcyNTZjMi42NCwtMC42ODgyMiA0LjcwMTY3LC0yLjc0OTg5IDUuMzg5ODksLTUuMzg5ODljMC42ODgyMiwtMi42NCAtMC4xMDQ1NSwtNS40NDU3OSAtMi4wNzI1NiwtNy4zMzUyN2wtNDQuOTc5MywtNDQuOTc5M2MxMC42NDIwMiwtMTIuOTk0MSAxNy4wNTMsLTI5LjU3NDA0IDE3LjA1MywtNDcuNjI3NzRjMCwtNDEuNTE2MjIgLTMzLjgxNzExLC03NS4zMzMzMyAtNzUuMzMzMzMsLTc1LjMzMzMzek05Ny45MzMzMywzNy42NjY2N2MzMy4zNzM1OSwwIDYwLjI2NjY3LDI2Ljg5MzA4IDYwLjI2NjY3LDYwLjI2NjY3YzAsMzMuMzczNTkgLTI2Ljg5MzA3LDYwLjI2NjY3IC02MC4yNjY2Nyw2MC4yNjY2N2MtMzMuMzczNTksMCAtNjAuMjY2NjcsLTI2Ljg5MzA3IC02MC4yNjY2NywtNjAuMjY2NjdjMCwtMzMuMzczNTkgMjYuODkzMDgsLTYwLjI2NjY3IDYwLjI2NjY3LC02MC4yNjY2N3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
      />
      <input
        id="searchInput"
        type="text"
        placeholder="Search for posts"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
    </form>
  );
}
