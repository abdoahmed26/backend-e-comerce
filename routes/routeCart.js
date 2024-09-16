import express from "express"
import { verifyToken } from "../middelware/VerifyToken.js"
import { ValidationCart } from "../middelware/validationCart.js"
import { getCart, addCourseToCart, updateInCart, deleteFromCart } from "../Controls/CartControls.js"
import { errorValidation } from '../middelware/ErrorValidation.js';

export const routerCart = express.Router()

routerCart.route("/")
.get(verifyToken,getCart)
.post(verifyToken,ValidationCart,errorValidation,addCourseToCart)

routerCart.route("/:id")
.put(verifyToken,updateInCart)
.delete(verifyToken,deleteFromCart)