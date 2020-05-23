const submemmits = require("express").Router();

const {
  getAllSubmemmits,
  getSingleSubmemmitById,
  insertSingleSubmemmit,
  deleteSingleSubmemmit,
} = require("../queries/submemmitsQueries");

submemmits.get("/", getAllSubmemmits);
submemmits.get("/:id", getSingleSubmemmitById);
submemmits.post("/", insertSingleSubmemmit);
submemmits.delete("/:id", deleteSingleSubmemmit);

module.exports = submemmits;
