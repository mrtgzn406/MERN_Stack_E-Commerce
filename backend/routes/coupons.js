const express = require("express");
const router = express.Router();
const Coupon = require("../models/coupon_model");

// @ Creating  coupon
router.post("/", async (req, res) => {
    try {
        const { couponCode, discountRate } = req.body;

        const isExist = await Coupon.findOne({ couponCode });

        if (isExist) {
            return res.status(409).json({ error: "Coupon code exist already" });
        }

        const newCoupon = new Coupon({
            couponCode: couponCode,
            discountRate: discountRate,
        });

        await newCoupon.save();

        res.status(201).json(newCoupon);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});
// ! ---------------------------------------------------------
// @ Get all coupons

router.get("/", async (req, res) => {
    try {
        const coupons = await Coupon.find();

        res.status(200).json(coupons);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});

// ! ---------------------------------------------------------
// @ Get a specific coupon by ID

router.get("/:couponCode", async (req, res) => {
    try {
        const couponCode = req.params.couponCode;
        const selectedCoupon = await Coupon.findById(couponCode);

        if (!selectedCoupon) {
            return res.status(404).json({ error: "Invalid ID" });
        }

        res.status(200).json(selectedCoupon);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});
// ! ---------------------------------------------------------
// @ Get a specific coupon by couponCode

router.get("/code/:couponCode", async (req, res) => {
    try {
        const couponCode = req.params.couponCode;
        const selectedCoupon = await Coupon.findOne({ couponCode: couponCode });

        if (!selectedCoupon) {
            return res.status(404).json({ error: "Invalid ID" });
        }

        const { discountRate } = selectedCoupon;

        res.status(200).json(discountRate);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});
// ! ---------------------------------------------------------
// @ Update a specific coupon by ID

router.put("/:couponID", async (req, res) => {
    try {
        const couponID = req.params.couponID;
        const update = req.body;
        const updatedCoupon = await Coupon.findByIdAndUpdate(couponID, update, { new: true });

        if (!updatedCoupon) {
            return res.status(404).json({ error: "Invalid ID" });
        }

        res.status(200).json(updatedCoupon);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});

// ! ---------------------------------------------------------
// @ Delete a specific coupon by ID

router.delete("/:couponID", async (req, res) => {
    try {
        const couponID = req.params.couponID;
        const deletedCoupon = await Coupon.findByIdAndDelete(couponID);

        if (!deletedCoupon) {
            return res.status(404).json({ error: "Invalid ID" });
        }

        res.status(200).json(deletedCoupon);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});

module.exports = router;
