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
      <div className="login-page-bg-container">
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
              type="text"
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
    )
  }
}

export default LoginPage
