import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import PopularMovieItem from '../PopularMovieItem'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
let responseData = []
let noOfPages
let showPage = 1

class Popular extends Component {
  state = {
    popularMoviesList: [],
    pageData: 12,
    apiStatus: apiStatusConstants.initial,
    prevPageBtn: true,
    nextPageBtn: false,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    const {pageData} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/movies-app/popular-movies`
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
      responseData = updatedData

      this.setState({
        popularMoviesList: responseData.slice(0, pageData),
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updatePopularMoviesList = isNextPage => {
    const addition = 12
    const {pageData} = this.state
    const newPage = isNextPage ? pageData + addition : pageData - addition

    if (isNextPage) {
      this.setState({
        prevPageBtn: false,
      })
      showPage += 1
      if (newPage >= responseData.length) {
        this.setState({nextPageBtn: true})
      }
    } else {
      this.setState({
        nextPageBtn: false,
      })
      showPage -= 1
      if (newPage - addition <= 0) {
        this.setState({prevPageBtn: true})
      }
    }
    this.setState({
      popularMoviesList: responseData.slice(newPage - addition, newPage),
      pageData: newPage,
    })
  }

  nextPage = () => this.updatePopularMoviesList(true)

  prevPage = () => this.updatePopularMoviesList(false)

  renderPopularMoviesView = () => {
    const {popularMoviesList, prevPageBtn, nextPageBtn} = this.state
    noOfPages = Math.ceil(responseData.length / 12)

    return (
      <div className="popular-success-container">
        <ul className="popular-unorder-list">
          {popularMoviesList.map(eachMovie => (
            <PopularMovieItem movieDetails={eachMovie} key={eachMovie.id} />
          ))}
        </ul>
        <div className="pagination-container">
          <button
            type="button"
            onClick={this.prevPage}
            disabled={prevPageBtn}
            className="arrow-btn"
          >
            <IoIosArrowBack />
          </button>
          <p className="of-pagedata">
            {showPage} of {noOfPages}
          </p>
          <button
            type="button"
            onClick={this.nextPage}
            disabled={nextPageBtn}
            className="arrow-btn"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="popular-loading-container">
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPopularMoviesView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-container">
        <Header />
        {this.renderApiStatus()}
        <Footer />
      </div>
    )
  }
}

export default Popular
