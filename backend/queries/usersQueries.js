const db = require("../db/index");

const getAllUsers = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "Success",
      message: "Got all Users",
      body: {
        users: await db.any("SELECT * FROM users"),
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: "Could not get all users",
    });
    next(error);
  }
};

const getSingleUserById = async (req, res, next) => {
  try {
    let { id } = req.params;
    res.status(200).json({
      status: "Success",
      message: "Got a single User",
      body: {
        single_user: await db.one("SELECT * FROM users where id = $1", [id]),
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: "No user found!",
    });
    next(error);
  }
};

const insertSingleUser = async (req, res, next) => {
  try {
    let { id, email, username, password } = req.body;
    let user = await db.one(
      "INSERT INTO users (id, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, email, username, password]
    );
    res.status(200).json({
      status: "Success",
      message: "Created new user",
      body: {
        user,
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: "Username already exists",
    });
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    let { id } = req.params;
    res.status(200).json({
      status: "Success",
      message: "Deleted user with id: " + id,
      body: {
        user: await db.one("DELETE FROM users WHERE id = $1 RETURNING *", id),
      },
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: "User could not be deleted",
    });
    next(error);
  }
};

const searchUserByName = async (req, res, next) => {
  try {
    let { username } = req.params;
    let user = await db.one(
      "SELECT * FROM users WHERE username = $1",
      username
    );
    if (user) {
      res.status(200).json({
        status: "Success",
        message: "Searched for user by username: " + username,
        body: {
          user,
        },
      });
    }
  } catch (error) {
    res.json({
      status: "Error",
      message: "No results found",
    });
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getSingleUserById,
  insertSingleUser,
  deleteUserById,
  searchUserByName,
};
