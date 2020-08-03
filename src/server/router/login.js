const express = require('express')
const router = express.Router()

const passport = require('passport')
const NaverStrategy = require('passport-naver').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

const { naverConfig } = require('../../config/naverPassport')
const { googleConfig } = require('../../config/googlePassport')

const { findUser, createUser } = require('../model/login')

passport.use(
  new NaverStrategy(
    {
      clientID: naverConfig.CLIENT_ID,
      clientSecret: naverConfig.CLIENT_SECRET,
      callbackURL: naverConfig.CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await findUser({
        name: profile.displayName,
        email: profile.emails[0].value,
        site: profile.provider,
      })
      if (!user.length) {
        createUser({
          name: profile.displayName,
          email: profile.emails[0].value,
          site: profile.provider,
        })
      }
      return done(false, profile)
    }
  )
)

router.get('/login/naver', passport.authenticate('naver'))
router.get('/login/naver/callback', function (req, res, next) {
  passport.authenticate('naver', function (err, user) {
    if (!user) {
      return res.redirect('http://localhost:3000/login')
    }
    req.logIn(user, function (err) {
      return res.redirect('http://localhost:3000/reports')
    })
  })(req, res)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: googleConfig.CLIENT_ID,
      clientSecret: googleConfig.CLIENT_SECRET,
      callbackURL: googleConfig.CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await findUser({
        name: profile.displayName,
        email: profile.emails[0].value,
        site: profile.provider,
      })
      if (!user.length) {
        createUser({
          name: profile.displayName,
          email: profile.emails[0].value,
          site: profile.provider,
        })
      }
      return cb(false, profile)
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user)
})

router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
router.get(
  '/login/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/reports',
  })
)

module.exports = { loginRouter: router }
