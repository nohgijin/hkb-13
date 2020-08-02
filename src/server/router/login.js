const express = require('express')
const router = express.Router()

const passport = require('passport')
const NaverStrategy = require('passport-naver').Strategy
const { config } = require('../../config/naverPassport')

passport.use(
  new NaverStrategy(
    {
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: config.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(accessToken)
      console.log(profile)
      return done(false,profile)
    }
  )
)

router.get('/login/naver', passport.authenticate('naver'))

router.get('/login/naver/callback', function (req, res, next) {
  passport.authenticate('naver', function (err, user) {
    console.log('passport.authenticate(naver)실행')
    console.log(user)
    if (!user) {
      return res.redirect('http://localhost:3000/2020/7/login')
    }
    req.logIn(user, function (err) {
      console.log('naver/callback user : ', user)
      return res.redirect('http://localhost:3000/2020/7/reports')
    })
  })(req, res)
})

module.exports = { loginRouter: router }
