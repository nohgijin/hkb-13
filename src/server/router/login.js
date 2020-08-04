const express = require('express')
const router = express.Router()

const passport = require('passport')
const NaverStrategy = require('passport-naver').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy = require('passport-github').Strategy

const { naverConfig } = require('../../config/naverPassport')
const { googleConfig } = require('../../config/googlePassport')
const { githubConfig } = require('../../config/githubPassport')

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
          image: profile._json.profile_image ? profile._json.profile_image : '',
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
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile)
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
          image: profile.photos[0].value
            ? profile.photos[0].value
            : '',
        })
      }
      return done(false, profile)
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

passport.use(
  new GitHubStrategy(
    {
      clientID: githubConfig.CLIENT_ID,
      clientSecret: githubConfig.CLIENT_SECRET,
      callbackURL: githubConfig.CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await findUser({
        name: profile.displayName,
        email: profile._json.email ? profile._json.email : '',
        site: profile.provider,
      })
      if (!user.length) {
        createUser({
          name: profile.displayName,
          email: profile._json.email ? profile._json.email : '',
          site: profile.provider,
          image: profile.photos.value,
        })
      }
      return done(false, profile)
    }
  )
)

router.get('/login/github', passport.authenticate('github'))

router.get(
  '/login/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: '/reports',
  })
)

module.exports = { loginRouter: router }
