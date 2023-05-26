import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', errorMsg: '', errorMsgStatus: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({errorMsg, errorMsgStatus: true})
  }

  onSubmitLoginDetails = async event => {
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

    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {errorMsg, errorMsgStatus} = this.state

    return (
      <>
        <div className="login-page-bg-container">
          <div className="app-logo-container">
            <img
              src="https://res.cloudinary.com/veerappa/image/upload/v1684172378/movies_app_logo_aykn91.svg"
              alt="movies-app-logo"
              className="movies-logo"
            />
          </div>
          <div className="login-container">
            <form
              className="login-form-container"
              onSubmit={this.onSubmitLoginDetails}
            >
              <h1 className="login-heading">Login</h1>
              <div className="user-name-container">
                <label htmlFor="username" className="username">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  className="user-name-input"
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="user-name-container">
                <label htmlFor="password" className="username">
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  className="user-name-input"
                  onChange={this.onChangePassword}
                />
                {errorMsgStatus && <p className="error-msg">{errorMsg}</p>}
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="mobile-login-page-container">
          <img
            src="https://res.cloudinary.com/veerappa/image/upload/v1684172378/movies_app_logo_aykn91.svg"
            alt="movies-app-logo"
            className="mob-app-logo"
          />
          <div className="mobile-login-form">
            <form
              className="mob-login-form-container"
              onSubmit={this.onSubmitLoginDetails}
            >
              <h1 className="mob-login-heading">Login</h1>
              <div className="mobile-username-container">
                <label htmlFor="username" className="username">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  className="user-name-input"
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="mobile-username-container">
                <label htmlFor="password" className="username">
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  className="user-name-input"
                  onChange={this.onChangePassword}
                />
                {errorMsgStatus && <p className="error-msg">{errorMsg}</p>}
              </div>
              <button type="submit" className="mob-login-button">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default LoginPage
