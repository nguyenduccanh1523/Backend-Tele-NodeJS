const express = require("express");
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authUserMiddleware, authMiddleware} = require("../middleware/authMiddleware");


router.post('/create',authUserMiddleware, OrderController.createOrder);
router.get('/get-all-order/:id',authUserMiddleware, OrderController.getAllDetailsOrder);
router.get('/get-details-order/:id',authUserMiddleware, OrderController.getDetailsOrder);
router.delete('/cancel-order/:id',authUserMiddleware, OrderController.cancelOrderDetails);
router.get('/getAll', authMiddleware, OrderController.getAllOrder);



module.exports = router