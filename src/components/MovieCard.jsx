
import { Link } from 'react-router-dom'

export default function MovieCard({ id, title, posterPath }) {
  return (
    <Link to={`/movies/${id}`} data-testid="movieItem">
        <div className='hover:scale-105 sm:ml-5 md:ml-8 lg:ml-12 transition-transform duration-300'>
      <img
        src={posterPath}
        alt={title}
        className="w-full
            h-auto
            rounded-lg
            object-cover
            sm:h-[250px]    
            md:h-[300px]   
            lg:h-[350px]"
      />
      </div>
    </Link>
  )
}
