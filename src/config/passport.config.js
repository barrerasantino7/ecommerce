const passport = require("passport");
const jwt = require("passport-jwt");
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const UserModel = require("../models/session.model.js");

const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), // Utiliza ExtractJwt.fromExtractors para extraer el token de la cookie
        secretOrKey: "secretword"
    }, async (jwt_payload, done) => {
        try {
            // Busca el usuario en la base de datos usando el ID del payload JWT
            const user = await UserModel.findById(jwt_payload.user._id);
            if (!user) {
                return done(null, false);
            }
            return done(null, user); // Devuelve el usuario encontrado
        } catch (error) {
            return done(error);
        }
    }));
}

const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies["coderCookieToken"]
    }
    return token;
}

module.exports = initializePassport;

/*
const passport = require("passport");
const local = require("passport-local");
const sessionModel = require("../models/session.model");
const {createHash, isValidPassword} = require("../utils/hashbcryp.js");
const GitHubStrategy = require("passport-github2");

const LocalStrategy = local.Strategy;

const initializePassport = () =>{
    //Registro
    passport.use("register", new LocalStrategy({
        passReqToCallback:true,
        usernameField: "email"
    }, async (req, username, password, done)=>{

        const {first_name, last_name, email} = req.body;

        try {
            let user = await sessionModel.findOne({email: email});

            if(user){
                return done(null,false)
            }else{

                let newUser = {
                    first_name, 
                    last_name, 
                    email, 
                    password: createHash(password)
                }
    
                let result = await sessionModel.create(newUser)
    
                return done(null,result);
            }


        } catch (error) {
            return done(error);
        }
    }))

    //Login
    passport.use("login", new LocalStrategy({
        //passReqToCallback: true,
        usernameField: "email"
    }, async (email, password, done)=>{
        try {
        
            const user = await sessionModel.findOne({email});

            if(!user){
                return done(null,false)
            }else{
                if(isValidPassword(password, user)){
                    return done(null, user)
                }else{
                    return done(null,false)
                }
            }
        } catch (error) {
            return done(error)
        }
    }))

    //Login y register con GitHub
    passport.use("github", new GitHubStrategy({
        clientID:"Iv1.6fb24ed5a87240fb",
        clientSecret: "ca49802fbd66609c34479ff62289e3011d865208",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accesToken, refreshToken, profile, done)=>{
        
        try {
            let user = await sessionModel.findOne({email: profile._json.email});
            
            if(!user){
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "secret",
                    email: profile._json.email,
                    password: "secret"
                }
                let result = await sessionModel.create(newUser);

                done(null,result);
            }else{
                done(null,result)
            }
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    }); 

    passport.deserializeUser(async (id, done) => {
        let user = await sessionModel.findById({_id:id});
        done(null, user);
    })
}

module.exports = initializePassport;
*/