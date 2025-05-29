const checkAccess = (role) => {
  return (req, res, next) => {
    try {
      if (!role) {
        res.status(404).json({ message: "user not found!" });
      }
      if (role === req.user.role) {
        next();
      } else {
      return  res.status(403).json({ message: "You are not authorized. you are not allowed to this page" });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          message:
            "you are allowed, only authorised user's allowed to this page",
         error:error});
    }
  };
};

module.exports = checkAccess