const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  name:{
    type:String,
    required: [true, "Product sub-category MUST be provided!"]
  }
})

module.exports = mongoose.model("SubCategory", subCategorySchema);