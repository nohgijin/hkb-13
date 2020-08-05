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

passport.serializeUser((profile, done) => {
  done(null, profile)
})

passport.deserializeUser(async (profile, done) => {
  const user = await findUser({
    name: profile.name,
    email: profile.email,
    site: profile.site,
  })
  done(null, user)
})

passport.use(
  new NaverStrategy(
    {
      clientID: naverConfig.CLIENT_ID,
      clientSecret: naverConfig.CLIENT_SECRET,
      callbackURL: naverConfig.CALLBACK_URL,
      authType: 'reauthenticate',
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await findUser({
        name: profile._json.nickname,
        email: profile.emails[0].value,
        site: profile.provider,
      })
      if (!user) {
        await createUser({
          name: profile._json.nickname,
          email: profile.emails[0].value,
          site: profile.provider,
          image: profile._json.profile_image ? profile._json.profile_image : '',
        })
      }
      return done(false, {
        name: profile._json.nickname,
        email: profile.emails[0].value,
        site: profile.provider,
      })
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
      authType: 'reauthenticate',
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await findUser({
        name: profile._json.name,
        email: profile.emails[0].value,
        site: profile.provider,
      })
      if (!user) {
        await createUser({
          name: profile._json.name,
          email: profile.emails[0].value,
          site: profile.provider,
          image: profile.photos[0].value ? profile.photos[0].value : '',
        })
      }
      return done(false, {
        name: profile._json.name,
        email: profile.emails[0].value,
        site: profile.provider,
      })
    }
  )
)

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
        name: profile.username,
        email: profile._json.email ? profile._json.email : '',
        site: profile.provider,
      })
      if (!user) {
        await createUser({
          name: profile.username,
          email: profile._json.email ? profile._json.email : '',
          site: profile.provider,
          image: profile.photos.value,
        })
      }
      return done(false, {
        name: profile.username,
        email: profile._json.email ? profile._json.email : '',
        site: profile.provider,
      })
    }
  )
)

router.get(
  '/login/github',
  passport.authenticate('github', { authType: 'reauthenticate' })
)

router.get(
  '/login/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: '/reports',
  })
)

module.exports = { loginRouter: router }
