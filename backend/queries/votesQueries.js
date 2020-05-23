const db = require("../db/index");

const getVotesForSinglePost = async (req, res, next) => {
  const { post_id } = req.params;
  try {
    res.status(200).json({
      status: "Success",
      message: "get All votes from post_id",
      body: {
        searchPostID: post_id,
        result: await db.any(
          "SELECT * FROM posts JOIN LIKES ON posts.id = likes.post_id WHERE posts.id = $1",
          post_id
        ),
      },
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const upVote = async (req, res, next) => {
  const { post_id, voter_id } = req.params;
  try {
    res.status(200).json({
      status: "Success",
      message: `upvoted ${post_id} by ${voter_id}`,
      body: {
        voter_id: voter_id,
        post_id: post_id,
        result: await db.one(
          "INSERT INTO likes (voter_id, post_id) VALUES($1, $2) RETURNING *",
          [voter_id, post_id]
        ),
      },
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const downVote = async (req, res, next) => {
  const { post_id, voter_id } = req.params;
  try {
    res.status(200).json({
      status: "Success",
      message: `downvoted ${post_id} by ${voter_id}`,
      body: {
        voter_id: voter_id,
        post_id: post_id,
        result: await db.one(
          "DELETE FROM likes WHERE (voter_id = $1 AND post_id = $2) RETURNING *",
          [voter_id, post_id]
        ),
      },
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = { getVotesForSinglePost, upVote, downVote };
