const express = require("express");
const router = express.Router();
const Product = require("../models/product_model");

// ----------------------------------------------------
// @ Creating product
router.post("/", async (req, res) => {
    try {
        const newProduct = new Product(req.body);

        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
});
// ----------------------------------------------------
//@ Get all products

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
});

// ----------------------------------------------------
// @ Get a specific product by ID
router.get("/:productID", async (req, res) => {
    try {
        const productID = req.params.productID;
        const selectedProduct = await Product.findById(productID);

        if (!selectedProduct) {
            res.status(404).json({ error: "The product you searched is not found" });
        }

        res.status(200).json(selectedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
});

// ----------------------------------------------------
// @ Updating a specific product by ID

router.put("/:productID", async (req, res) => {
    const productID = req.params.productID;
    const update = req.body;
    const selectedProduct = await Product.findByIdAndUpdate(productID, update, { new: true });

    if (!selectedProduct) {
        res.status(404).json({ error: "Product is not found" });
    }

    res.status(200).json(selectedProduct);
});

// ----------------------------------------------------
// @ Deleting a specific product by ID

router.delete("/:productID", async (req, res) => {
    try {
        const productID = req.params.productID;
        const selectedProduct = await Product.findByIdAndDelete(productID);

        if (!selectedProduct) {
            return res.status(404).json({ error: "Product is not found" });
        }

        res.status(200).json(selectedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
});
// ---------------------------------------------------

// @ Searching products by product name

router.get("/search/:productName", async (req, res) => {
    try {
        const productName = req.params.productName;
        const products = await Product.find({
            name: { $regex: productName, $options: "i" },
        });

        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});

module.exports = router;
