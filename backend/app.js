const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

// upload image
const multer = require("multer");
const path = require("path");
app.use(express.static(path.resolve(__dirname, "./public")));
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("imageUpload");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const usersRouter = require("./routes/users");
const submemmitsRouter = require("./routes/submemmits");
const postsRouter = require("./routes/posts");
const votesRouter = require("./routes/likes");
const commentsRouter = require("./routes/comments");

app.use("/users", usersRouter);
app.use("/submemmits", submemmitsRouter);
app.use("/posts", postsRouter);
app.use("/votes", votesRouter);
app.use("/comments", commentsRouter);

app.post("/uploadphoto", (req, res) => {
  upload(req, res, function (err) {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file);
    res.json("/uploads/" + req.file.filename);
  });
});

app.listen(port, () => {
  console.log("App is listening on port", port);
});
