import {Component} from 'react'
import moment from 'moment'
import SongContext from '../../context/SongContext'
import './index.css'

class Item extends Component {
  getFormattedData = data => ({
    addedAt: data.added_at,
    track: {
      album: {
        albumType: data.track.album.album_type,
        artists: data.track.album.artists.map(each => ({
          id: each.id,
          name: each.name,
        })),
        name: data.track.album.name,
        id: data.track.album.id,
        releaseDate: data.track.album.release_date,
        images: data.track.album.images[0].url,
      },
      artists: data.track.artists.map(each => ({
        id: each.name,
        name: each.name,
      })),
      durationMs: data.track.duration_ms,
      id: data.track.id,
      name: data.track.name,
      popularity: data.track.popularity,
      previewUrl: data.track.preview_url,
      trackNumber: data.track.track_number,
    },
  })

  render() {
    const {details, images} = this.props
    const newDetails = this.getFormattedData(details)
    const {addedAt, track} = newDetails
    const {
      trackNumber,
      album,
      name,
      artists,
      previewUrl,
      durationMs,
      id,
    } = track

    const extractTitle = input => input.split(/[([\]]/)[0].trim()

    console.log(previewUrl)
    return (
      <SongContext.Consumer>
        {value => {
          const {updatedSongDetails} = value
          const onClickSongItem = () => {
            updatedSongDetails({
              id,
              name,
              artists,
              previewUrl,
              durationMs,
              images,
            })
          }
          return (
            <>
              <li
                onClick={onClickSongItem}
                className="song-item desktop-song-item"
              >
                <div className="song-artist">
                  <h3 className="song-item-name">{extractTitle(name)}</h3>
                  <p className="song-item-artist">
                    {extractTitle(artists[0].name)}
                  </p>
                </div>
                <p>
                  {Math.floor(durationMs / (60 * 60 * 60 * 60))}:
                  {durationMs % 60}
                </p>
              </li>

              <li
                onClick={onClickSongItem}
                className="desktop-track-table desktop-song-item"
              >
                <p className="track-no">{trackNumber}</p>
                <p className="equal-width track-name">{extractTitle(name)}</p>
                <p className="equal-width album">{extractTitle(album.name)}</p>
                <p className="time">
                  {Math.floor(durationMs / (60 * 60 * 60 * 60))}:
                  {durationMs % 60}
                </p>
                <p className="equal-width artist">
                  {extractTitle(artists[0].name)}
                </p>
                <p className="equal-width added">{moment(addedAt).fromNow()}</p>
              </li>
            </>
          )
        }}
      </SongContext.Consumer>
    )
  }
}

export default Item
