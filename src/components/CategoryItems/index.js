import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class CategoryItems extends Component {
  render() {
    const {details} = this.props
    return (
      <li className="desktop-flex">
        <Link
          to={`/playlist/${details.id}`}
          className=" row-flex-category-item desktop-flex link-item"
        >
          <img
            src={details.images[0].url}
            alt="abs"
            className="playlist-img1"
          />
          <div>
            <h1 className="category-playlist-heading">{details.name}</h1>
            <p className="category-playlist-para">
              {details.tracks.total} Tracks
            </p>
          </div>
        </Link>
      </li>
    )
  }
}

export default CategoryItems
