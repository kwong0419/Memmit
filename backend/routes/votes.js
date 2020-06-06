const votes = require("express").Router();

const {
  getVotesForSinglePost,
  upVote,
  downVote,
} = require("../queries/votesQueries");

const { checkFirebaseToken } = require("../middleware/auth");

votes.get("/post/:post_id", getVotesForSinglePost);
votes.post("/post/:post_id/:voter_id", upVote);
votes.delete("/post/:post_id/:voter_id", downVote);

module.exports = votes;
