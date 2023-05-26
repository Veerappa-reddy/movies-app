import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {format} from 'date-fns'
import Header from '../Header'
import PopularMovieItem from '../PopularMovieItem'
import './index.css'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {movieDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getMovieItemDetails()
  }

  getMovieItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        genres: data.movie_details.genres.map(eachGenre => ({
          id: eachGenre.id,
          name: eachGenre.name,
        })),
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        similarMovies: data.movie_details.similar_movies.map(eachMovie => ({
          backdropPath: eachMovie.backdrop_path,
          id: eachMovie.id,
          posterPath: eachMovie.poster_path,
          title: eachMovie.title,
        })),
        spokenLanguages: data.movie_details.spoken_languages.map(each => ({
          id: each.id,
          englishName: each.english_name,
        })),
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      this.setState({
        movieDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="nav-color">
      <Header />
      <div className="movie-details-loader-container">
        <div className="loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </div>
  )

  renderMovieDetailsView = () => {
    const {movieDetails} = this.state
    const {
      adult,

      posterPath,
      title,
      releaseDate,
      runtime,
      overview,
      genres,
      spokenLanguages,
      voteCount,
      voteAverage,
      budget,
      similarMovies,
    } = movieDetails
    const inHours = Math.floor(runtime / 60)
    const inMinutes = Math.floor(runtime % 60)
    const runtimeFormat = `${inHours}h ${inMinutes}m`
    const certificateName = adult ? 'A' : 'U/A'
    const releaseYear = format(new Date(releaseDate), 'yyyy')
    const releaseDateFormat = format(new Date(releaseDate), 'do MMMM yyyy')

    return (
      <div className="movie-details-bg-container">
        <div
          style={{backgroundImage: `url(${posterPath})`}}
          className="movie-details-container"
        >
          <Header />
          <div className="movie-details">
            <h1 className="movie-tilte">{title}</h1>
            <div className="more-details">
              <h3 className="runtime-format">{runtimeFormat}</h3>
              <h3 className="sensor-certificate">{certificateName}</h3>
              <h3>{releaseYear}</h3>
            </div>
            <p className="movie-overview">{overview}</p>
            <button type="button" className="movie-play-btn">
              Play
            </button>
          </div>
        </div>
        <div className="other-details-container">
          <div className="genres-container">
            <h1 className="genre-heading">Genres</h1>
            <ul className="">
              {genres.map(each => (
                <p className="genre">{each.name}</p>
              ))}
            </ul>
          </div>
          <div className="genres-container">
            <h1 className="genre-heading">Audio Available</h1>
            <ul>
              {spokenLanguages.map(each => (
                <p className="genre">{each.englishName}</p>
              ))}
            </ul>
          </div>
          <div className="genres-container">
            <h1 className="genre-heading">Rating Count</h1>
            <p className="genre">{voteCount}</p>
            <h1 className="genre-heading">Rating Average</h1>
            <p className="genre">{voteAverage}</p>
          </div>
          <div className="genres-container">
            <h1 className="genre-heading">Budget</h1>
            <p>{budget}</p>
            <h1 className="genre-heading">Release Date</h1>
            <p>{releaseDateFormat}</p>
          </div>
        </div>
        <div className="similar-movies-bg-container">
          <h1 className="more-like-heading">More like this</h1>
          <ul className="similar-movies-unorderlist">
            {similarMovies.map(eachMovie => (
              <PopularMovieItem movieDetails={eachMovie} key={eachMovie.id} />
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMovieDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderApiStatus()}</>
  }
}

export default MovieItemDetails
