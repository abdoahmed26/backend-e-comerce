import express from 'express';
import passport from 'passport';
import { authLoginSuccess } from '../Controls/AuthGoogleControls.js';

export const routerAuthGoogle = express.Router();

routerAuthGoogle.get('/',
    passport.authenticate('google', { scope:
        [ 'email', 'profile' ] }
));

routerAuthGoogle.get( '/callback',
    passport.authenticate( 'google', {
        failureRedirect: '/auth/google/failure',
}),authLoginSuccess);

routerAuthGoogle.get('/failure', (req, res) => {
    return res.status(404).json({status:"fail",message:"failed to login"});
});