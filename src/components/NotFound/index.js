import {Link, withRouter} from 'react-router-dom'
import SideHeader from '../SideHeader'
import BackButton from '../BackButton'
import './index.css'

const NotFound = () => {
  const renderNotFound = () => (
    <div className="not-found-content">
      <img
        src="https://res.cloudinary.com/dywnwbcln/image/upload/v1727765135/spotify_clone_images/chsubphppsnsy0vyknpm.png"
        alt="page not found"
        className="not-found-img"
      />
      <h1 className="not-found-heading">PAGE NOT FOUND</h1>
      <Link to="/">
        <button type="button" className="home-page-button">
          Home Page
        </button>
      </Link>
    </div>
  )

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
          <div className="playlist-details-bg">{renderNotFound()}</div>
        </div>
      </div>
    </>
  )
}

export default withRouter(NotFound)
