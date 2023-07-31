const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
  ],
  email: {
    type: String,
    required: [true, "Email is required!"],
    index: true,
    unique: true,
    validate: {
      validator: function (str) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str);
      },
    },
  },
  phoneNumber: {
    type: String,
    required: [true, "Mobile number is required!"],
  },
  firstName: {
    type: String,
    required: [true, "First name must be provided"],
  },
  lastName: {
    type: String,
    required: [true, "Last name must be provided"],
  },
  address: {
    type: String,
    required: [true, "Last name must be provided"],
  },
  town: {
    type: String,
    required: [true, "Town must be provided"],
  },
  county: {
    type: String,
    required: [true, "County must be provided"],
  },
  orderTotal: {
    type: Number,
    required: [true, "Order total must be present"],
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String,
    default: "GUEST",
  },
  status: {
    type: String,
    required: true,
    default: "PENDING",
  },
});

orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

orderSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Order", orderSchema);
