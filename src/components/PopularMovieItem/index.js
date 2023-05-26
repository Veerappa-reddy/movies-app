import {Link} from 'react-router-dom'
import './index.css'

const PopularMovieItem = props => {
  const {movieDetails} = props
  const {backdropPath, title, id} = movieDetails

  return (
    <Link to={`/movies/${id}`}>
      <li>
        <img src={backdropPath} alt={title} className="popular-item-image" />
      </li>
    </Link>
  )
}

export default PopularMovieItem
