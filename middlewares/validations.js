const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'string.required': 'Введите имя',
      }),
    email: Joi.string().required().email().messages({
      'any.required': 'Поле должно быть заполнено',
    }),
  }),
  headers: Joi.object()
    .keys({
      'content-type': Joi.string().valid('application/json').required(),
    })
    .unknown(),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'string.required': 'Поле должно быть заполнено',
    }),
    director: Joi.string().required().messages({
      'string.required': 'Поле должно быть заполнено',
    }),
    duration: Joi.number().required().messages({
      'number.required': 'Поле должно быть заполнено',
    }),
    year: Joi.number().required().messages({
      'number.required': 'Поле должно быть заполнено',
    }),
    description: Joi.string().required().messages({
      'string.required': 'Поле должно быть заполнено',
    }),
    image: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isURL(value, { disallow_auth: true, require_protocol: true })) {
          return value;
        }
        return helpers.message('Поле "image" должно быть валидным url-адресом');
      })
      .messages({
        'any.required': 'Поле должно быть заполнено',
      }),
    trailer: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isURL(value, { disallow_auth: true, require_protocol: true })) {
          return value;
        }
        return helpers.message('Поле "trailer" должно быть валидным url-адресом');
      })
      .messages({
        'any.required': 'Поле должно быть заполнено',
      }),
    thumbnail: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isURL(value, { disallow_auth: true, require_protocol: true })) {
          return value;
        }
        return helpers.message('Поле "thumbnail" должно быть валидным url-адресом');
      })
      .messages({
        'any.required': 'Поле должно быть заполнено',
      }),
    movieId: Joi.number().required().messages({
      'number.required': 'Поле должно быть заполнено',
    }),
    nameRU: Joi.string()
      .required()
      .pattern(/^[а-яА-ЯЁё0-9\s]+$/),
    nameEN: Joi.string()
      .required()
      .pattern(/^[a-zA-Z0-9\s]+$/),
  }),
  headers: Joi.object()
    .keys({
      'content-type': Joi.string().valid('application/json').required(),
    })
    .unknown(),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный id пользователя');
      }),
  }),
  headers: Joi.object()
    .unknown(),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Поле "email" должно быть валидным');
      })
      .messages({
        'any.required': 'Поле должно быть заполнено',
      }),
    password: Joi.string().required().min(8).messages({
      'any.required': 'Поле должно быть заполнено',
    }),
  }),
  headers: Joi.object()
    .keys({
      'content-type': Joi.string().valid('application/json').required(),
    })
    .unknown(),
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'Поле должно быть заполнено',
    }),
    password: Joi.string().required().min(8).messages({
      'any.required': 'Поле должно быть заполнено',
    }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'string.required': 'Введите имя',
      }),
  }),
  headers: Joi.object()
    .keys({
      'content-type': Joi.string().valid('application/json').required(),
    })
    .unknown(),
});

module.exports = {
  validateUpdateUser,
  validateCreateMovie,
  validateDeleteMovie,
  validateLogin,
  validateSignup,
};
