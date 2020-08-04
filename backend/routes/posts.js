const posts = require("express").Router();

const {
  getAllPosts,
  getAllPostsForSubscribedSubmemmits,
  getAllPostsBySingleUser,
  insertSinglePost,
  deleteSinglePost,
  getAllSearchedPosts,
} = require("../queries/postQueries");

const { checkFirebaseToken } = require("../middleware/auth");

posts.get("/", getAllPosts);
posts.get("/:id", checkFirebaseToken, getAllPostsForSubscribedSubmemmits);
posts.get("/user/:owner_id", getAllPostsBySingleUser);
posts.post("/", insertSinglePost);
posts.delete("/:id", deleteSinglePost);
posts.get("/search/:input", getAllSearchedPosts);

module.exports = posts;
