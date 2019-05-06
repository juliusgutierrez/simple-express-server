const express = require('express');
const router = express.Router();
const userService = require('./user.service');

router.get('/getAll', getAll);
router.post('/create', createUser);
router.post('/login', login);

module.exports = router;

function getAll(req, res, next) {
    userService.getAll()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        next(err);
    });
}

function createUser(req, res, next) {
    userService.create(req.body)
        .then(() => {
            res.json({message: 'user is created!'});
        })
        .catch(err => next(err));
}

function login(req, res, next) {
    userService.login(req.body)
        .then(response => {
            if (response) {
                res.json(response);
            } else {
                res.status(500).json({message : 'invalid login'});
            }
        })
        .catch(err => next(err));

}