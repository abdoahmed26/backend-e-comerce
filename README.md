# E-Commerce API

A E-Commerce APIs implemented with (Node.js, Express.js, MongoDB)




## Follow Me
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin&labelColor=blue)](https://www.linkedin.com/in/abdo-ahmed-67185a28a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
 [![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github&labelColor=black)](https://github.com/abdoahmed26)





## Table of content
- [Installation](#Installation)
- [Usage](#Usage)
- [Tech Stack](#Tech-Stack)
- [Features](#Features)

## Installation

1-Clone the repo 

```bash
git clone https://github.com/abdoahmed26/backend-e-commerce.git
cd backend-e-commerce
```
2-Install dependencies

```bash
  npm install
```
3- Setup environment variables
```env
DATABASE_URL = your database url

JWT_SCRET_KEY = random value

STRIPE_SCRET_KEY = secret key account stripe

PORT = your port ex(5000)

PROJECT_URL = your base url ex (http://localhost:5000)

GOOGLE_CLIENT_ID = your google client id for passport google auth

GOOGLE_CLIENT_SECRET = your google client secret

SESSION_SCRET_KEY = your session secret key like random value

USER = your user account gmail for sending emails

PASS = your password account gmail for sending emails

```
## Usage

```bash
npm run dev
```


## Tech Stack
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Web application framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB and Node.js.
- **Passport.js**: Authentication middleware for Node.js.
- **Multer**: Middleware for handling multipart/form-data,   primarily used for file uploads.
- **Express Validator**: Middleware for server-side validation.
- **Express Session**: Session middleware for Express.
- **Compression**: Middleware to compress response bodies.
- **Dotenv**: Module to load environment variables from a .env file.
- **CORS**: Middleware to enable CORS.
- **Bcrypt**: Library to hash passwords.
- **Nodemailer**: Library for sending email
- **Jsonwebtoken**: Library for sign and verify token 


## Features

- **User Management** 
    - user can register new account or use  his google account
    - user can login 
    - user can update his (personal infos, email, profile image, password)
    - user can reset his password in case of forgotten 
- **Shopping cart management**
    - user cant add or update or delete items to cart
- **File uploads Management**
    - admin and manager can upload images for products
    - user can upload image for profile image 
- **Products Management**
    - admin or manager can add or update or delete products 
    - user can get products only

- **Reviews Management**
    - users can add review about the product, can update or delete it, and can view all reviews
- **Wishlist Management** 
    - user can add or delete product to wishlist
- **Payment**
    - user can pay the price of products using stripe