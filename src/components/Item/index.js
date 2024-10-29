import {Component} from 'react'
import SongContext from '../../context/SongContext'
import './index.css'

class Item extends Component {
  /*  state ={
    activeSongUrl: "",
  } */

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
    const {track} = newDetails
    //   console.log(track)
    const {name, artists, previewUrl, durationMs, id} = track
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
            <li onClick={onClickSongItem} className="song-item">
              <div className="song-artist">
                <h3 className="song-item-name">{name}</h3>
                <p className="song-item-artist">{artists[0].name}</p>
              </div>
              <p>
                {Math.floor(durationMs / (60 * 60 * 60 * 60))}:{durationMs % 60}
              </p>
            </li>
          )
        }}
      </SongContext.Consumer>
    )
  }
}

export default Item
