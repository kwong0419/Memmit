const db = require("../db/index");

const getAllPostsForSubscribedSubmemmit = (req, res, next) => {
    const { userID, }
    try{
        res.status(200).json({
            status: "Success",
            message: "get ALL posts for subscribed submemmit",
            body: {
                userID: userID,
                result: await db.any("SELECT * FROM posts INNER JOIN subscriptions ON posts.id = subscriptions.postID")
            }
        })
    } catch (error) {

    }
}

try {
    res.status(200).json({
      status: "Success",
      message: "get All votes from post_id",
      body: {
        searchPostID: post_id,
        result: await db.any(
          "SELECT * FROM posts JOIN LIKES ON posts.id = votes.post_id WHERE posts.id = $1",
          post_id
        ),
      },
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }