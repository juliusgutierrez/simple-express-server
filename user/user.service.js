const bcrypt = require('bcryptjs');
const User = require('./user.model');
const jwt = require('jsonwebtoken');
const config = require('../config')

module.exports = {
    create,
    getAll,
    login,
    updateUserProfile,
    deleteUser,
    getById
};

async function create(userParam) {
    //add validation
    if (await User.findOne({username: userParam.username})) {
        throw 'User is already exist';
    }

    // create user 
    const user = new User(userParam);

    //hash the password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // save
    await user.save();
}

async function getAll() {
    // return all users minus the password 
    return await User.find().select('-password');
}

async function login({username, password}) {
    const user = await User.findOne({username: username});
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({sub: user.id}, config.secret);
        const {password, ...userWithoutPassword} = user.toObject();
        return {...userWithoutPassword, token};
    }
}

async function updateUserProfile(id, userParam) {
    const user = await User.findById(id);

    if (!user) {
        throw 'User not exist';
    }

    if (userParam.username && userParam.username !== user.username) {
        throw 'You can`t update username';
    }

    if (userParam.password) {
        userParam.password = bcrypt.hashSync(userParam.password, 10);
    }

    //update user
    Object.assign(user, userParam);

    //save
    await user.save();

}

async function deleteUser(id) {
    await User.findByIdAndDelete(id);
}


async function getById(id) {
    return await User.findById(id).select('-hash');
}
