import {Link, withRouter} from 'react-router-dom'
import SideHeader from '../SideHeader'
import BackButton from '../BackButton'
import './index.css'

const NotFound = () => {
  const renderNotFound = () => (
    <div className="not-found-container">
      <BackButton />
      <div className="not-found-content">
        <img
          src="https://res.cloudinary.com/dywnwbcln/image/upload/v1727765135/spotify_clone_images/chsubphppsnsy0vyknpm.png"
          alt="page not found"
          className="not-found-img"
        />
        <h1 className="not-found-heading">PAGE NOT FOUND</h1>
        <Link to="/">
          <button type="button">Home Page</button>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* <div className="mobile-view">
        <div className="not-found-bg">{renderNotFound()}</div>
      </div> */}
      <div className="desktop-view">
        <SideHeader />
        <div className="not-found-bg">{renderNotFound()}</div>
      </div>
    </>
  )
}

export default withRouter(NotFound)
