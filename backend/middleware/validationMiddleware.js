import { body, validationResult } from "express-validator";

// handle errors
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// register validation
export const registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars")
];

// login validation
export const loginValidation = [
  body("email").isEmail(),
  body("password").notEmpty()
];

// product validation
export const productValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("description").notEmpty().withMessage("Description is required"),
  body("image").notEmpty().withMessage("Image URL is required").isURL().withMessage("Valid image URL required"),
];