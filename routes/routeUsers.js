import express from 'express';
import { getUser, updateUser, deleteUser } from '../Controls/UsersControls.js';
import { verifyToken } from '../middelware/VerifyToken.js';
import { ErrorUploadFile } from '../middelware/ErrorUploadFile.js';
import { upload } from '../middelware/UploadFile.js';

export const routerUsers = express.Router();

routerUsers.route("/")
.get(verifyToken,getUser)
.put(verifyToken,upload.single('avatar'),ErrorUploadFile,updateUser)
.delete(verifyToken,deleteUser)