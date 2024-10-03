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
      // const updatedData =
      console.log(fetchedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        // playListsData:
      })
    } else {
      console.log('fail')
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderPlayListDetailsView = () => {
    const {playListsData} = this.state
    console.log(playListsData)
    return <h1>Success</h1>
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
            <h1 className="h1">hello</h1>
          </div>
        </div>
        <div className="desktop-view">
          <SideHeader />
          <div className="playlist-details-bg">
            <BackButton />
            <h1 className="h1">Hai Naveen</h1>
          </div>
        </div>
      </>
    )
  }
}

export default PlayListsDetails
