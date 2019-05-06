const bcrypt = require('bcryptjs');
const User = require('./user.model');
const jwt = require('jsonwebtoken');
const config = require('../config')

module.exports = {
    create,
    getAll,
    login
};

async function create(userParam) {
    //add validation
    if (await User.findOne({username: userParam.username})) {
        throw 'User is already exist';
    }

    // create user 
    const user = new User({
        username : userParam.username,
        password : userParam.password
    });
    
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
        const token = jwt.sign({sub: user.username}, config.secret);
        const {password, ...userWithoutPassword} = user.toObject();
        return {...userWithoutPassword, token};
    }
}