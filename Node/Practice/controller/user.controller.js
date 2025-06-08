const express = require("express");
const auth = require("../middleware/auth");
const User = require("../model/user.model");
const checkAccess = require("../middleware/checkAccess");
const roles = require("../constants/roles");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackList = require("../blackList");
const router = express.Router();

// GET all users — Only admin can access this
router.get("/", auth, checkAccess(roles.admin), async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found!" });
        }
        res.status(200).json({ message: "All users fetched successfully", users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

// REGISTER user
router.post("/register", async (req, res) => {
    try {
        const { username, password, role } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists. Please login." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, role });
        const savedUser = await newUser.save();

        res.status(201).json({ message: `${savedUser.username} registered successfully`, user: savedUser });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

// LOGIN user
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found. Please register first." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const accessToken = jwt.sign({ _id: user._id }, "accessMasai", { expiresIn: "30s" });
        const refreshToken = jwt.sign({ _id: user._id }, "refreshMasai", { expiresIn: "30d" });

        res.status(200).json({
            message: `${user.username} logged in successfully`,
            accessToken,
            refreshToken,
            userId: user._id
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in user", error: error.message });
    }
});

// LOGOUT user
router.get("/logout", auth, (req, res) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        if (token) {
             blackList.add(token); // assuming this is async
        }
        res.status(200).json({ message:` logged out successfully` });
    } catch (error) {
        res.status(500).json({ message: "Error logging out", error: error.message });
    }
});

module.exports = router;
