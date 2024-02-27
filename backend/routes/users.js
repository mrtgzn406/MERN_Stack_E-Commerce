const express = require("express");
const router = express.Router();
const User = require("../models/user_model");

// @ Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// @ Delete a specific user by email
router.delete("/:email", async (req, res) => {
    try {
        const email = req.params.email;

        const deletedUser = await User.findOneAndDelete({ email: email });

        if (!deletedUser) {
            res.status(404).json({
                status: "failed",
                message: "User is not found",
            });
        }

        res.status(200).json(deletedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
