import joi from 'joi';

const signUpSchema = joi.object({
  email: joi.string().required(),
  password: joi
    .string()
    .pattern(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/, {
      invert: true,
    })
    .required(),
  confirmPassword: joi.string().valid(joi.ref('password')).required(),
});

export { signUpSchema };
