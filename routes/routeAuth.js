import express from "express"
import { login, register } from '../Controls/AuthControls.js';
import { validationLogin, validationRegister } from '../middelware/ValidationUsers.js';
import { errorValidation } from '../middelware/ErrorValidation.js';
import { ErrorUploadFile } from '../middelware/ErrorUploadFile.js';
import { upload } from '../middelware/UploadFile.js';

export const routerAuth = express.Router()

routerAuth.post("/login",validationLogin,errorValidation,login)

routerAuth.post("/rigister",upload.single('avatar'),ErrorUploadFile,validationRegister,errorValidation,register)