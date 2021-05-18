const router = require('express').Router();

const { getCurrentUser, updateUser } = require('../controllers/users');

const { validateGetCurrentUser, validateUpdateUser } = require('../middlewares/validations');

router.get('/me', validateGetCurrentUser, getCurrentUser);

router.patch('/me', validateUpdateUser, updateUser);

module.exports = router;
