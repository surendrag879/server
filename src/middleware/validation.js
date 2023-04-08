import joi from "joi";

//login schema
const loginSchema = joi.object({
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(5).max(20).required(),
});

//user register schema
const registerSchema = joi.object({
  username: joi.string().required(),
  mobileNo: joi.string().min(10),
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(5).max(20).required(),
});

//Common function for Validation
const show = (schemaName, body) => {
  const data = schemaName.validate(body);
  return data;
};

export const checkValidation = (routes) => {
  return (req, res, next) => {
    const body = req.body;
    let result;
    switch (routes) {
      case "login": {
        result = show(loginSchema, body);
        break;
      }
      case "register": {
        result = show(registerSchema, body);
        break;
      }
      default: {
        console.log("not match");
      }
    }
    if (result.error == null) {
      next();
    } else {
      res.status(404).json({
        success: false,
        message: result.error.details[0].message,
      });
    }
  };
};
