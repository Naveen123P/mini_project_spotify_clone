import {Component} from 'react'
import Cookies from 'js-cookie'
import LoaderRoute from '../LoaderRoute'
import FailureView from '../FailureView'
import AlbumItems from '../AlbumItems'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class NewReleases extends Component {
  state = {
    newReleasesApiStatus: apiStatusConstants.initial,
    newReleases: [],
  }

  componentDidMount() {
    this.getNewReleases()
  }

  formattedData = data => ({
    id: data.id,
    name: data.name,
    image: data.images[0].url,
  })

  getNewReleases = async () => {
    this.setState({
      newReleasesApiStatus: apiStatusConstants.inProgress,
    })
    const token = Cookies.get('jwt_token')
    const url = 'https://apis2.ccbp.in/spotify-clone/new-releases'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.albums.items.map(each =>
        this.formattedData(each),
      )
      this.setState({
        newReleasesApiStatus: apiStatusConstants.success,
        newReleases: updatedData,
      })
    } else {
      this.setState({newReleasesApiStatus: apiStatusConstants.failure})
    }
  }

  renderNewReleasesSuccessView = () => {
    const {newReleases} = this.state
    return (
      <>
        <ul className="playlist-ul">
          {newReleases.map(each => (
            <AlbumItems key={each.id} details={each} />
          ))}
        </ul>
      </>
    )
  }

  newReleasesRetry = () => {
    this.getNewReleases()
  }

  getAllNewReleasesApiStatus = () => {
    const {newReleasesApiStatus} = this.state
    switch (newReleasesApiStatus) {
      case apiStatusConstants.inProgress:
        return <LoaderRoute />
      case apiStatusConstants.success:
        return this.renderNewReleasesSuccessView()
      case apiStatusConstants.failure:
        return <FailureView retry={this.newReleasesRetry} />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="playlist-container">
        {/* <h1 className="playlist-title">New Release Albums</h1> */}
        <h1 className="playlist-title">New Releases</h1>
        {this.getAllNewReleasesApiStatus()}
      </div>
    )
  }
}

export default NewReleases
