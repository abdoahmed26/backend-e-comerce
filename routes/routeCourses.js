import express from "express"
import { ValidationCourses } from "../middelware/ValidarionCourses.js"
import { createCourse, deleteCourse, getAllCourses, getSingleCourse, updateCourse } from "../Controls/CoursesControls.js"
import { verifyToken } from "../middelware/VerifyToken.js"
import { AllowToCousers } from "../middelware/AllowToCousers.js"
import { ErrorUploadFile } from '../middelware/ErrorUploadFile.js';
import { upload } from '../middelware/UploadFile.js';
import { errorValidation } from '../middelware/ErrorValidation.js';

export const routerCourses = express.Router()

routerCourses.route("/")
.post(verifyToken,AllowToCousers("admin","manager"),upload.single('courseImg'),ErrorUploadFile,ValidationCourses,errorValidation,createCourse)
.get(verifyToken,getAllCourses)

// Get single course by id
routerCourses.route("/:id")
.get(verifyToken,getSingleCourse)
.put(verifyToken,AllowToCousers("admin","manager"),upload.single('courseImg'),ErrorUploadFile,updateCourse)
.delete(verifyToken,AllowToCousers("admin","manager"),deleteCourse)