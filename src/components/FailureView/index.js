import './index.css'

const FailureView = props => {
  const {retry} = props
  const onClickTryAgain = () => {
    retry()
  }
  return (
    <div className="failure-bg">
      <img
        src="https://res.cloudinary.com/dywnwbcln/image/upload/v1727765132/spotify_clone_images/q8ne0nmojlgj7h1wudqk.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        type="button"
        onClick={onClickTryAgain}
        className="try-again-button"
      >
        Try Again
      </button>
    </div>
  )
}

export default FailureView
