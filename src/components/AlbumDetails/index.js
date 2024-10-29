import {Component} from 'react'
import Cookies from 'js-cookie'
import LoaderRoute from '../LoaderRoute'
import FailureView from '../FailureView'
import BackButton from '../BackButton'
import SideHeader from '../SideHeader'
// import Item from '../Item'
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

  getAlbumData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
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
      //   const updatedData = fetchedData.tracks.items.map(each =>
      //     this.getFormattedData(each),
      //   )
      //   console.log(fetchedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        albumData: fetchedData,
        // activeSong: updatedData.track.id,
      })
    } else {
      console.log('fail')
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  //   onChangeActiveSong = id => {
  //     this.setState({activeSong: id})
  //   }

  renderAlbumDetailsView = () => {
    const {albumData} = this.state
    // const {name, images, tracks} = playListsData
    // const {items} = tracks
    // let count = 0
    console.log(albumData)

    return (
      <div className="playlist-success-view white-color">
        {/* <img src={images[0].url} alt="preview" />
        <h1>{name}</h1>
        <ul className="tracks-items-track">
          {items.map(each => (
            <Item details={each} />
          ))}
        </ul> */}
        I am in Album Route
      </div>
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
          <BackButton />
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
