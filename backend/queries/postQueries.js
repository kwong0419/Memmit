const db = require("../db/index");

const getAllPosts = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "Success",
      message: "get ALL posts with users",
      body: {
        posts: await db.any(
          "SELECT submemmit_id, name AS submemmit_name, post_id, users_posts.owner_id, title, image_url, body, timestamp, user_id, username FROM submemmits INNER JOIN (SELECT posts.id AS post_id, owner_id, submemmit_id, title, image_url, body, timestamp, users.id AS user_id, username FROM posts INNER JOIN users ON posts.owner_id = users.id) AS users_posts ON submemmits.id = users_posts.submemmit_id ORDER BY post_id DESC"
        ),
      },
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getAllPostsForSubscribedSubmemmits = async (req, res, next) => {
  try {
    const { id } = req.params;
    res.status(200).json({
      status: "Success",
      message: "get ALL posts for subscribed submemmit",
      body: {
        userID: id,
        posts: await db.any(
          "SELECT * FROM subscriptions INNER JOIN (SELECT submemmit_id, name AS submemmit_name, post_id, users_posts.owner_id, title, image_url, body, timestamp, user_id, username FROM submemmits INNER JOIN (SELECT posts.id AS post_id, owner_id, submemmit_id, title, image_url, body, timestamp, users.id AS user_id, username FROM posts INNER JOIN users ON posts.owner_id = users.id) AS users_posts ON submemmits.id = users_posts.submemmit_id) AS all_posts ON subscriptions.submemmitID = all_posts.submemmit_id WHERE userID = $1 ORDER BY posts_id DESC",
          [id]
        ),
      },
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getAllPostsBySingleUser = async (req, res, next) => {
  try {
    const { owner_id } = req.params;
    res.status(200).json({
      status: "Success",
      message: "Got all posts by user id: " + owner_id,
      body: {
        posts: await db.any(
          "SELECT owner_id, submemmit_id, image_url, body FROM posts INNER JOIN users ON posts.owner_id = users.id WHERE posts.owner_id = $1 ORDER BY posts.id DESC",
          [owner_id]
        ),
      },
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const insertSinglePost = async (req, res, next) => {
  try {
    let { owner_id, submemmit_id, title, image_url, body } = req.body;
    let single_post = await db.one(
      "INSERT INTO posts (owner_id, submemmit_id, title, image_url, body) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [owner_id, submemmit_id, title, image_url, body]
    );
    res.status(200).json({
      status: "Success",
      message: "Created a single post",
      body: { single_post },
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const deleteSinglePost = async (req, res, next) => {
  try {
    let { id } = req.params;
    res.status(200).json({
      status: "Success",
      message: "Deleted post with id: " + id,
      body: {
        single_post: await db.one(
          "DELETE FROM posts WHERE id = $1 RETURNING *",
          id
        ),
      },
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getAllSearchedPosts = async (req, res, next) => {
  let { input } = req.params;
  try {
    let search = await db.any(
      "SELECT submemmit_id, name AS submemmit_name, post_id, users_posts.owner_id, title, image_url, body, timestamp, user_id, username FROM submemmits INNER JOIN (SELECT posts.id AS post_id, owner_id, submemmit_id, title, image_url, body, timestamp, users.id AS user_id, username FROM posts INNER JOIN users ON posts.owner_id = users.id) AS users_posts ON submemmits.id = users_posts.submemmit_id WHERE title LIKE $1 OR submemmits.name LIKE $1 ORDER BY post_id DESC",
      ["%" + input + "%"]
    );
    res.status(200).json({
      status: "Success",
      message: "Got all searched posts by: " + input,
      body: {
        search,
      },
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = {
  getAllPosts,
  getAllPostsForSubscribedSubmemmits,
  getAllPostsBySingleUser,
  insertSinglePost,
  deleteSinglePost,
  getAllSearchedPosts,
};
