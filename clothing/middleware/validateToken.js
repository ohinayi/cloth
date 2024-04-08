const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    return res.status(401).json({ "message": "unauthorized user or missing token" });
  }

  if (!authHeader.startsWith("Bearer")) {
    return res.status(401).json({ "message": "Invalid token format" });
  }

  token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ "message": "user is not authorized" });
  }
};

module.exports = validateToken;
