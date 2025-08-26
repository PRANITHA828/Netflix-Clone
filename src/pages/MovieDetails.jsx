import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Header from '../components/Header'
import Loader from '../components/Loader'
import FailureView from '../components/FailureView'
import MovieCard from '../components/MovieCard'

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchMovie = async () => {
    setLoading(true)
    setError(false)
    const jwtToken = Cookies.get('jwt_token')

    try {
      const res = await fetch(`https://apis.ccbp.in/movies-app/movies/${id}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setMovie(data.movie_details)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovie()
  }, [id])

  if (loading) return <Loader />
  if (error) return <FailureView onRetry={fetchMovie} />
  if (!movie) return null

  const {
    title,
    overview,
    backdrop_path,
    genres = [],
    spoken_languages = [],
    runtime = 0,
    adult,
    release_date = '',
    budget = 0,
    vote_average = 0,
    vote_count = 0,
    similar_movies = [],
  } = movie

  const convertTime = min => `${Math.floor(min / 60)}h ${min % 60}m`
  const rating = adult ? 'A' : 'U/A'

  return (
    <>
      <Header />
      <div className="bg-black text-white min-h-screen font-sans">
        {/* Hero Section */}
        <div
          className="bg-cover bg-center h-[80vh] md:h-[100vh] relative flex items-end px-4 sm:px-8 md:px-16 lg:px-40 py-12"
          style={{ backgroundImage: `url(${backdrop_path})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">{title}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-300">
              <span>{convertTime(runtime)}</span>
              <span className="border px-1 rounded border-gray-400 text-xs">{rating}</span>
              <span>{release_date.slice(0, 4)}</span>
            </div>
            <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">{overview}</p>
            <button className="mt-6 bg-white text-black px-4 py-2 sm:px-5 sm:py-2 rounded font-semibold hover:bg-gray-200">
              Play
            </button>
          </div>
        </div>

        {/* Movie Info */}
        <div className="px-4 sm:px-8 md:px-16 lg:px-40 py-6 space-y-6">
          <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 text-sm">
            <div>
              <h2 className="text-gray-400 mb-1">Genres</h2>
              <p>{genres.map(gen => gen.name).join(', ') || 'N/A'}</p>
            </div>
            <div>
              <h2 className="text-gray-400 mb-1">Audio Available</h2>
              <p>{spoken_languages.map(lang => lang.english_name).join(', ') || 'N/A'}</p>
            </div>
            <div>
              <h2 className="text-gray-400 mb-1">Rating Count</h2>
              <p>{vote_count.toLocaleString()}</p>
            </div>
            <div>
              <h2 className="text-gray-400 mb-1">Budget</h2>
              <p>{budget ? `${budget.toLocaleString()} Crores` : 'N/A'}</p>
            </div>
            <div>
              <h2 className="text-gray-400 mb-1">Rating Average</h2>
              <p>{vote_average} ⭐</p>
            </div>
            <div>
              <h2 className="text-gray-400 mb-1">Release Date</h2>
              <p>{release_date}</p>
            </div>
          </div>

          {/* More Like This */}
          <div className="mt-12">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">More like this</h2>
            <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {similar_movies.length > 0 ? (
                similar_movies.map(movie => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    posterPath={movie.poster_path}
                  />
                ))
              ) : (
                <p>No similar movies found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
