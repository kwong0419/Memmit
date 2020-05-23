const subscriptions = require("express").Router();

const {
  getAllSubscriptions,
  insertSingleSubscription,
  deleteSingleSubscription,
} = require("../queries/subscriptionQueries");

subscriptions.get("/", getAllSubscriptions);
subscriptions.post("/", insertSingleSubscription);
subscriptions.delete("/:id", deleteSingleSubscription);

module.exports = subscriptions;
