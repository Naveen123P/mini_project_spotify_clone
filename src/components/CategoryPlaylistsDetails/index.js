import {Component} from 'react'
import Cookies from 'js-cookie'
import LoaderRoute from '../LoaderRoute'
import FailureView from '../FailureView'
import BackButton from '../BackButton'
import SideHeader from '../SideHeader'
import CategoryItems from '../CategoryItems'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CategoryPlayListsDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    CategoryData: {},
  }

  componentDidMount() {
    this.getCategoryData()
  }

  getCategoryData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`
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
        CategoryData: fetchedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderCategoryDetailsView = () => {
    const {CategoryData} = this.state
    const {playlists} = CategoryData
    const {items} = playlists
    return (
      <div className="playlist-success-view white-color ">
        <h1 className="playlist-title">PlayList</h1>
        <ul className="category-desktop-style">
          {items.map(each => (
            <CategoryItems key={each.id} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  getCategoryDataRetry = () => {
    this.getCategoryData()
  }

  renderCategoryDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCategoryDetailsView()
      case apiStatusConstants.failure:
        return <FailureView retry={this.getCategoryDataRetry} />
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
              {this.renderCategoryDetails()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default CategoryPlayListsDetails
