import _ from 'lodash'

export default (source, track) => {
  let title = track.title
  let artist = track.artist

  if (source.dropArtistAfter) {
    artist = _.split(artist, source.dropArtistAfter)[0]
  }

  if (source.dropArtistBefore) {
    artist = _.split(artist, source.dropArtistBefore, 2)[1]
  }

  if (source.dropTrackAfter) {
    title = _.split(title, source.dropTrackAfter)[0]
  }

  if (source.dropTrackBefore) {
    title = _.split(title, source.dropTrackBefore, 2)[1]
  }

  if (source.omit) {
    const valuesToOmit = source.omit
    const omitRegExp = new RegExp(_.join(valuesToOmit, '|'), 'gi')
    title = _.replace(title, omitRegExp, '')
    artist = _.replace(artist, omitRegExp, '')
  }
  return { title: title, artist: artist }
}
