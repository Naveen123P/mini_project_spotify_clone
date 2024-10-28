import {Component} from 'react'
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
    const {details} = this.props
    const newDetails = this.getFormattedData(details)
    const {track} = newDetails
    //   console.log(track)
    const {name, artists, previewUrl, durationMs} = track
    console.log(previewUrl)
    return (
      <>
        <h3>{name}</h3>
        <p>{artists[0].name}</p>
        <p>
          {Math.floor(durationMs / (60 * 60 * 60 * 60))}:{durationMs % 60}
        </p>
        <audio controls src={previewUrl}>
          <track kind="captions" srcLang="en" label="No captions available" />
        </audio>
      </>
    )
  }
}

export default Item
