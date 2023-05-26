import {Link} from 'react-router-dom'
import './index.css'

const SliderItem = props => {
  const {sliderItemDetails} = props
  const {backdropPath, title, id} = sliderItemDetails
  return (
    <Link to={`/movies/${id}`}>
      <div className="slider-item">
        <img src={backdropPath} alt={title} className="slider-item-image" />
      </div>
    </Link>
  )
}

export default SliderItem
