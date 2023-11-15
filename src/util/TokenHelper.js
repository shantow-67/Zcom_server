const jwt = require("jsonwebtoken");

const EncodeToken = (email, id) => {
  return jwt.sign({ email, id }, process.env.SECRATE_KAY, {
    expiresIn: "1h",
  });
};

const DecodeToken = (token) => {
  return jwt.verify(token, process.env.SECRATE_KAY, (err, decoded) => {
    if (err) {
      // Token verification failed
      return null;
    } else {
      // Token decoded successfully
      return decoded;
    }
  });
};

module.exports = { EncodeToken, DecodeToken };
