const User = require('../models/user');

exports.getByName = async (username) =>
    await User.findOne({ where: { username: username } });

exports.create = async (user) => {
    return await User.create({
        username: user.username,
        password: user.password
    })
};

exports.update = async (user) => 
    await User.update(user, { where: { id: user.id } });

exports.delete = async (userId) =>
    await User.destroy({ where: { id: userId }});