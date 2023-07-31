//Importing model
const Order = require("../model/order");
const OrderItem = require("../model/orderItem");

const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

//create new order
const createOrder = asyncHandler(async (req, res, next) => {
  try {
    const orderItemsIds = Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = await OrderItem.create({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });

        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
      })
    );

    const orderItemsIdsResolved = await orderItemsIds;

    const newOrder = await Order.create({
      orderItems: orderItemsIdsResolved,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      town: req.body.town,
      county: req.body.county,
      orderTotal: req.body.orderTotal,
      user: req.body.user,
    });
    res.json(newOrder);
    if (!newOrder) {
      res.status(400).send("Failed,order could not be created!");
    }
  } catch (error) {
    throw new Error(error);
  }
});

//Get orders
const getOrders = asyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.find()
      .sort({ dateOrdered: -1 })
      .populate({ path: "orderItems", populate: "product" });

    if (!orders) {
      res.status(500).json({ success: false, message: "No orders found" });
    }
    res.json(orders);
  } catch (error) {
    throw new Error(error);
  }
});

//Get single order
const getOrder = asyncHandler(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate({
      path: "orderItems",
      populate: "product",
    });

    if (!order) {
      res.status(500).json({ success: false, message: "Order not found" });
    } else {
      res.send(order);
    }
  } catch (error) {
    throw new Error(error);
  }
});

//Update single order
const updateOrder = asyncHandler(async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );
    res.send(order);
  } catch (error) {
    throw new Error(error);
  }
});

//Get total sales
const getTotalSales = asyncHandler(async (req, res, next) => {
  try {
    //Take heed of the naming convention capitalized and not capitalized variables
    const totalSales = await Order.aggregate([
      { $group: { _id: null, totalsales: { $sum: "$orderTotal" } } },
    ]);

    if (!totalSales) {
      return res.staus(400).send("Total sales cannot be generated");
    }
    res.send({ totalsales: totalSales.pop().totalsales });
  } catch (error) {}
});

//Get total orders
const getTotalOrders = asyncHandler(async (req, res, next) => {
  try {
    const orderCount = await Order.countDocuments();

    if (!orderCount) {
      res.status(500).json({ success: false, orders: 0 });
    }
    res.send({
      orderCount: orderCount,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Get user order history
const getUserOrders = asyncHandler(async (req, res, next) => {
  try {
    //Finding order by phone number
    let getNumber = req.params.userNumber.toString()
    const userOrders = await Order.find({ phoneNumber: getNumber }).sort(
      { dateOrdered: -1 }
    );

    if (!userOrders) {
      res.status(500).json({ success: false, message: "No orders found!" });
    }

    res.send(userOrders);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  getTotalSales,
  getTotalOrders,
  getUserOrders
};
