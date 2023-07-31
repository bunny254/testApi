const Category = require('../model/category');
const asyncHandler = require("express-async-handler");

//Get category list
const getCategory = asyncHandler(async(req, res, next)=>{
    try {
        const categoryList = await Category.find()

        if(!categoryList.lenght ==0){
            res.status(500).json({success:false, message:"No categories found."})
        }
        res.status(200).send(categoryList);
        
    } catch (error) {
        throw new Error(error)        
    }
})

//Get Individual category
const getSingleCategory = asyncHandler(async(req, res, next)=>{
    try {
        const singleCategory = await Category.findById(req.params.id)
        if(!singleCategory){
            res.status(400).send("Category not found!")
        }res.status(201).send(singleCategory);
    } catch (error) {
        throw new Error(error)
    }
})

//Create new category
const createCategory = asyncHandler(async(req, res, next)=>{
    try {
        const newCategory = await Category.create({
            name: req.body.name
        })
        res.json(newCategory);
    } catch (error) {
        throw new Error(error)
    }

})

//Delete existing category
const deleteCategory = asyncHandler(async(req, res)=>{
    const category = req.params.name;
    try {
        //Find category by name
        const findCategory = await Category.findOne({name:category});

        //Missing category
        if(!findCategory){
           return res.status(404).json({success:false, message:"Missing Category"}) 
        }

        //Delete category
        await Category.deleteOne(findCategory);
        return res.status(201).json({success:true, message:"Category deleted successfully!"})
         
    } catch (error) {
        throw new Error(error)
    }
})


module.exports={
    getCategory,
    getSingleCategory,
    createCategory,
    deleteCategory
}