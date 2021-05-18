const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-error');
const Conflict = require('../errors/conflict-error');
const { NODE_ENV, JWT_SECRET } = require('../app');

const getCurrentUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный id пользователя'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { _id } = req.user;
  const { name, email } = req.body;
  User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы данные в неверном формате'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены неверные данные'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

const signup = (req, res, next) => {
  const { name } = req.body;
  if (!req.body.password) {
    throw new BadRequestError('Пароль не может быть пустым');
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        email: req.body.email,
        password: hash,
        name,
      }),
    )
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else if (err.name === 'MongoError' && err.code === 11000) {
        next(new Conflict('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCurrentUser,
  updateUser,
  login,
  signup,
};
