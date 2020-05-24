const subscriptions = require("express").Router();

const {
  getAllSubscriptions,
  insertSingleSubscription,
  deleteSingleSubscription,
} = require("../queries/subscriptionQueries");

subscriptions.get("/", getAllSubscriptions);
subscriptions.post(
  "/submemmit/:submemmitID/user/:userID",
  insertSingleSubscription
);
subscriptions.delete(
  "/submemmit/:submemmitID/user/:userID",
  deleteSingleSubscription
);

module.exports = subscriptions;
