import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from 'react-loader-spinner'
import SliderItem from '../SliderItem'
import Header from '../Header'
// import Navbar from '../Navbar'
import Footer from '../Footer'
import './index.css'

const trendingApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const topRatedApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const originalsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  swipeToSlide: true,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {
    trendingMoviesList: [],
    topRatedMoviesList: [],
    originalsMoviesList: [],
    randomMovie: [],
    trendingApiStatus: trendingApiStatusConstants.initial,
    topRatedApiStatus: topRatedApiStatusConstants.initial,
    originalsApiStatus: originalsApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingMovies()
    this.getTopRatedMovies()
    this.getOriginalsMovies()
  }

  // getRelatedApiData

  getTrendingMovies = async () => {
    this.setState({trendingApiStatus: trendingApiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))

      this.setState({
        trendingMoviesList: updatedData,
        trendingApiStatus: trendingApiStatusConstants.success,
      })
    } else {
      this.setState({trendingApiStatus: trendingApiStatusConstants.failure})
    }
  }

  getTopRatedMovies = async () => {
    this.setState({topRatedApiStatus: topRatedApiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/top-rated-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))

      this.setState({
        topRatedMoviesList: updatedData,
        topRatedApiStatus: topRatedApiStatusConstants.success,
      })
    } else {
      this.setState({topRatedApiStatus: topRatedApiStatusConstants.failure})
    }
  }

  getOriginalsMovies = async () => {
    this.setState({originalsApiStatus: originalsApiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      const randomNumber = Math.floor(Math.random() * updatedData.length)
      const randomMovie = updatedData[randomNumber]
      this.setState({
        originalsMoviesList: updatedData,
        originalsApiStatus: originalsApiStatusConstants.success,
        randomMovie,
      })
    } else {
      this.setState({originalsApiStatus: originalsApiStatusConstants.failure})
    }
  }

  // loaderView

  renderPosterLoadingView = () => (
    <>
      <Header />
      <div className="poster-loader-bg-container">
        <div className="loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </>
  )

  renderTrendingLoadingView = () => (
    <div className="loader-bg-container">
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  renderTopRatedLoadingView = () => (
    <div className="loader-bg-container">
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  renderOriginalsLoadingView = () => (
    <div className="loader-bg-container">
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  // successView

  renderPosterSuccessView = () => {
    const {randomMovie} = this.state
    const {title, overview, posterPath} = randomMovie
    return (
      <div
        className="poster-container"
        style={{backgroundImage: `url(${posterPath})`}}
      >
        <Header />
        <div className="poster-details-container1">
          <h1 className="poster-title">{title}</h1>
          <p className="poster-overview">{overview}</p>
          <button type="button" className="play-btn">
            Play
          </button>
        </div>
      </div>
    )
  }

  renderTrendingMoviesView = () => {
    const {trendingMoviesList} = this.state

    return (
      <div className="slider-container">
        <Slider {...settings}>
          {trendingMoviesList.map(eachMovie => (
            <SliderItem sliderItemDetails={eachMovie} key={eachMovie.id} />
          ))}
        </Slider>
      </div>
    )
  }

  renderTopRatedMoviesView = () => {
    const {topRatedMoviesList} = this.state

    return (
      <div className="slider-container">
        <Slider {...settings}>
          {topRatedMoviesList.map(eachMovie => (
            <SliderItem sliderItemDetails={eachMovie} key={eachMovie.id} />
          ))}
        </Slider>
      </div>
    )
  }

  renderOriginalsMoviesView = () => {
    const {originalsMoviesList} = this.state

    return (
      <div className="slider-container">
        <Slider {...settings}>
          {originalsMoviesList.map(eachMovie => (
            <SliderItem sliderItemDetails={eachMovie} key={eachMovie.id} />
          ))}
        </Slider>
      </div>
    )
  }

  // renderApiStatus

  renderRandomImageApiStatus = () => {
    const {originalsApiStatus} = this.state

    switch (originalsApiStatus) {
      case originalsApiStatusConstants.success:
        return this.renderPosterSuccessView()
      case originalsApiStatusConstants.failure:
        return this.renderPosterFailureView()
      case originalsApiStatusConstants.inProgress:
        return this.renderPosterLoadingView()
      default:
        return null
    }
  }

  renderTrendingApiStatus = () => {
    const {trendingApiStatus} = this.state

    switch (trendingApiStatus) {
      case trendingApiStatusConstants.success:
        return this.renderTrendingMoviesView()
      case trendingApiStatusConstants.failure:
        return this.renderTrendingFailureView()
      case trendingApiStatusConstants.inProgress:
        return this.renderTrendingLoadingView()
      default:
        return null
    }
  }

  renderTopRatedApiStatus = () => {
    const {topRatedApiStatus} = this.state

    switch (topRatedApiStatus) {
      case topRatedApiStatusConstants.success:
        return this.renderTopRatedMoviesView()
      case topRatedApiStatusConstants.failure:
        return this.renderTopRatedFailureView()
      case topRatedApiStatusConstants.inProgress:
        return this.renderTopRatedLoadingView()
      default:
        return null
    }
  }

  renderOriginalsApiStatus = () => {
    const {originalsApiStatus} = this.state

    switch (originalsApiStatus) {
      case originalsApiStatusConstants.success:
        return this.renderOriginalsMoviesView()
      case originalsApiStatusConstants.failure:
        return this.renderOriginalsFailureView()
      case originalsApiStatusConstants.inProgress:
        return this.renderOriginalsLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-bg-container">
        <div>{this.renderRandomImageApiStatus()}</div>
        <div className="trend-container">
          <h1 className="movies-list-heading">Trending</h1>
          {this.renderTrendingApiStatus()}
        </div>
        <div>
          <h1 className="movies-list-heading">Top Rated</h1>
          {this.renderTopRatedApiStatus()}
        </div>
        <div>
          <h1 className="movies-list-heading">Originals</h1>
          {this.renderOriginalsApiStatus()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
