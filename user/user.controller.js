const express = require('express');
const router = express.Router();
const userService = require('./user.service');

/**
 * @swagger
 * /users/login:
 *    post:
 *      description: login using username and password
 *      parameters:
 *       - name: username
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         required: true
 *         type: string
 *      responses:
 *        200:
 *           description: User found and logged in successfully
 *        401:
 *           description: Bad username, not found in db
 *        403:
 *           description: Username and password don't match     
 *      
 */
router.post('/login', login);
router.get('/', getAll);
router.post('/', createUser);
router.put('/:id', updateUserProfile);
router.delete('/:id', deleteUserProfile);

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
