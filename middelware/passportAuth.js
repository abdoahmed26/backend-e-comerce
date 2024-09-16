import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
import dotenv from "dotenv"
dotenv.config()

export const usePassport = () => {
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.PROJECT_URL}/auth/google/callback`,
            passReqToCallback : true
        },
        function(request, accessToken, refreshToken, profile, done) {
            // User.findOne({ googleId: profile.id }, function (err, user) {
            //     return done(err, user);
            // });
            done(null, profile);
        }
    ));
    
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}