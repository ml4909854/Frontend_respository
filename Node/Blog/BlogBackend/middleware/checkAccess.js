const roles = require("../constants/roles");

const checkAccess = (requiredRole) => {
  return (req, res, next) => {
    if (requiredRole !== req.user.role) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this page." });
    }
    next();
  };
};

module.exports = checkAccess;
