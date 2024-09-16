// const express = require("express");
import express from "express"
import cors from "cors";
import compression from "compression";
import { routerCourses } from "./routes/routeCourses.js";
import { routerUsers } from "./routes/routeUsers.js";
import { routerCart } from "./routes/routeCart.js";
import { routerAuth } from "./routes/routeAuth.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { routerWishlist } from "./routes/routeWishlist.js";
import { routerReviews } from "./routes/routeReviews.js";
import { routerPassword } from "./routes/routePassword.js";
import { routerCheckout } from "./routes/routeCheckout.js";
import { routerAuthGoogle } from "./routes/routeAuthGoogle.js";
import session from "express-session";
import MongoStore from 'connect-mongo';
import passport from "passport";
import { usePassport } from "./middelware/passportAuth.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(compression())
app.use(session({
    secret: process.env.SESSION_SCRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL , collectionName: "sessions"}),
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24
    }
}))

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("Connected to mongodb")
}).catch(()=>{
    console.log("Failed to connect to mongodb")
    process.exit()  // kill the process with an error code 1 to indicate failure
})

usePassport()
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));

app.use("/auth",routerAuth)

app.use("/auth/google",routerAuthGoogle)

app.use("/user",routerUsers)

app.use("/courses",routerCourses)

app.use("/cart",routerCart)

app.use("/wishlist",routerWishlist)

app.use("/reviews",routerReviews)

app.use("/password",routerPassword)

app.use("/checkout",routerCheckout)

app.all("*",(req,res)=>{
    return res.status(404).json({status:"error",message:"this resource is not available"})
})

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})