import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {IoReorderThree} from 'react-icons/io5'
import {IoIosClose} from 'react-icons/io'
import LoaderRoute from '../LoaderRoute'
import FailureRoute from '../FailureRoute'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    editorsPicksApiStatus: apiStatusConstants.initial,
    genresMoodsApiStatus: apiStatusConstants.initial,
    newReleasesApiStatus: apiStatusConstants.initial,
    editorsPicks: [],
    genresMoods: [],
    newReleases: [],
  }

  componentDidMount() {
    this.getEditorsPicks()
    // this.getGenresMoods()
    // this.getNewReleases()
  }

  getEditorsPicks = () => {
    this.setState({
      editorsPicksApiStatus: apiStatusConstants.inProgress,
    })
  }

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

  getAllApiStatus = apiStatus => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoaderRoute />
      //   case apiStatusConstants.success:
      //     return successView()
      //   case apiStatusConstants.failure:
      //     return <FailureRoute retry={retry} />
      default:
        return null
    }
  }

  renderEditorsPicksSuccessView = () => {
    const {editorsPicks} = this.editorsPicks
    return <h1>success</h1>
  }

  getAllEditorsPicks = () => {
    const {editorsPicksApiStatus} = this.state
    const retry = () => {
      this.getEditorsPicks()
    }

    this.getAllApiStatus(editorsPicksApiStatus)
    //   ,
    //   this.renderEditorsPicksSuccessView(),
    //   retry,
    // )
  }

  render() {
    const {editorsPicks, genresMoods, newReleases} = this.state
    return (
      <>
        <>{this.renderHomeHeader()}</>
        <div className="mobile-view">
          <div className="home-bg">
            <h1>Home</h1>
            {this.getAllEditorsPicks()}
          </div>
        </div>
      </>
    )
  }
}

export default Home
