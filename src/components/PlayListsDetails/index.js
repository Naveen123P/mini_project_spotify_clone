import {Component} from 'react'
import Cookies from 'js-cookie'
import LoaderRoute from '../LoaderRoute'
import FailureView from '../FailureView'
import BackButton from '../BackButton'
import SideHeader from '../SideHeader'
import Item from '../Item'
import SongPlayingTRoute from '../SongPlayingRoute'
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
    // console.log(id)
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
      //   const updatedData = fetchedData.tracks.items.map(each =>
      //     this.getFormattedData(each),
      //   )
      //   console.log(fetchedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        playListsData: fetchedData,
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

  renderPlayListDetailsView = () => {
    const {playListsData} = this.state
    const {name, images, tracks} = playListsData
    const {items} = tracks
    const songDetailsObj = items[0]
    console.log(songDetailsObj)
    const defaultSongDetails = {
      id: songDetailsObj.track.id,
      name: songDetailsObj.track.name,
      durationMs: songDetailsObj.track.duration_ms,
      images,
      previewUrl: songDetailsObj.track.preview_url,
      artists: songDetailsObj.track.artists, // songDetailsObj.artists[0].name,
    }
    // let count = 0
    console.log(defaultSongDetails)

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
                    <Item details={each} images={images} />
                  ))}
                </ul>
              </div>
              <SongPlayingTRoute />
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
