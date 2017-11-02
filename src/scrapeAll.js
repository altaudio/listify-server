import _ from 'lodash'
import scraperjs from 'scraperjs'
import moment from 'moment'
import firebase from './initialiseFirebase.js'
import splitScrapeResult from './splitScrapeAllResults'

const scrapeSource = source => {
  scraperjs.StaticScraper.create(source.url)
    .scrape(($) => {
      return {
        title: $(source.trackSelector).first().text(),
        artist: $(source.artistSelector).first().text(),
      }
    })
    .then((track) => {
      const splitTrack = splitScrapeResult(source, track)

      console.log(splitTrack)

      if(splitTrack.title && splitTrack.artist) {
        firebase.database().ref(`sources/${source.name}/tracks/${splitTrack.title}`).update({
          title: splitTrack.title,
          artist: splitTrack.artist,
          timeStamp: moment().format('MMDDHHmm'),
        })
      }
    })
}

export default () => {
  firebase.database().ref('/sources').once('value').then(sources => {
    sources.forEach(source => {
      const sourceScrapeOptions = source.val()
      scrapeSource(sourceScrapeOptions)
    })
  })
}
