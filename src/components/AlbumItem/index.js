import {Component} from 'react'
import SongContext from '../../context/SongContext'
import './index.css'

class AlbumItem extends Component {
  getFormattedData = data => ({
    artists: data.artists.map(each => ({
      id: each.name,
      name: each.name,
    })),
    durationMs: data.duration_ms,
    id: data.id,
    name: data.name,
    previewUrl: data.preview_url,
    trackNumber: data.track_number,
  })

  render() {
    const {details, images} = this.props
    const newDetails = this.getFormattedData(details)
    const {name, artists, previewUrl, durationMs, id} = newDetails
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

export default AlbumItem
