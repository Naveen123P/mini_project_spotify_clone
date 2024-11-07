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
    // playlistTrack: [],
  }

  componentDidMount() {
    this.getPlayListData()
  }

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
    const {playListsData} = this.state
    const {tracks} = playListsData
    const {items} = tracks
  }

  renderPlayListDetailsView = () => {
    const {playListsData} = this.state
    const {name, images, tracks, description} = playListsData
    const {items} = tracks

    return (
      <SongContext.Consumer>
        {value => {
          const {songDetails} = value
          const {artists} = songDetails
          return (
            <>
              <div className="playlist-success-view white-color">
                <div className="top-image-name">
                  <img src={images[0].url} alt="preview" className="top-img" />
                  <div className="details-text-container">
                    <h1 className="desktop-playlist-title">Editors Picks</h1>
                    <h1 className="top-name">{name}</h1>
                    <p className="artist-name">{description}</p>
                    {/* {artists ? (
                      <p className="artist-name">{artists[0].name}</p>
                    ) : (
                      <p className="artist-name">{artistName}</p>
                    )} */}
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
                    <Item key={each.track.id} details={each} images={images} />
                  ))}
                </ul>
                <div className="dummy-div"> </div>
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
      </>
    )
  }
}

export default PlayListsDetails
