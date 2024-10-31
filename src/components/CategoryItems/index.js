import {Component} from 'react'
import './index.css'

class CategoryItems extends Component {
  render() {
    const {details} = this.props
    return (
      <li className="row-flex">
        <img src={details.images[0].url} alt="abs" className="playlist-img1" />
        <div>
          <h1>{details.name}</h1>
          <p>Total tracks {details.tracks.total}</p>
        </div>
      </li>
    )
  }
}

export default CategoryItems
