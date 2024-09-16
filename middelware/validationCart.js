import { body } from "express-validator";

export const ValidationCart = [
    body("courseId")
        .notEmpty()
        .withMessage("_id is required"),
    body("courseImg")
        .notEmpty()
        .withMessage("courseImg is required"),
    body("title")
        .notEmpty()
        .withMessage("title is required"),
    body("price")
        .notEmpty()
        .withMessage("price is required"),
    body("description")
        .notEmpty()
        .withMessage("description is required")
]