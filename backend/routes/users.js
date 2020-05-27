const users = require("express").Router();

const {
  getAllUsers,
  getSingleUserById,
  insertSingleUser,
  deleteUserById,
  searchUserByName,
} = require("../queries/usersQueries");

const { checkFirebaseToken } = require("../middleware/auth");

users.get("/", checkFirebaseToken, getAllUsers);
users.get("/:id", getSingleUserById);
users.post("/", insertSingleUser);
users.delete("/:id", deleteUserById);
users.get("/search/:username", searchUserByName);

module.exports = users;
