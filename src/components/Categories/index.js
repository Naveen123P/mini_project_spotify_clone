import {Component} from 'react'
import Cookies from 'js-cookie'
import LoaderRoute from '../LoaderRoute'
import FailureView from '../FailureView'
import CategoryListItem from '../CategoryListItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Categories extends Component {
  state = {
    categoriesApiStatus: apiStatusConstants.initial,
    categories: [],
  }

  componentDidMount() {
    this.getCategories()
  }

  categoriesFormattedData = data => ({
    id: data.id,
    name: data.name,
    image: data.icons[0].url,
  })

  getCategories = async () => {
    this.setState({
      categoriesApiStatus: apiStatusConstants.inProgress,
    })
    const token = Cookies.get('jwt_token')
    const url = 'https://apis2.ccbp.in/spotify-clone/categories'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.categories.items.map(each =>
        this.categoriesFormattedData(each),
      )
      this.setState({
        categoriesApiStatus: apiStatusConstants.success,
        categories: updatedData,
      })
    } else {
      this.setState({categoriesApiStatus: apiStatusConstants.failure})
    }
  }

  renderCategoriesRetrySuccessView = () => {
    const {categories} = this.state
    return (
      <>
        <ul className="playlist-ul">
          {categories.map(each => (
            <CategoryListItem key={each.id} details={each} />
          ))}
        </ul>
      </>
    )
  }

  categoriesRetry = () => {
    this.getCategories()
  }

  getAllCategoriesApiStatus = () => {
    const {categoriesApiStatus} = this.state
    switch (categoriesApiStatus) {
      case apiStatusConstants.inProgress:
        return <LoaderRoute />
      case apiStatusConstants.success:
        return this.renderCategoriesRetrySuccessView()
      case apiStatusConstants.failure:
        return <FailureView retry={this.categoriesRetry} />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="playlist-container">
        <h1 className="playlist-title">Categories</h1>
        {this.getAllCategoriesApiStatus()}
      </div>
    )
  }
}

export default Categories
