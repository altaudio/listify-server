import later from 'later'
import scrapeAll from './scrapeAll'
import spotify from './initialiseSpotify'

const scrapeAllInterval = 10

export default () => {
  const schedule = later.parse.recur().every(scrapeAllInterval).second()
  later.setInterval(() => {
    scrapeAll()
  }, schedule)
}
