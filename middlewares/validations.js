const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const validateGetCurrentUser = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().max(200).required(),
    })
    .unknown(),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
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
      authorization: Joi.string().max(200).required(),
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
    image: Joi.string()
      .custom((value, helpers) => {
        if (validator.isURL(value, { disallow_auth: true, require_protocol: true })) {
          return value;
        }
        return helpers.message('Поле "image" должно быть валидным url-адресом');
      })
      .messages({
        'any.required': 'Поле должно быть заполнено',
      }),
    trailer: Joi.string()
      .custom((value, helpers) => {
        if (validator.isURL(value, { disallow_auth: true, require_protocol: true })) {
          return value;
        }
        return helpers.message('Поле "trailer" должно быть валидным url-адресом');
      })
      .messages({
        'any.required': 'Поле должно быть заполнено',
      }),
    thumbnail: Joi.string()
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
      authorization: Joi.string().max(200).required(),
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
    .keys({
      authorization: Joi.string().max(200).required(),
    })
    .unknown(),
});

module.exports = {
  validateGetCurrentUser,
  validateUpdateUser,
  validateCreateMovie,
  validateDeleteMovie,
};