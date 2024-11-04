import './index.css'

const LoaderRoute = () => (
  <div data-testid="loader" className="loader-bg">
    <img
      src="https://res.cloudinary.com/dywnwbcln/image/upload/v1727765132/spotify_clone_images/mpneo2cl8efax4s6cwtm.png"
      alt="login website logo"
      className="website-login-logo"
    />
    <p className="loading-text">Loading...</p>
  </div>
)

export default LoaderRoute
