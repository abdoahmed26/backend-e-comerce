import express from "express"
import { verifyToken } from '../middelware/VerifyToken.js';
import { validationPassword } from "../middelware/validationUpdatePassword.js";
import { errorValidation } from "../middelware/ErrorValidation.js";
import { updatePassword, forgotPassword, verifyCode, resetPassword } from "../Controls/PasswordControls.js"

export const routerPassword = express.Router()

routerPassword.put("/update",verifyToken,validationPassword,errorValidation,updatePassword)

routerPassword.post("/forgotPassword",forgotPassword)

routerPassword.post("/verifyCode",verifyCode)

routerPassword.post("/resetPassword",resetPassword)