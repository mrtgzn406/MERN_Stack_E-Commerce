const express = require("express");
const router = express.Router();

const productRoute = require("../routes/products");
const categoriesRoute = require("../routes/categories");
const authenticationRoute = require("../routes/authentication");
const couponsRoute = require("../routes/coupons");
const usersRoute = require("../routes/users");
// const paymentRoute = require("../routes/payment");
const paymentRoute = require("./payment.js");

router.use("/products", productRoute);
router.use("/categories", categoriesRoute);
router.use("/auth", authenticationRoute);
router.use("/coupons", couponsRoute);
router.use("/users", usersRoute);
router.use("/payment", paymentRoute);

module.exports = router;
