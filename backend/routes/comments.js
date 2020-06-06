const comments = require("express").Router();

const {
  getAllCommentsFromSinglePost,
  addSingleComment,
  editSingleComment,
  deleteSingleComment,
} = require("../queries/commentsQueries");

const { checkFirebaseToken } = require("../middleware/auth");

comments.get("/post/:post_id", getAllCommentsFromSinglePost);
comments.post("/post/:post_id/:author_id", addSingleComment);
comments.patch("/:post_id/:author_id", editSingleComment);
comments.delete("/:id/:post_id", deleteSingleComment);

module.exports = comments;
