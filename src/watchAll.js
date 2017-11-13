import later from 'later'
import scrapeAll from './scrapeAll'
import spotify from './intialiseSpotify'

const scrapeAllInterval = 3

export default () => {
  const schedule = later.parse
    .recur()
    .every(scrapeAllInterval)
    .minute()
  later.setInterval(() => {
    scrapeAll(spotify)
  }, schedule)
}
