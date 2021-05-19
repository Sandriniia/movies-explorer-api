const router = require('express').Router();

const { login, signup } = require('../controllers/users');

const { validateLogin, validateSignup } = require('../middlewares/validations');

const router_signin = router.post('/signin', validateLogin, login);
const router_signup = router.post('/signup', validateSignup, signup);

module.exports = { router_signin, router_signup };
