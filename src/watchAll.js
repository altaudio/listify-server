import later from 'later'
import scrapeAll from './scrapeAll'

const scrapeAllInterval = 3

export default () => {
  const schedule = later.parse.recur().every(scrapeAllInterval).minute()
  later.setInterval(
    () => { scrapeAll() },
    schedule
  )
}
