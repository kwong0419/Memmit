const admin = require("../firebase");

const checkFirebaseToken = async (req, res, next) => {
  try {
    const token = req.headers.authtoken;
    const decodedToken = await admin.auth().verifyIdToken(token);
    const id = decodedToken.id;
    req.user_id = id;
    next();
  } catch (err) {
    console.log("Error: ", err);
    res.status(401).json({ message: "No Authenticated User!" });
  }
};

module.exports = {
  checkFirebaseToken,
};
