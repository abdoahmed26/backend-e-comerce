import express from "express"
import { verifyToken } from '../middelware/VerifyToken.js';
import { getReviews, addReviews, updateReview, deleteReview } from "../Controls/ReviewsControls.js"
import { validationReviews } from "../middelware/validationReviews.js";
import { errorValidation } from "../middelware/ErrorValidation.js";

export const routerReviews = express.Router()

routerReviews.route("/:id")
.get(verifyToken,getReviews)
.post(verifyToken,validationReviews,errorValidation,addReviews)
.put(verifyToken,updateReview)
.delete(verifyToken,deleteReview)