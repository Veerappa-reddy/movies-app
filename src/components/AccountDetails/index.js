import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {AiOutlineSearch, AiFillCloseCircle} from 'react-icons/ai'
import Footer from '../Footer'
import './index.css'

class AccountDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {showMenu: false}
  }

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  clickMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  closeMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  render() {
    const {showMenu} = this.state
    return (
      <div className="account-bg-container">
        <div className="header-container ">
          <div className="header-routes-container">
            <img
              src="https://res.cloudinary.com/veerappa/image/upload/v1684172378/movies_app_logo_aykn91.svg"
              alt="movies-app-logo"
              className="header-app-logo"
            />
            <ul className="header-unorder-list">
              <Link to="/" className="link">
                <li className="nav-heading">Home</li>
              </Link>
              <Link to="/popular" className="link">
                <li className="nav-heading">Popular</li>
              </Link>
            </ul>
          </div>
          <div className="search-profile-container">
            <Link to="/search">
              <AiOutlineSearch color="#fff" size={18} className="search-icon" />
            </Link>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660573232/Avatar_giy0y5.png"
                alt="profile"
                className="profile-img"
              />
            </Link>
          </div>
        </div>
        <div className="mobile-header-container">
          <img
            src="https://res.cloudinary.com/veerappa/image/upload/v1684172378/movies_app_logo_aykn91.svg"
            alt="app-logo"
            className="mobile-app-logo"
          />
          <div className="mob-search-container">
            <Link to="/search">
              <AiOutlineSearch color="#fff" className="search-icon" />
            </Link>
            <img
              src="https://res.cloudinary.com/veerappa/image/upload/v1684593948/menu_svg_x6rtt3.svg"
              alt="menu"
              className="mobile-menu"
              onClick={this.clickMenu}
            />
          </div>
        </div>
        {showMenu && (
          <ul className="mobile-header-list">
            <Link to="/" className="link">
              <li>Home</li>
            </Link>
            <Link to="/popular" className="link">
              <li>Popular</li>
            </Link>
            <Link to="/account" className="link">
              <li>Account</li>
            </Link>
            <AiFillCloseCircle
              className="close-icon"
              size={22}
              onClick={this.closeMenu}
            />
          </ul>
        )}
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
            <button
              type="button"
              className="logout-button"
              onClick={this.onLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

// const AccountDetails = props => {
//   const onLogout = () => {
//     const {history} = props
//     Cookies.remove('jwt_token')
//     history.replace('/login')
//   }

//   return (
//     <div className="account-bg-container">
//       <div className="header-container ">
//         <div className="header-routes-container">
//           <img
//             src="https://res.cloudinary.com/veerappa/image/upload/v1684172378/movies_app_logo_aykn91.svg"
//             alt="movies-app-logo"
//             className="header-app-logo"
//           />
//           <ul className="header-unorder-list">
//             <Link to="/" className="link">
//               <li className="nav-heading">Home</li>
//             </Link>
//             <Link to="/popular" className="link">
//               <li className="nav-heading">Popular</li>
//             </Link>
//           </ul>
//         </div>
//         <div className="search-profile-container">
//           <Link to="/search">
//             <AiOutlineSearch color="#fff" size={18} className="search-icon" />
//           </Link>
//           <Link to="/account">
//             <img
//               src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660573232/Avatar_giy0y5.png"
//               alt="profile"
//               className="profile-img"
//             />
//           </Link>
//         </div>
//       </div>
//       <div className="mobile-header-container">
//         <img
//           src="https://res.cloudinary.com/veerappa/image/upload/v1684172378/movies_app_logo_aykn91.svg"
//           alt="app-logo"
//           className="mobile-app-logo"
//         />
//         <div className="mob-search-container">
//           <Link to="/search">
//             <AiOutlineSearch color="#fff" className="search-icon" />
//           </Link>
//           <img
//             src="https://res.cloudinary.com/veerappa/image/upload/v1684593948/menu_svg_x6rtt3.svg"
//             alt="menu"
//             className="mobile-menu"
//             onClick={this.clickMenu}
//           />
//         </div>
//       </div>
//       {showMenu && (
//         <ul className="mobile-header-list">
//           <Link to="/" className="link">
//             <li>Home</li>
//           </Link>
//           <Link to="/popular" className="link">
//             <li>Popular</li>
//           </Link>
//           <Link to="/account" className="link">
//             <li>Account</li>
//           </Link>
//           <AiFillCloseCircle
//             className="close-icon"
//             size={22}
//             onClick={this.closeMenu}
//           />
//         </ul>
//       )}
//       <div className="account-details">
//         <h1 className="heading">Account</h1>
//         <hr className="hr-line" />
//         <div className="membership-container">
//           <h1 className="membership-heading">Member ship</h1>
//           <div className="mail-details">
//             <p className="mail">veerappareddy@567gmail.com</p>
//             <p className="password">Password : *********</p>
//           </div>
//         </div>
//         <hr className="hr-line" />
//         <div className="plan-details">
//           <h1 className="membership-heading">Plan Details</h1>
//           <p className="premium">Premium</p>
//           <p className="hd">Ultra HD</p>
//         </div>
//         <hr className="hr-line" />
//         <div className="logout-btn-container">
//           <button type="button" className="logout-button" onClick={onLogout}>
//             Logout
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }
export default withRouter(AccountDetails)
