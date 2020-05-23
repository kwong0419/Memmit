const users = require("express").Router();

const {
  getAllUsers,
  getSingleUserById,
  insertSingleUser,
  deleteUserById,
  searchUserByName,
} = require("../queries/usersQueries");

users.get("/", getAllUsers);
users.get("/:id", getSingleUserById);
users.post("/", insertSingleUser);
users.delete("/:id", deleteUserById);
users.get("/search/:username", searchUserByName);

module.exports = users;
