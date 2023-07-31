const express = require("express");
const {
  createProduct,
  getProducts,
  updateProduct,
  countProducts,
  updateImages
} = require("../controller/product");
const router = express.Router();
const multer  = require('multer')

//Valid file types
const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/webp': 'webp'
}
//Upload images using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error ('invalid file type')

      if(isValid){
          uploadError = null
      }
    cb(uploadError, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}`)
  }
})
const uploadOptions = multer({ storage: storage })


router.route("/products").get(getProducts);
router.route("/product/:id").put(updateProduct);
router.route("/product/create").post(uploadOptions.single('image'),createProduct);
router.route("/product/count").get(countProducts);
router.route("/product/images/:id").put(uploadOptions.array('images',10),updateImages);

module.exports = router;
