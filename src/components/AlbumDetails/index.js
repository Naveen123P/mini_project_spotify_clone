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
      console.log('fail')
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderAlbumDetailsView = () => {
    const {albumData} = this.state
    const {name, images, tracks} = albumData
    const {items} = tracks
    const songDetailsObj = items[0]
    const defaultSongDetails = {
      id: songDetailsObj.id,
      name: songDetailsObj.name,
      durationMs: songDetailsObj.duration_ms,
      images,
      previewUrl: songDetailsObj.preview_url,
      artists: songDetailsObj.artists, // songDetailsObj.artists[0].name,
    }
    return (
      <SongContext.Consumer>
        {value => {
          const {songDetails, updatedSongDetails} = value
          if (Object.keys(songDetails).length === 0) {
            updatedSongDetails({...defaultSongDetails})
          }
          return (
            <>
              <div className="playlist-success-view white-color">
                <div className="top-image-name">
                  <img src={images[0].url} alt="preview" className="top-img" />
                  <h1 className="top-name">{name}</h1>
                </div>
                <ul className="tracks-items-track">
                  {items.map(each => (
                    <AlbumItem details={each} images={images} />
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
        <div className="mobile-view playlist-details-padding">
          <div className="top-fixed-bar">
            <BackButton />
          </div>
          <div className="playlist-details-bg">{this.renderAlbumDetails()}</div>
        </div>
        <div className="desktop-view">
          <SideHeader />
          <div className="playlist-details-bg">
            <BackButton />
            {this.renderAlbumDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default AlbumDetails
