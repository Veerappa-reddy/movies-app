import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const AccountDetails = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="account-bg-container">
      <Header />
      <div className="account-details">
        <h1 className="heading">Account</h1>
        <hr className="hr-line" />
        <div className="membership-container">
          <h1 className="membership-heading">Member ship</h1>
          <div className="mail-details">
            <p className="mail">veerappareddy@567gmail.com</p>
            <p className="password">Password : *********</p>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="plan-details">
          <h1 className="membership-heading">Plan Details</h1>
          <p className="premium">Premium</p>
          <p className="hd">Ultra HD</p>
        </div>
        <hr className="hr-line" />
        <div className="logout-btn-container">
          <button type="button" className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default withRouter(AccountDetails)
