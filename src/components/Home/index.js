import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {IoReorderThree} from 'react-icons/io5'
import {IoIosClose} from 'react-icons/io'
import PlayListsDetails from '../PlayListsDetails'
import LoaderRoute from '../LoaderRoute'
import FailureView from '../FailureView'
import SideHeader from '../SideHeader'
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
    this.getGenresMoods()
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

  getEditorsPicks = async () => {
    this.setState({
      editorsPicksApiStatus: apiStatusConstants.inProgress,
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

      console.log(updatedData)
      this.setState({
        editorsPicksApiStatus: apiStatusConstants.failure,
        editorsPicks: updatedData,
      })
    } else {
      this.setState({editorsPicksApiStatus: apiStatusConstants.failure})
    }
  }

  getGenresMoods = async () => {
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

      console.log(updatedData)
      this.setState({
        genresMoodsApiStatus: apiStatusConstants.failure,
        genresMoods: updatedData,
      })
    } else {
      this.setState({genresMoodsApiStatus: apiStatusConstants.failure})
    }
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

  renderEditorsPicksSuccessView = () => {
    const {editorsPicks} = this.state
    return (
      <>
        <ul className="playlist-ul">
          {editorsPicks.map(each => (
            <PlayListsDetails key={each.id} details={each} />
          ))}
        </ul>
      </>
    )
  }

  renderGenresMoodsSuccessView = () => {
    const {genresMoods} = this.state
    return (
      <>
        <ul className="playlist-ul">
          {genresMoods.map(each => (
            <PlayListsDetails key={each.id} details={each} />
          ))}
        </ul>
      </>
    )
  }

  editorsPicksRetry = () => {
    this.getEditorsPicks()
  }

  genresMoodsRetry = () => {
    this.getGenresMoods()
  }

  getAllEditorsPicksApiStatus = () => {
    const {editorsPicksApiStatus} = this.state
    switch (editorsPicksApiStatus) {
      case apiStatusConstants.inProgress:
        return <LoaderRoute />
      case apiStatusConstants.success:
        return this.renderEditorsPicksSuccessView()
      case apiStatusConstants.failure:
        return <FailureView retry={this.editorsPicksRetry} />
      default:
        return null
    }
  }

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

  render() {
    const {editorsPicks, genresMoods, newReleases} = this.state
    return (
      <>
        <div className="mobile-view">
          <>{this.renderHomeHeader()}</>
          <div className="home-bg">{this.getAllEditorsPicksApiStatus()}</div>
        </div>
        <div className="desktop-view">
          <SideHeader />
          <div className="home-bg">
            <div className="playlist-container">
              <h1 className="playlist-title">Editor's Picks</h1>
              {this.getAllEditorsPicksApiStatus()}
            </div>
            <div className="playlist-container">
              <h1 className="playlist-title">Genres & Moods</h1>
              {this.getAllGenresMoodsApiStatus()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
