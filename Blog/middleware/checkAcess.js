const checkAccess = (requiredRole) => {
    return (req, res, next) => {
        if (req.user && req.user.role === requiredRole) {
            next();
        } else {
            res.status(403).json({ message: "Sorry, you are not authorized to access this page." });
        }
    };
};

module.exports = checkAccess