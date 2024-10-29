import {Component} from 'react'
import SongContext from '../../context/SongContext'

import './index.css'

class SongPlayingRoute extends Component {
  render() {
    return (
      <SongContext.Consumer>
        {value => {
          const {songDetails} = value
          const {name, artists, previewUrl, durationMs, images} = songDetails

          return (
            <>
              {Object.keys(songDetails).length !== 0 && (
                <div className="song-playing-container white-color">
                  <div className="row-flex">
                    <img
                      src={images[0].url}
                      alt="preview"
                      className="song-playing-img"
                    />
                    <div>
                      <h3 className="song-item-name">{name}</h3>
                      <p className="song-item-artist">{artists[0].name}</p>
                    </div>
                  </div>
                  <p>
                    {Math.floor(durationMs / (60 * 60 * 60 * 60))}:
                    {durationMs % 60}
                  </p>
                  <audio controls src={previewUrl}>
                    <track
                      kind="captions"
                      srcLang="en"
                      label="No captions available"
                    />
                  </audio>
                </div>
              )}
            </>
          )
        }}
      </SongContext.Consumer>
    )
  }
}

export default SongPlayingRoute
