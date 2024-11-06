import {useHistory} from 'react-router-dom'
import './index.css'

const BackButton = () => {
  const history = useHistory()
  const goBack = () => {
    history.goBack()
  }
  return (
    <div className="back-button-bg">
      <button onClick={goBack} type="button" className="back-button back-text">
        <img
          src="https://res.cloudinary.com/dywnwbcln/image/upload/v1727765132/spotify_clone_images/dzgsovgiz3omwcgxtzsb.png"
          alt="back arrow"
          className="back-arrow"
        />
        {/* Back */}
        <p className="back-text">Back</p>
      </button>
    </div>
  )
}

export default BackButton
