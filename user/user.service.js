const bcrypt = require('bcryptjs');
const User = require('./user.model');

module.exports = {
    authenticate,
    create,
    getAll,
    login
};

async function authenticate({username, password}) {
    const user = await User.findOne({username});
}

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
    console.log(user);
    if (user && bcrypt.compareSync(password, user.password)) {
        // this should be token, for now message
        return 'success';
    }

}