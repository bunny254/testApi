const express = require("express");
const { createOrder, getOrders, getOrder, updateOrder, getTotalSales, getTotalOrders, getUserOrders } = require("../controller/order");
const router = express.Router();

router.route("/order/create").post(createOrder);
router.route("/orders").get(getOrders);
router.route("/order/:id").get(getOrder);
router.route("/order/update/:id").put(updateOrder);
router.route("/orders/total").get(getTotalSales);
router.route("/orders/count").get(getTotalOrders);
router.route("/user/orders/:userNumber").get(getUserOrders)

module.exports = router;
