const db = require("../db/index");

const getAllPostsForSubscribedSubmemmits = (req, res, next) => {
    try{
        const { id } = req.params;
        res.status(200).json({
            status: "Success",
            message: "get ALL posts for subscribed submemmit",
            body: {
                userID: userID,
                posts: await db.any("SELECT posts.id AS post_id, posts.owner_id AS post_owner_id, submemmit_id, image_url, body, timestamp, username, name AS submemmit_name, userID  FROM posts INNER JOIN (SELECT * FROM users JOIN (SELECT * FROM submemmits JOIN subscriptions ON submemmits.id = subscriptions.submemmitID) AS subscribed_submemmits ON users.id = subscribed_submemmits.userID) AS users_subscriptions_submemmits ON posts.submemmit_id = users_subscriptions_submemmits.submemmitID WHERE userID = $1", [id])
            }
        })
    } catch (error) {
        res.json({
            error: error,
          })
    }
}

const getAllPostsBySingleUser = (req, res, next) => {
    try {
        const { owner_id } = req.params; 
        res.status(200).json({
          status: "Success",
          message: "Got all posts by user id: " + owner_id,
          body: {
            posts: await db.any(
              "SELECT owner_id, submemmit_id, post_image_url, body FROM posts INNER JOIN users ON posts.owner_id = users.id WHERE posts.owner_id = $1 ORDER BY posts.id DESC",
              owner_id
            ),
          },
        });
      } catch (error) {
        res.json({
            error: error
        })
      }
}

const insertSinglePost = (req, res, next) => {
    try {
        let { owner_id, submemmit_id, post_image_url, body } = req.body;
        let single_post = await db.one(
          "INSERT INTO posts (owner_id, submemmit_id, post_image_url, body) VALUES ($1, $2, $3, $4) RETURNING *",
          [owner_id, submemmit_id, post_image_url, body]
        );
        res.status(200).json({
          status: "Success",
          message: "Created a single post",
          body: { single_post }
        });
      } catch (error) {
        res.json({
            error: error
        })
      }
}

const deleteSinglePost = (req, res, next) => {
    try {
        let { id } = req.params;
        res.status(200).json({
          status: "Success",
          message: "Deleted post with id: " + id,
          body: {
            single_post: await db.one(
                "DELETE FROM posts WHERE id = $1 RETURNING *",
                id
              )
          },
        });
      } catch (error) {
        res.json({
            error: error
        })
      }
}


module.exports = { getAllPostsForSubscribedSubmemmits, getAllPostsBySingleUser, insertSinglePost, deleteSinglePost }
