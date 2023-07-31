const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product brand MUST be provided!"],
      }
})

module.exports = mongoose.model("Brand", brandSchema);
