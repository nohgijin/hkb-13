const express = require('express')
const router = express.Router()
const passport = require('passport')

const { naver } = require('./loginNaver')
const { google } = require('./loginGoogle')
const { github } = require('./loginGithub')
const { findUser } = require('../model/login')

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

passport.use('naver', naver)
passport.use('google', google)
passport.use('github', github)

router.get('/login/naver', passport.authenticate('naver'))
router.get('/login/naver/callback', function (req, res, next) {
  passport.authenticate('naver', function (err, user) {
    if (!user) {
      return res.redirect('http://13.125.215.184:3000/login')
    }
    req.logIn(user, function (err) {
      return res.redirect('http://13.125.215.184:3000/reports')
    })
  })(req, res)
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
