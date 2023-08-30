const jwt = require("jsonwebtoken");

function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

module.exports = (req, res, next) => {
  try {
    jwt.verify(
      extractToken(req),
      "secretkeyappearshere",
      (err, verifiedJwt) => {
        if (err) {
          res.json("invalid credential");
        } else {
          next();
        }
      }
    );
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!")
    });
  }
};
