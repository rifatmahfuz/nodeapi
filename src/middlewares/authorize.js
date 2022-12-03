const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(403).send("A token is required for authentication");
  }
  const token = authorization.split(" ")[1];

  try {
    const data = jwt.verify(token, config.TOKEN_KEY);
    if (data.user_id == req.params.id) {
      return next();
    }
    else {
        res.status(403).send("Sorry! You can only access/modify your OWN data")
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

module.exports = verifyToken;
