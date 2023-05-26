import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineSearch, AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import PopularMovieItem from '../PopularMovieItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchResults extends Component {
  state = {
    searchInput: '',
    searchResultsMoviesList: [],
    apiStatus: apiStatusConstants.initial,
    showMenu: false,
  }

  clickMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  closeMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  getSearchResults = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        searchResultsMoviesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderLoadingView = () => (
    <div className="nav-color">
      <div className="movie-details-loader-container">
        <div className="loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </div>
  )

  renderSearchMoviesView = () => {
    const {searchResultsMoviesList, searchInput} = this.state
    return (
      <>
        {searchResultsMoviesList.length > 0 ? (
          <div className="search-results-container">
            <ul className="search-unorder-list">
              {searchResultsMoviesList.map(eachMovie => (
                <PopularMovieItem movieDetails={eachMovie} key={eachMovie.id} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="no-results-container">
            <img
              src="https://res.cloudinary.com/veerappa/image/upload/v1684512642/no_search_svg_jhnsis.svg"
              alt="no resulst"
              className="no-result-image"
            />
            <p className="no-results-description">
              Your Search for {searchInput} did not find any matches
            </p>
          </div>
        )}
      </>
    )
  }

  onEnterSearchText = event => {
    if (event.key === 'Enter') {
      this.getSearchResults()
    }
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSearchMoviesView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {showMenu} = this.state
    return (
      <div className="search-results-bg-container">
        <div className="header-container search-header">
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
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchText}
              />
              <AiOutlineSearch
                color="#fff"
                size={18}
                className="search-icon-btn"
                onClick={this.getSearchResults}
              />
            </div>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660573232/Avatar_giy0y5.png"
                alt="profile"
                className="profile-img search-account"
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
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchText}
              />
              <AiOutlineSearch
                color="#fff"
                size={18}
                className="search-icon-btn"
                onClick={this.getSearchResults}
              />
            </div>
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
        {this.renderApiStatus()}
      </div>
    )
  }
}

export default SearchResults
