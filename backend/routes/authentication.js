const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/user_model");

// @ Creating new user
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ error: "Email address is already exist" });
        }

        function generateRandomAvatar() {
            const randomAvatar = Math.floor(Math.random() * 71);
            return `https://i.pravatar.cc/150?img=${randomAvatar}`;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new User({
            username: username,
            email: email,
            password: hashedPassword,
            avatar: generateRandomAvatar(),
        });

        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});

// ! -----------------------------------------------------------------
// @ User login process

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(401).json({
                error: "Invalid Email",
            });
        }
        console.log(userExist);
        const isPasswordValid = await bcrypt.compare(password, userExist.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid Password",
            });
        }

        res.status(200).json(userExist);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
