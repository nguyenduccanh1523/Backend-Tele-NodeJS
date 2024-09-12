 const ProductServices = require('../services/ProductService');

const createProduct = async (req, res) => {
    try {
        const { name, image, type, countInStock, price, rating, description, discount} = req.body

        if(!name || !image || !type || !countInStock || !price || !rating || !discount) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        }
        //console.log('isCheckEmail', isCheckEmail);
        const respone = await ProductServices.createProduct(req.body);
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;

        if(!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            });
        }
        const respone = await ProductServices.updateProduct(productId, data);
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if(!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The product id is required'
            });
        }
        const respone = await ProductServices.getDetailsProduct(productId);
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if(!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The product id is required'
            });
        }
        const respone = await ProductServices.deleteProduct(productId);
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}


const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if(!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            });
        }
        const respone = await ProductServices.deleteManyProduct(ids);
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}

const getAllProduct = async (req, res) => {
    try {
        const {limit, page, sort, filter} = req.query
        const respone = await ProductServices.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter);
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}

const getAllType = async (req, res) => {
    try {
        const respone = await ProductServices.getAllType();
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}
module.exports = {createProduct, updateProduct, getDetailsProduct, deleteProduct, getAllProduct, deleteMany, getAllType};