import {Link} from 'react-router-dom'

import './index.css'

const PlayListsItems = props => {
  const {details} = props
  const {id, image, name} = details
  const extractTitle = input => input.split(/[([\]]/)[0].trim()

  return (
    <li className="playlist-item">
      <Link to={`/playlist/${id}`} className="link-item">
        <img src={image} alt="featured playlist" className="playlist-img" />
        <p className="playlist-text">{extractTitle(name)}</p>
      </Link>
    </li>
  )
}

export default PlayListsItems
