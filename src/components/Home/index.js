import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
// import Popup from 'reactjs-popup'
// import {IoReorderThree} from 'react-icons/io5'
// import {IoIosClose, IoMdLogOut} from 'react-icons/io'
import SideHeader from '../SideHeader'
import './index.css'
import FeaturedPlayLists from '../FeaturedPlaylists'
import Categories from '../Categories'
import NewReleases from '../NewReleases'

class Home extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  /*  renderMenuItems = () => (
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
            <IoMdLogOut className="logout-icon" />
            <p>Logout</p>
          </button>
        </div>
      )}
    </Popup>
  ) */

  renderHomeHeader = () => (
    <div className="mobile-home-header-bg">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dywnwbcln/image/upload/v1727765132/spotify_clone_images/mpneo2cl8efax4s6cwtm.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      {/* {this.renderMenuItems()} */}
    </div>
  )

  render() {
    return (
      <>
        <div className="home-page">
          <div className="mobile-navbar">{this.renderHomeHeader()}</div>
          <div className="desktop-side-header">
            <SideHeader />
          </div>
          <div className="home-bg">
            <h1 className="playlist-title">Editor</h1>
            <FeaturedPlayLists />
            <Categories />
            <NewReleases />
          </div>
        </div>
      </>
    )
  }
}

export default Home
