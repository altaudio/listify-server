import scraperjs from 'scraperjs'
import moment from 'moment'
import firebase from './initialiseFirebase.js'
import splitScrapeResult from './splitScrapeAllResults'

const writeTrackToFirebase = (source, track, trackData) => {
  firebase
    .database()
    .ref(`sources/${source.name}/tracks/${track.title}`)
    .update({
      title: track.title,
      artist: track.artist,
      timeStamp: moment().format('MMDDHHmm'),
      spotifyId: trackData.body.tracks.items[0].id,
    })
}

const getSpotifyIdAndWriteTrackToFirebase = (track, source, spotify) => {
  spotify
    .searchTracks(`track:${track.title} artist:${track.artist}`, { limit: 1 })
    .then(trackData => {
      if (trackData.body.tracks.items[0]) {
        writeTrackToFirebase(source, track, trackData)
        console.log(`${track.title} / ${track.artist} : ${source.name} - SUCCESS`)
      } else {
        console.log(`${track.title} / ${track.artist} : ${source.name} - SPOTIFY ERROR`)
      }
    })
    .catch(error => {
      console.log(error)
    })
}

const scrapeSource = (source, spotify) => {
  scraperjs.StaticScraper
    .create(source.url)
    .scrape($ => {
      return {
        title: $(source.trackSelector)
          .first()
          .text(),
        artist: $(source.artistSelector)
          .first()
          .text(),
      }
    })
    .then(track => {
      const splitTrack = splitScrapeResult(source, track)
      getSpotifyIdAndWriteTrackToFirebase(splitTrack, source, spotify)
    })
}

export default spotify => {
  firebase
    .database()
    .ref('/sources')
    .once('value')
    .then(sources => {
      sources.forEach(source => {
        scrapeSource(source.val(), spotify)
      })
    })
}
