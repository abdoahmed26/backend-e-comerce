import { body } from "express-validator";

export const validationReviews = [
    body("review")
        .notEmpty()
        .withMessage("review is required"),
    body("rate")
        .notEmpty()
        .withMessage("rate is required"),
]