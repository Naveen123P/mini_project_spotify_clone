import {Component} from 'react'
import './index.css'

class CategoryItems extends Component {
  render() {
    const {details} = this.props
    return (
      <li className="row-flex desktop-flex">
        <img src={details.images[0].url} alt="abs" className="playlist-img1" />
        <div>
          <h1 className="category-playlist-heading">{details.name}</h1>
          <p className="category-playlist-para">
            Total tracks {details.tracks.total}
          </p>
        </div>
      </li>
    )
  }
}

export default CategoryItems
