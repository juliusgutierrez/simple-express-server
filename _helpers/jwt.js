const expressJwt = require('express-jwt');
const config = require('../config');
const userService = require('../user/user.service');
module.exports = jwt;

const url = "/api/v1";

function jwt() {
    const secret = config.secret;
    return expressJwt({secret, isRevoked}).unless({
        path: [
            {url : `${url}/users`, methods: ['POST']}, 
            `${url}/users/login`
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};
