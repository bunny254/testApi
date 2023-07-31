const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    articleNumber: {
        type: String,
        required: [true, "Product article number MUST be provided!"],
        unique:true
      },
    name: {
        type: String,
        required: [true, "Product name MUST be provided!"],
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required: [true, "Product category MUST be provided!"],
      },
      
      brand: {
        type: String,
        required: [true, "Product brand MUST be provided!"],
      },
      material: {
        type: String,
        required: [true, "Product material MUST be provided!"],
      },
      price: {
        type: Number,
        required: [true, "Product price MUST be provided!"],
      },
      offerPrice: {
        type: Number,
      },
      color: {
        type: Array,
        //required: [true, "Product color MUST be provided!"],
      },
      latest: {
        type: Boolean,
      },
      image:{
        type:String
      },
      images:[{
        type:[String],
        default:[]
      }],
      sizeRange:{
        type:[String],
        default:[]
      },
      stock: {
        type: Number,
        required: [true, "Product stock MUST be provided!"],
      },
      dateCreated:{
        type: Date,
        default: Date.now
      }
});

productSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

productSchema.set('toJSON',{
  virtuals:true,
})

module.exports = mongoose.model("Product", productSchema);