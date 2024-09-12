const express = require("express");
const router = express.Router();
const UserControllers = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");

router.post('/sign-up', UserControllers.createUser);
router.post('/sign-in', UserControllers.loginUser);
router.post('/log-out', UserControllers.logoutUser);
router.put('/update-user/:id',authUserMiddleware, UserControllers.updateUser);
router.delete('/delete-user/:id', authMiddleware , UserControllers.deleteUser);
router.get('/getAll', authMiddleware, UserControllers.getAllUser);
router.get('/get-details/:id', authUserMiddleware, UserControllers.getDetailsUser);
router.post('/refresh-token', UserControllers.refreshToken);
router.post('/delete-many', authMiddleware, UserControllers.deleteMany);


module.exports = router