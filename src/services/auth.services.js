const joi = require("joi");

const regValidator = joi.object({
  firstName: joi.string().alphanum().min(3).max(20).required(),
  lastName: joi.string().alphanum().min(3).max(15).required(),
  nid: joi.number().required(),
  profilePhoto: joi.string(),
  isMarried: joi.boolean().required(),
  age: joi.number().required(),
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "edu"] },
    })
    .required(),
  password: joi
    .string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

regServices = { regValidator };

module.exports = regServices;
