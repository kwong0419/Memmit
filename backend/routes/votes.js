const votes = require("express").Router();

const {
  getVotesForSinglePost,
  upVote,
  downVote,
} = require("../queries/votesQueries");

const { checkFirebaseToken } = require("../middleware/auth");

votes.get("/post/:post_id", getVotesForSinglePost);
votes.post("/post/:post_id/:voter_id", checkFirebaseToken, upVote);
votes.delete("/post/:post_id/:voter_id", checkFirebaseToken, downVote);

module.exports = votes;
