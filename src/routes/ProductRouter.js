const express = require("express");
const router = express.Router();
const ProductControllers = require('../controllers/ProductController');
const { authMiddleware} = require("../middleware/authMiddleware");

router.post('/create', ProductControllers.createProduct);
router.put('/update/:id',authMiddleware, ProductControllers.updateProduct);
router.get('/details/:id', ProductControllers.getDetailsProduct);
router.delete('/delete/:id',authMiddleware, ProductControllers.deleteProduct);
router.get('/getAll', ProductControllers.getAllProduct);
router.post('/delete-many', authMiddleware, ProductControllers.deleteMany);
router.get('/get-all-type', ProductControllers.getAllType);



module.exports = router