import scraperjs from 'scraperjs'

scraperjs.StaticScraper
  .create('https://www.reddit.com/r/listentothis/new/')
  .scrape($ => {
    return {
      title: $('.entry .title .may-blank').first().text(),
      artist: $('.entry .title .may-blank').first().text(),
    }
  })
  .then(track => {
    console.log(track)
  })
