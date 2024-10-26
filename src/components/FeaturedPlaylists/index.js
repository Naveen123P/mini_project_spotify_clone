import {Component} from 'react'
import Cookies from 'js-cookie'
import LoaderRoute from '../LoaderRoute'
import FailureView from '../FailureView'
import PlayListsItems from '../PlayListsItems'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class FeaturedPlayLists extends Component {
  state = {
    featuredPlaylistsApiStatus: apiStatusConstants.initial,
    featuredPlaylists: [],
  }

  componentDidMount() {
    this.getFeaturedPlaylists()
  }

  formattedData = data => ({
    id: data.id,
    name: data.name,
    image: data.images[0].url,
  })

  getFeaturedPlaylists = async () => {
    this.setState({
      featuredPlaylistsApiStatus: apiStatusConstants.inProgress,
    })
    const token = Cookies.get('jwt_token')
    const url = 'https://apis2.ccbp.in/spotify-clone/featured-playlists'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.playlists.items.map(each =>
        this.formattedData(each),
      )
      this.setState({
        featuredPlaylistsApiStatus: apiStatusConstants.success,
        featuredPlaylists: updatedData,
      })
    } else {
      this.setState({featuredPlaylistsApiStatus: apiStatusConstants.failure})
    }
  }

  renderFeaturedPlaylistsSuccessView = () => {
    const {featuredPlaylists} = this.state
    return (
      <>
        <ul className="playlist-ul">
          {featuredPlaylists.map(each => (
            <PlayListsItems key={each.id} details={each} />
          ))}
        </ul>
      </>
    )
  }

  featuredPlaylistsRetry = () => {
    this.getFeaturedPlaylists()
  }

  getAllFeaturedPlaylistsApiStatus = () => {
    const {featuredPlaylistsApiStatus} = this.state
    switch (featuredPlaylistsApiStatus) {
      case apiStatusConstants.inProgress:
        return <LoaderRoute />
      case apiStatusConstants.success:
        return this.renderFeaturedPlaylistsSuccessView()
      case apiStatusConstants.failure:
        return <FailureView retry={this.featuredPlaylistsRetry} />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="playlist-container">
        <h1 className="playlist-title">Featured Playlists</h1>
        {this.getAllFeaturedPlaylistsApiStatus()}
      </div>
    )
  }
}

export default FeaturedPlayLists
