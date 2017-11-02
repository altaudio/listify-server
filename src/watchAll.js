import later from 'later'
import scrapeAll from './scrapeAll'
import spotify from './intialiseSpotify'

const scrapeAllInterval = 10

export default () => {
  const schedule = later.parse
    .recur()
    .every(scrapeAllInterval)
    .second()
  later.setInterval(() => {
    scrapeAll(spotify)
  }, schedule)
}
