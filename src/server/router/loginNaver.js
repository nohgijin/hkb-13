const NaverStrategy = require('passport-naver').Strategy
const { naverConfig } = require('../../config/naverPassport')
const { findUser,createUser } = require('../model/login')

const naver = new NaverStrategy(
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

module.exports = { naver }
