const express= require('express');
const {getCategory, createCategory, getSingleCategory, deleteCategory} = require('../controller/category');
const router =express.Router();

router.route('/category').get(getCategory);
router.route('/category/create').post(createCategory);
router.route('/category/:id').get(getSingleCategory);
router.route('/category/delete/:name').delete(deleteCategory);

module.exports=router;