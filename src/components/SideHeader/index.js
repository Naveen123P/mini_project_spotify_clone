import {withRouter} from 'react-router-dom'
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
      <img
        src="https://res.cloudinary.com/dywnwbcln/image/upload/v1727765132/spotify_clone_images/mpneo2cl8efax4s6cwtm.png"
        alt="website logo"
        className="website-logo"
      />
      <button type="button" onClick={onClickLogout} className="logout-button">
        <img
          src="https://res.cloudinary.com/dywnwbcln/image/upload/v1727765132/spotify_clone_images/rfofgvx8wvlrlqw7ctxc.png"
          alt="logout"
          className="logout-img"
        />
      </button>
    </div>
  )
}

export default withRouter(SideHeader)
