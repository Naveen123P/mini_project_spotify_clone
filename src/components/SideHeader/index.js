import {Link, withRouter} from 'react-router-dom'
import {IoMdLogOut} from 'react-icons/io'
import Cookies from 'js-cookie'
import './index.css'

const SideHeader = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-bg">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dywnwbcln/image/upload/v1727765132/spotify_clone_images/mpneo2cl8efax4s6cwtm.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <button type="button" onClick={onClickLogout} className="logout-button">
        <IoMdLogOut className="logout-icon" />
        <p>Logout</p>
      </button>
    </div>
  )
}

export default withRouter(SideHeader)
