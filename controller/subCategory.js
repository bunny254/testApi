const SubCategory = require('../model/subCategory');
const asyncHandler = require("express-async-handler");

//Get subcategory list
const getSubCategory = asyncHandler(async(req, res, next)=>{
    try {
        const subCategoryList = await SubCategory.find()

        if(!subCategoryList.lenght ==0){
            res.status(500).json({success:false, message:"No categories found."})
        }
        res.status(200).send(subCategoryList);
        
    } catch (error) {
        throw new Error(error)        
    }
})

//Get Individual subcategory
const getSingleSubCategory = asyncHandler(async(req, res, next)=>{
    try {
        const singleSubCategory = await SubCategory.findById(req.params.id)
        if(!singleCategory){
            res.status(400).send("Category not found!")
        }res.status(201).send(singleSubCategory);
    } catch (error) {
        throw new Error(error)
    }
})

//Create new subcategory
const createSubCategory = asyncHandler(async(req, res, next)=>{
    try {
        const newSubCategory = await SubCategory.create({
            name: req.body.name
        })
        res.json(newSubCategory);
    } catch (error) {
        throw new Error(error)
    }
})

//Delete existing subcategory
const deleteSubCategory = asyncHandler(async(req, res)=>{
    const subcategory = req.params.name;
    try {
        //Find subcategory by name
        const findSubCategory = await SubCategory.findOne({name:subcategory});

        //Missing subcategory
        if(!findSubCategory){
           return res.status(404).json({success:false, message:"Missing SubCategory"}) 
        }

        //Delete subcategory
        await SubCategory.deleteOne(findSubCategory);
        return res.status(201).json({success:true, message:"Sub-Category deleted successfully!"})
         
    } catch (error) {
        throw new Error(error)
    }
})


module.exports={
    getSubCategory,
    getSingleSubCategory,
    createSubCategory,
    deleteSubCategory
}