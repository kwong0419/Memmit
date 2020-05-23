const posts = require("express").Router();

const {
  getAllPostsForSubscribedSubmemmits,
  getAllPostsBySingleUser,
  insertSinglePost,
  deleteSinglePost,
} = require("../queries/postQueries");

posts.get("/:id", getAllPostsForSubscribedSubmemmits);
posts.get("/user/:owner_id", getAllPostsBySingleUser);
posts.post("/", insertSinglePost);
posts.delete("/:id", deleteSinglePost);

module.exports = posts;
