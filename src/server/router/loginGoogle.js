const GoogleStrategy = require('passport-google-oauth20').Strategy
const { googleConfig } = require('../../config/googlePassport')
const { findUser,createUser } = require('../model/login')

const google = new GoogleStrategy(
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

module.exports = { google }
