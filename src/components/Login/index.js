import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 5})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showErrorMsg: true,
      errorMsg,
    })
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg">
        <div className="login-card">
          <img
            src="https://res.cloudinary.com/dywnwbcln/image/upload/v1727765132/spotify_clone_images/mpneo2cl8efax4s6cwtm.png"
            alt="login website logo"
            className="website-login-logo"
          />
          <h1 className="website-name">Spotify Remix</h1>
          <form onSubmit={this.onSubmitLoginForm}>
            <div className="input-container">
              <label htmlFor="username" className="label-text">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={this.onChangeUsername}
                className="login-input"
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label-text">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={this.onChangePassword}
                className="login-input"
              />
            </div>
            {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
            <div className="button-container">
              <button type="submit" className="submit-button">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
