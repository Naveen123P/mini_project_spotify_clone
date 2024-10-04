import {Component} from 'react'
import Cookies from 'js-cookie'
import LoaderRoute from '../LoaderRoute'
import FailureView from '../FailureView'
import BackButton from '../BackButton'
import SideHeader from '../SideHeader'
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
    activeSong: '',
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
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.tracks.items.map(each =>
        this.getFormattedData(each),
      )
      console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        playListsData: updatedData,
        activeSong: updatedData.track.id,
      })
    } else {
      console.log('fail')
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeActiveSong = id => {
    this.setState({activeSong: id})
  }

  renderPlayListDetailsView = () => {
    const {playListsData, activeSong} = this.state
    const {addedAt, track} = playListsData

    // const activeSongImage = () => {
    //     const filteredSongImage = tra
    // }

    return (
      <div className="playlist-success-view">
        <h1 className="">Hello World</h1>
      </div>
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
        <div className="mobile-view playlist-details-padding">
          <BackButton />
          <div className="playlist-details-bg">
            {this.renderPlayListDetails()}
          </div>
        </div>
        <div className="desktop-view">
          <SideHeader />
          <div className="playlist-details-bg">
            <BackButton />
            {this.renderPlayListDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default PlayListsDetails
