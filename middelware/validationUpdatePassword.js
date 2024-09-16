import { body } from "express-validator";

export const validationPassword = [
    body("oldPassword")
        .notEmpty()
        .withMessage("old password is required"),
    body("newPassword")
        .notEmpty()
        .withMessage("new password is required"),
]