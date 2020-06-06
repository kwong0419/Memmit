const posts = require("express").Router();

const {
  getAllPosts,
  getAllPostsForSubscribedSubmemmits,
  getAllPostsBySingleUser,
  insertSinglePost,
  deleteSinglePost,
} = require("../queries/postQueries");

const { checkFirebaseToken } = require("../middleware/auth");

posts.get("/", checkFirebaseToken, getAllPosts);
posts.get("/:id", checkFirebaseToken, getAllPostsForSubscribedSubmemmits);
posts.get("/user/:owner_id", getAllPostsBySingleUser);
posts.post("/", insertSinglePost);
posts.delete("/:id", deleteSinglePost);

module.exports = posts;
