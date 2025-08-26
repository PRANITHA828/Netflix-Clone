import { useEffect, useState } from 'react'
import { HiOutlineSearch } from "react-icons/hi"
import Cookies from 'js-cookie'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import FailureView from '../components/FailureView'
import MovieCard from '../components/MovieCard'

export default function Search() {
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const onSearch = async (input) => {
    if (!input){ 
      setSearchResults([])
      return
    }
    setLoading(true)
    setError(false)

    const jwtToken = Cookies.get('jwt_token')
    try {
      const response = await fetch(
        `https://apis.ccbp.in/movies-app/movies-search?search=${input}`,
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      )

      if (!response.ok) throw new Error()

      const data = await response.json()
      setSearchResults(data.results)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  
  useEffect(() => {
    onSearch(searchInput)
  }, [searchInput])

  const handleKeyDown = e => {
    if (e.key === 'Enter') onSearch(searchInput)
  }


  return (
    <>
      <Header />
      <div className="bg-black   text-white px-6 mt-20 py-4 min-h-screen">
        <div className="flex justify-center items-center gap-4">
          <input
            type="search"
            placeholder="Search movies"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="p-2 text-white border-2 rounded w-[600px] h-15 "
          />
          <button
            onClick={() => onSearch(searchInput)}
            data-testid="searchButton"
            className="text-white hover:text-red-500"          >
            <HiOutlineSearch size={22} /> 
          </button>
        </div>

        {loading && <Loader />}
        {error && <FailureView onRetry={onSearch} />}

        {!loading && searchResults.length === 0 && searchInput && !error && (
          <div className="text-center mt-12">
            <img
              src="https://res.cloudinary.com/dcika1gku/image/upload/v1752678418/Group_7394_mhyt8i.png"
              alt="no movies"
              className="mx-auto w-100"
            />
            <p className="mt-4 text-lg">
              Your search for <span >{searchInput}</span>{' '}
              did not find any matches.
            </p>
          </div>
        )}

        {!loading && searchInput && searchResults.length > 0 && (
          <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
            {searchResults.map(movie => (
              <MovieCard key={movie.id} {...movie} posterPath={movie.poster_path} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
