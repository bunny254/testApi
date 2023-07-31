//Importing model
const Product = require('../model/product');
const Category = require('../model/category');
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const multer = require('multer');


//create new product
const createProduct = asyncHandler(async (req, res, next)=>{
    try {
        const category = await Category.findById(req.body.category);
        if(!category) return res.status(400).send("Category not found!")

        const file = req.file;
        if(!file) return res.status(400).send("Cannot send blank image file")

        //Product images
        const fileName = req.file.filename
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`

        const newProduct = await Product.create({
            articleNumber: req.body.articleNumber,
            name: req.body.name,
            category: req.body.category,
            subCategory: req.body.subCategory,
            brand: req.body.brand,
            material: req.body.material,
            price: req.body.price,
            offerPrice: req.body.offerPrice,
            color: req.body.color,
            latest: req.body.latest,
            image: `${basePath}${fileName}`,
            sizeRange: req.body.sizeRange,
            stock: req.body.stock
        })
        res.json(newProduct);
    } catch (error) {
        throw new Error(error)
    }
});

//Get products
const getProducts = asyncHandler(async(req, res, next)=>{
    try {
        //Filter products
        let filter ={};
        if(req.query.categories){
            {
                filter = {category: req.query.categories.split(',')}
            }
        }

        const products = await Product.find(filter).populate('category')
        if(!products){
            res.status(500).json({success:false, message:"No products found."})
        }
        res.json(products)
    } catch (error) {
        throw new Error(error)        
    }
})

//Update product
const updateProduct= asyncHandler(async(req, res, next)=>{
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(400).send("Invalid product Id!")
        };
        //Check if category exists
        const category = await Category.findById(req.body.category);
        if(!category) return res.status(400).send("Category not found!");

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
            articleNumber: req.body.articleNumber,
            name: req.body.name,
            category: req.body.category,
            subCategory: req.body.subCategory,
            brand: req.body.brand,
            material: req.body.material,
            price: req.body.price,
            offerPrice: req.body.offerPrice,
            color: req.body.color,
            latest: req.body.latest,
            images: req.body.images,
            sizeRange: req.body.sizeRange,
            stock: req.body.stock
            },
            {new: true}
        )
        if(!product){
            return res.status(500).send("Product cannot be updated")
        }else{
            res.send(product)
        }
    } catch (error) {
        throw new Error(error)
    }
})

//Total product count
const countProducts = asyncHandler(async(req, res)=>{
    const productCount = await Product.countDocuments();

    if(!productCount){
        res.status(500).json({productCount: 0})
    }
    res.send({
        productCount: productCount
    });
})

//Update product images
const updateImages = asyncHandler(async(req,res,next)=>{
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(400).send("Invalid product Id!")
        };

        const files = req.files
        let imagesPaths =[];
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

        if(files){
            files.map(file =>{
                imagesPaths.push(`${basePath}${file.fileName}`);
            })
        }
        
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
            images: imagesPaths,            
            },
            {new: true}
        )
        if(!product){
            return res.status(500).send("Product cannot be updated")
        }else{
            res.send(product)
        }
    } catch (error) {
        throw new Error(error)
    }
})

module.exports={
    createProduct,
    getProducts,
    updateProduct,
    countProducts,
    updateImages
}