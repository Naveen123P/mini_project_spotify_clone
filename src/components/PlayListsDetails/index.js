import {Component} from 'react'
import Cookies from 'js-cookie'
import LoaderRoute from '../LoaderRoute'
import FailureView from '../FailureView'
import BackButton from '../BackButton'
import SideHeader from '../SideHeader'
import Item from '../Item'
import SongPlayingRoute from '../SongPlayingRoute'
import SongContext from '../../context/SongContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PlayListsDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    playListsData: {},
  }

  componentDidMount() {
    this.getPlayListData()
  }

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

  getPlayListData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({
        apiStatus: apiStatusConstants.success,
        playListsData: fetchedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderPlayListDetailsView = () => {
    const {playListsData} = this.state
    console.log(1000000000000000000)
    console.log(playListsData)
    const {name, images, tracks} = playListsData
    const {items} = tracks
    const songDetailsObj = items[0]
    const defaultSongDetails = {
      id: songDetailsObj.track.id,
      name: songDetailsObj.track.name,
      durationMs: songDetailsObj.track.duration_ms,
      images,
      previewUrl: songDetailsObj.track.preview_url,
      artists: songDetailsObj.track.artists, // songDetailsObj.artists[0].name,
    }

    return (
      <SongContext.Consumer>
        {value => {
          const {songDetails, updatedSongDetails} = value
          const {artists} = songDetails
          console.log(artists)
          if (Object.keys(songDetails).length === 0) {
            updatedSongDetails({...defaultSongDetails})
          }

          return (
            <>
              <div className="playlist-success-view white-color">
                <div className="top-image-name">
                  <img src={images[0].url} alt="preview" className="top-img" />
                  <div className="details-text-container">
                    <h1 className="desktop-playlist-title">
                      New Release Albums
                    </h1>
                    <h1 className="top-name">{name}</h1>
                    {artists ? (
                      <p className="artist-name">{artists[0].name}</p>
                    ) : null}
                  </div>
                </div>
                <div className="desktop-track-table border-bottom">
                  <p className="track-no"> </p>
                  <p className="equal-width track-name">Track</p>
                  <p className="equal-width album">Album</p>
                  <p className="time">Time</p>
                  <p className="equal-width artist">Artist</p>
                  <p className="equal-width added">Added</p>
                </div>

                <ul className="tracks-items-track">
                  {items.map(each => (
                    <Item details={each} images={images} />
                  ))}
                </ul>
                <div className="desktop-playing-song">
                  <SongPlayingRoute />
                </div>
              </div>
              <div className="mobile-playing-song">
                <SongPlayingRoute />
              </div>
            </>
          )
        }}
      </SongContext.Consumer>
    )
  }

  getPlayListDataRetry = () => {
    this.getPlayListData()
  }

  renderPlayListDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPlayListDetailsView()
      case apiStatusConstants.failure:
        return <FailureView retry={this.getPlayListDataRetry} />
      case apiStatusConstants.inProgress:
        return <LoaderRoute />
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="playlist-details-padding">
          <div className="desktop-side-header">
            <SideHeader />
          </div>
          <div className="desktop-details-page">
            <div className="top-fixed-bar">
              <BackButton />
            </div>
            <div className="playlist-details-bg">
              {this.renderPlayListDetails()}
            </div>
          </div>
        </div>
        {/* <div className="desktop-view">
          <SideHeader />
          <div className="playlist-details-bg">
            <BackButton />
            {this.renderPlayListDetails()}
          </div>
        </div> */}
      </>
    )
  }
}

export default PlayListsDetails
