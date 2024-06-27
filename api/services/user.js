const UserDAO = require('../dao/user');
const CartDAO = require('../dao/cart');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUpUser = async (username, password) => {
    const existingUser = await UserDAO.getByName(username);
    
    if (existingUser) throw {
        status: 409,
        message: "User already exists"
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await UserDAO.create({
        username: username,
        password: hash
    });

    const cart = await CartDAO.create(user.id);

    if (!cart) throw {
        status: 500,
        message: "Cart could not be created"
    }

    return cart;
}

exports.loginUser = async ({ username, password }) => {
    const user = await UserDAO.getByName(username);

    if (!user) throw {
        status: 401,
        message: "User does not exist"
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) throw {
        status: 401,
        message: "Authorization Failed"
    }

    const token = jwt.sign({
        username: user.username,
        userId: user.id
    }, 
    process.env.JWT_KEY, { expiresIn: "4h" });
    
    return token;
}

exports.deleteUser = async (userId) => 
    await UserDAO.delete(userId);