import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {IoReorderThree} from 'react-icons/io5'
import {IoIosClose} from 'react-icons/io'
import PlayListsItems from '../PlayListsItems'
import LoaderRoute from '../LoaderRoute'
import FailureView from '../FailureView'
import SideHeader from '../SideHeader'
import './index.css'
import FeaturedPlayLists from '../FeaturedPlaylists'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    // genresMoodsApiStatus: apiStatusConstants.initial,
    // newReleasesApiStatus: apiStatusConstants.initial,
    // genresMoods: [],
    // newReleases: [],
  }

  componentDidMount() {
    this.getFeaturedPlaylists()
    // this.getGenresMoods()
    // this.getNewReleases()
  }

  formattedData = data => ({
    id: data.id,
    name: data.name,
    image: data.images[0].url,
  })

  categoriesFormattedData = data => ({
    id: data.id,
    name: data.name,
    image: data.icons[0].url,
  })

  /*    getGenresMoods = async () => {
    this.setState({
      genresMoodsApiStatus: apiStatusConstants.inProgress,
    })
    const token = Cookies.get('jwt_token')
    const url = 'https://apis2.ccbp.in/spotify-clone/categories'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.categories.items.map(each =>
        this.categoriesFormattedData(each),
      )
      this.setState({
        genresMoodsApiStatus: apiStatusConstants.success,
        genresMoods: updatedData,
      })
    } else {
      this.setState({genresMoodsApiStatus: apiStatusConstants.failure})
    }
  }

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
  } */

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderMenuItems = () => (
    <Popup
      modal
      trigger={
        <button type="button" className="three-bars-button">
          <IoReorderThree />{' '}
        </button>
      }
      position="bottom"
    >
      {close => (
        <div className="popup-content">
          <button
            className="close-button"
            type="button"
            onClick={() => close()}
          >
            <IoIosClose />{' '}
          </button>
          <button
            type="button"
            onClick={this.onClickLogout}
            className="logout-button"
          >
            <img
              src="https://res.cloudinary.com/dywnwbcln/image/upload/v1727765132/spotify_clone_images/rfofgvx8wvlrlqw7ctxc.png"
              alt="logout"
              className="logout-img"
            />
          </button>
        </div>
      )}
    </Popup>
  )

  renderHomeHeader = () => (
    <div className="mobile-home-header-bg">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dywnwbcln/image/upload/v1727765132/spotify_clone_images/mpneo2cl8efax4s6cwtm.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      {this.renderMenuItems()}
    </div>
  )

  /*
  renderGenresMoodsSuccessView = () => {
    const {genresMoods} = this.state
    return (
      <>
        <ul className="playlist-ul">
          {genresMoods.map(each => (
            <PlayListsItems key={each.id} details={each} />
          ))}
        </ul>
      </>
    )
  }

  renderNewReleasesSuccessView = () => {
    const {newReleases} = this.state
    return (
      <>
        <ul className="playlist-ul">
          {newReleases.map(each => (
            <PlayListsItems key={each.id} details={each} />
          ))}
        </ul>
      </>
    )
  } */

  /*
  genresMoodsRetry = () => {
    this.getGenresMoods()
  }

  newReleasesRetry = () => {
    this.getNewReleases()
  } */

  /*

  getAllGenresMoodsApiStatus = () => {
    const {genresMoodsApiStatus} = this.state
    switch (genresMoodsApiStatus) {
      case apiStatusConstants.inProgress:
        return <LoaderRoute />
      case apiStatusConstants.success:
        return this.renderGenresMoodsSuccessView()
      case apiStatusConstants.failure:
        return <FailureView retry={this.genresMoodsRetry} />
      default:
        return null
    }
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
  }  */

  render() {
    return (
      <>
        <div className="mobile-view">
          <>{this.renderHomeHeader()}</>
          <div className="home-bg">
            <FeaturedPlayLists />
            {/* <div className="playlist-container">
              <h1 className="playlist-title">Categories</h1>
              {this.getAllGenresMoodsApiStatus()}
            </div>
            <div className="playlist-container">
              <h1 className="playlist-title">New releases</h1>
              {this.getAllNewReleasesApiStatus()}
            </div> */}
          </div>
        </div>
        <div className="desktop-view">
          <SideHeader />
          <div className="home-bg">
            <FeaturedPlayLists />
            {/* <div className="playlist-container">
              <h1 className="playlist-title">Categories</h1>
              {this.getAllGenresMoodsApiStatus()}
            </div>
            <div className="playlist-container">
              <h1 className="playlist-title">New releases</h1>
              {this.getAllNewReleasesApiStatus()}
            </div> */}
          </div>
        </div>
      </>
    )
  }
}

export default Home
