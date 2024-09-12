const OrderServices = require('../services/OrderService');

const createOrder = async (req, res) => {
    try {
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone} = req.body
        if(!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !city || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        }
        const respone = await OrderServices.createOrder(req.body);
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}

const getAllDetailsOrder = async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user id is required'
            });
        }
        const respone = await OrderServices.getAllOrderDetails(userId);
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}

const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        if(!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user id is required'
            });
        }
        const respone = await OrderServices.getOrderDetails(orderId);
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}

const cancelOrderDetails = async (req, res) => {
    try {
        const orderId = req.params.id
        const data = req.body
        if(!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user id is required'
            });
        }
        const respone = await OrderServices.cancelOrderDetails(orderId, data);
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}

const getAllOrder = async (req, res) => {
    try {
        const respone = await OrderServices.getAllOrder();
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}

module.exports = {createOrder, getAllDetailsOrder, getDetailsOrder, cancelOrderDetails, getAllOrder};