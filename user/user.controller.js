const express = require('express');
const router = express.Router();
const userService = require('./user.service');

router.get('/getAll', getAll);
router.post('/create', createUser);
router.post('/login', login);
router.post('/update/:id', updateUserProfile);
router.post('/delete/:id', deleteUserProfile);

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

function updateUserProfile(req, res, next) {
    userService.updateUserProfile(req.params.id, req.body.userParam)
        .then(() => {
            res.json({message: 'user is updated'});
        })
        .catch(err => next(err));
}

function deleteUserProfile(req, res, next) {
    userService.deleteUser(req.params.id)
        .then(() => {
            res.json({message: 'user is deleted'});
        })
        .catch(err => next(err));
}
