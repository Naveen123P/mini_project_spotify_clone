import {Component} from 'react'
import Cookies from 'js-cookie'
import LoaderRoute from '../LoaderRoute'
import FailureView from '../FailureView'
import BackButton from '../BackButton'
import SideHeader from '../SideHeader'
import SongContext from '../../context/SongContext'
import SongPlayingRoute from '../SongPlayingRoute'
import AlbumItem from '../AlbumItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AlbumDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    albumData: {},
  }

  componentDidMount() {
    this.getAlbumData()
  }

  getAlbumData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis2.ccbp.in/spotify-clone/album-details/${id}`
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
        albumData: fetchedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
    const {albumData} = this.state
    const {tracks} = albumData
    const {items} = tracks
  }

  renderAlbumDetailsView = () => {
    const {albumData} = this.state
    const {name, images, tracks, popularity} = albumData
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
                    <h1 className="desktop-playlist-title">New Releases</h1>
                    <h1 className="top-name">{name}</h1>
                    {/* {artists ? (
                      <p className="artist-name">{artists[0].name}</p>
                    ) : (
                      <p className="artist-name">{artistName}</p>
                    )} */}
                  </div>
                </div>
                <div className="desktop-track-table border-bottom">
                  <p className="track-no">#</p>
                  <p className="album-track-name">Track</p>
                  <p className="album-time">Time</p>
                  <p className="album-popularity">Popularity</p>
                  <p className="artist">Artist</p>
                </div>
                <ul className="tracks-items-track">
                  {items.map(each => (
                    <AlbumItem
                      key={each.id}
                      details={each}
                      images={images}
                      popularity={popularity}
                    />
                  ))}
                </ul>
              </div>
              <SongPlayingRoute />
            </>
          )
        }}
      </SongContext.Consumer>
    )
  }

  getAlbumDataRetry = () => {
    this.getAlbumData()
  }

  renderAlbumDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAlbumDetailsView()
      case apiStatusConstants.failure:
        return <FailureView retry={this.getAlbumDataRetry} />
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
              {this.renderAlbumDetails()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default AlbumDetails
