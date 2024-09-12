const UserServices = require('../services/UserService');
const JwtService = require('../services/JwtService');

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if( !email || !password || !confirmPassword ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        }else if(!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The email is invalid'
            })
        }
        else if(password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password and confirm password is not match'
            })
        }
        //console.log('isCheckEmail', isCheckEmail);
        const respone = await UserServices.createUser(req.body);
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if( !email || !password ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        }else if(!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The email is invalid'
            })
        }
        const respone = await UserServices.loginUser(req.body);
        const {refresh_token, ...newReponse} = respone
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            Secure: false,
            sameSite: 'strict',
            path: '/'
        })
        return res.status(200).json(...newReponse, refresh_token)
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user id is required'
            });
        }
        const respone = await UserServices.updateUser(userId, data);
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user id is required'
            });
        }
        const respone = await UserServices.deleteUser(userId);
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
        const respone = await UserServices.deleteManyUser(ids);
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}

const getAllUser = async (req, res) => {
    try {
        const respone = await UserServices.getAllUser();
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user id is required'
            });
        }
        const respone = await UserServices.getDetailsUser(userId);
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.headers.token.split(' ')[1]
        if(!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            });
        }
        const respone = await JwtService.refreshTokenJwtService(token);
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout success'
        })
    } catch (error) {
        return res.status(404).json({ 
            message: error
        });
    }
}

module.exports = {createUser, loginUser, updateUser, deleteUser, getAllUser, getDetailsUser, refreshToken, logoutUser, deleteMany};