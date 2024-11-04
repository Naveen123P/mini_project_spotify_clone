import {Component} from 'react'
import SongContext from '../../context/SongContext'

import './index.css'

class SongPlayingRoute extends Component {
  constructor(props) {
    super(props)

    const {dummyDetails} = this.context

    this.state = {
      dummyDetails,
    }
  }

  render() {
    const {dummyDetails} = this.state

    console.log(dummyDetails)
    const extractTitle = input => input.split(/[([\]]/)[0].trim()

    return (
      <SongContext.Consumer>
        {value => {
          const {songDetails} = value
          const {name, artists, previewUrl, images} = songDetails
          const playingSong = () => (
            <audio autoPlay loop>
              <source src={previewUrl} type="audio/mpeg" />
              <track
                kind="captions"
                srcLang="en"
                label="No captions available"
              />
            </audio>
          )

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
                      <h3 className="song-item-name">{extractTitle(name)}</h3>
                      <p className="song-item-artist">
                        {extractTitle(artists[0].name)}
                      </p>
                    </div>
                  </div>
                  <>{playingSong()}</>
                  <button type="button" className="white-color song-item-name">
                    play
                  </button>
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
