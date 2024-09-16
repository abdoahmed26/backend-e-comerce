import express from "express";
import { verifyToken } from "../middelware/VerifyToken.js"
import { createPayment, paymentConfirmation } from "../Controls/CheckoutControls.js"

export const routerCheckout = express.Router()

routerCheckout.post("/createPayment",verifyToken,createPayment) 

routerCheckout.post("/paymentConfirmation",verifyToken,paymentConfirmation)