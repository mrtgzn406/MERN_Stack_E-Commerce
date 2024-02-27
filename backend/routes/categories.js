const express = require("express");
const router = express.Router();
const Category = require("../models/category_model");

// @ Create a new category
router.post("/", async (req, res) => {
    try {
        const { name, img } = req.body;

        const newCategory = await new Category({ name, img });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.log(error);
    }
});
// ! ------------------------------------------------
// @ Get all categories

router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});
// ! ------------------------------------------------
// @ Get a specific category by ID

router.get("/:categoryID", async (req, res) => {
    try {
        const categoryID = req.params.categoryID;

        try {
            const category = await Category.findById(categoryID);
            res.status(200).json(category);
        } catch (error) {
            console.log(error);
            res.status(404).json({ error: "kategory not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});

// ! ------------------------------------------------
// @  Updating category by ID

router.put("/:categoryID", async (req, res) => {
    try {
        const categoryID = req.params.categoryID;
        const update = req.body;

        // * -----------------------------------------------------------------
        // const existingCategory = await Category.findById(categoryID);

        // if (!existingCategory) {
        //     return res.status(404).json({ error: "category is not found" });
        // }

        // * -----------------------------------------------------------------
        const updatedCategory = await Category.findByIdAndUpdate(categoryID, update, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ error: "category is not found" });
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
});

// ! ------------------------------------------------
// @ Deleting category  by ID

router.delete("/:categoryID", async (req, res) => {
    try {
        const categoryID = req.params.categoryID;

        const deletedCategory = await Category.findByIdAndDelete(categoryID);

        if (!deletedCategory) {
            res.status(404).json({
                status: "failed",
                message: "Category ID is not found",
            });
        }

        res.status(200).json(deletedCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
