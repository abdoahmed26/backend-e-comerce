import { body } from "express-validator";

export const ValidationCourses = [
    body("title")
        .notEmpty()
        .withMessage("title is required")
        .isLength({min:2})
        .withMessage("title at least 2 characters"),
    body("price")
        .notEmpty()
        .withMessage("price is required")
        .isNumeric(),
    body("description")
        .notEmpty()
        .withMessage("description is required")
]