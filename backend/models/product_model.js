const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        img: [{ type: String, required: true }],
        reviews: [ReviewSchema],
        colors: [{ type: String, required: true }],
        sizes: [{ type: String, required: true }],
        price: {
            current: { type: Number, required: true },
            discount: { type: Number },
        },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
        description: { type: String, required: true },
        discount: { type: Number },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema, "products_collection");

module.exports = Product;
