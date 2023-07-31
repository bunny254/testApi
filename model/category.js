const mongoose = require('mongoose');
const SubCategory = require('./subCategory');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product category MUST be provided!"],
      },
      subCategories: [
        {
          type:mongoose.Schema.Types.ObjectId,
          ref: "SubCategory"
        }
      ]
})

module.exports = mongoose.model("Category", categorySchema);
