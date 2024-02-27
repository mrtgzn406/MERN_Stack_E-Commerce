const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
    couponCode: { type: String, required: true },
    discountRate: { type: Number, required: true },
});

const Coupon = mongoose.model("Coupon", couponSchema, "coupon_collection");

module.exports = Coupon;
