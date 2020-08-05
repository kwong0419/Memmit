const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const usersRouter = require("./routes/users");
const submemmitsRouter = require("./routes/submemmits");
const postsRouter = require("./routes/posts");
const votesRouter = require("./routes/votes");
const commentsRouter = require("./routes/comments");
const subscriptionsRouter = require("./routes/subscriptions");

app.use("/users", usersRouter);
app.use("/submemmits", submemmitsRouter);
app.use("/posts", postsRouter);
app.use("/votes", votesRouter);
app.use("/comments", commentsRouter);
app.use("/subscriptions", subscriptionsRouter);

app.listen(port, () => {
  console.log("App is listening on port", port);
});
