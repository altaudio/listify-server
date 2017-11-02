import Spotify from 'spotify-web-api-node'
import config from './config'

const spotifyConfig = config.spotify

const getClientAccessToken = spotify => {
  request
    .post('https://accounts.spotify.com/api/token')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      grant_type: 'client_credentials',
      client_id: spotifyConfig.clientId,
      client_secret: spotifyConfig.clientSecret,
    })
    .end((error, accessToken) => {
      if (error) {
        console.log(error)
      }
      spotify.setAccessToken(accessToken.body.access_token)
    })
}

const spotify = new Spotify({
  clientId: spotifyConfig.clientId,
  clientSecret: spotifyConfig.clientSecret,
  redirectUri: spotifyConfig.redirectUrl,
})

getClientAccessToken(spotify)

export default spotify
