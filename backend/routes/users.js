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
users.post("/addUser", insertSingleUser);
users.delete("/:id", deleteUsersById);
users.get("/search/:username", searchUserByName);

module.exports = users;
