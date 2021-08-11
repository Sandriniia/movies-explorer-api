const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, signup } = require('../controllers/users');
const { validateLogin, validateSignup } = require('../middlewares/validations');

const userRouter = require('./users');
const movieRouter = require('./movies');

const NotFoundError = require('../errors/not-found-err');

router.post('/signin', validateLogin, login);
router.post('/signup', validateSignup, signup);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError(`Ресурс по адресу ${req.path} не найден`));
});

module.exports = router;
