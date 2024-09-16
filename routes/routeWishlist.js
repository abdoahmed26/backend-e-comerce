import express from "express"
import { verifyToken } from './../middelware/VerifyToken.js';
import { addToWishlist, deleteFromWishlist, getWishlist } from "../Controls/WishlistControls.js";
import { ValidationCart } from "../middelware/validationCart.js";
import { errorValidation } from "../middelware/ErrorValidation.js";

export const routerWishlist = express.Router()

routerWishlist.route("/")
.get(verifyToken, getWishlist)
.post(verifyToken,ValidationCart,errorValidation,addToWishlist)

routerWishlist.delete("/:id",verifyToken,deleteFromWishlist)