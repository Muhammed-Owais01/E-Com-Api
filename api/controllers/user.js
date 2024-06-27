const UserService = require('../services/user');
const CartDAO = require('../dao/cart')
const asyncHandler = require('../utils/asyncHandler');

exports.user_signup = asyncHandler(async (req, res, next) => {
    const cart = await UserService.signUpUser(
        req.body.username,
        req.body.password
    );

    return res.status(201).json({ message: "User created" });
})

exports.user_login = asyncHandler(async (req, res, next) => {
    const token = await UserService.loginUser({
        username: req.body.username,
        password: req.body.password
    });
    
    return res.status(200).json({
        message: "User logged in",
        token: `Bearer ${token}`
    })
})

exports.delete_user = asyncHandler(async (req, res, next) => {
    const deletedUser = await UserService.deleteUser(req.userData.userId);

    return res.status(200).json({ message: "Successfully deleted user" });
})