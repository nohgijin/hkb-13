const express = require('express')
const router = express.Router()
const passport = require('passport')

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

passport.use('google', google)
passport.use('github', github)

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
