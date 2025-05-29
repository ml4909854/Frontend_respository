const checkAcess = (role) => {
  return (req, res, next) => {
    try {
      if (role === req.user.role) {
        next();
      } else {
        res.status(403).send("You are not a authorized user to access these page");
      }
    } catch (error) {
      res.status(401).send(error);
    }
  };
};

module.exports = checkAcess;
