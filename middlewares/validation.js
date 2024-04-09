const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateUserCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" is required',
    }),

    email: Joi.string()
      .required()
      .custom(validateEmail)
      .min(2)
      .max(30)
      .messages({
        "string.empty": 'The "email" is required',
        "string.email": 'The "email" field must be a valid email address',
      }),
    password: Joi.string().required().min(2).max(30).messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom(validateEmail)
      .min(2)
      .max(30)
      .messages({
        "string.empty": 'The "email" is required',
        "string.email": 'The "email" field must be a valid email address',
      }),

    password: Joi.string().required().min(2).max(30).messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).messages({
      "string.hex": "no hexadecimal values in'_id'",
      "string.length": "length of the '_id' is not equal to 24",
    }),
  }),
});

module.exports.validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    text: Joi.string().required().min(2).max(500).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    title: Joi.string().required().min(2).max(100).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    date: Joi.string().required().min(2).max(30).messages({
      "string.empty": 'The "date" field must be filled in',
    }),

    source: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    link: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),

    image: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});
