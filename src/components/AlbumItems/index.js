import {Link} from 'react-router-dom'

import './index.css'

const AlbumItems = props => {
  const {details} = props
  const {id, image, name} = details

  return (
    <li className="playlist-item">
      <Link to={`/album/${id}`} className="link-item">
        <img src={image} alt={name} className="playlist-img" />
        <p className="playlist-text">{name}</p>
      </Link>
    </li>
  )
}

export default AlbumItems
