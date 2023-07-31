const express= require('express');
const {getSubCategory, createSubCategory, getSingleSubCategory, deleteSubCategory} = require('../controller/subCategory');
const router =express.Router();

router.route('/subcategory').get(getSubCategory);
router.route('/subcategory/create').post(createSubCategory);
router.route('/subcategory/:id').get(getSingleSubCategory);
router.route('/subcategory/delete/:name').delete(deleteSubCategory);

module.exports=router;