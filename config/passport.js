var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

module.exports = function() {

    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: 'da6289cfe7099e5338a6',
        clientSecret: '00f3e7486839b9f64200b56bad1568145fdc0793',
        callbackURL: 'http://localhost:3000/auth/github/callback'   
    }, function(acessToken, refreshToken, profile, done) {

        Usuario.findOrCreate(
            {"login": profile.username},
            {"nome": profile.username},
            function(erro, usuario) {
                if(erro) {
                    console.log(erro);
                    return done(erro);
                }
                return done(null, usuario);
            }
        );

    }));

    passport.serializeUser(function(usuario, done) {
        done(null, usuario._id);
    });

    passport.deserializeUser(function(id, done) {
        Usuario.findById(id).exec()
            .then(function(usuario) {
                done(null, usuario);
            });
    });

};
