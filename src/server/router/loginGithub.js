const GitHubStrategy = require('passport-github').Strategy
const { githubConfig } = require('../../config/githubPassport')
const { findUser,createUser } = require('../model/login')

const github = new GitHubStrategy(
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

module.exports = { github }
