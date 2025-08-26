import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useState } from "react"
import { HiOutlineSearch } from "react-icons/hi"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const logout = () => {
    Cookies.remove("jwt_token")
    navigate("/login")
  }

  const handleSearchicon = () => {
    navigate("/search")
  }

  return (
    <header className="bg-black/40 fixed top-0 left-0 w-full z-50 text-white px-4 sm:px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Logo and Nav Links */}
        <div className="flex items-center space-x-6">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dcika1gku/image/upload/v1752308579/Group_7399_mipxgb.png"
              alt="Home"
              className="w-24"
            />
          </Link>

          {/* Nav Links - visible on large screens */}
          <div className="md:block lg:flex space-x-6 items-center text-white text-lg">
            <Link to="/" className="hover:text-red-500">Home</Link>
            <Link to="/popular" className="hover:text-red-500">Popular</Link>
          </div>
        </div>

        {/* Right: Search, Profile, Logout, Hamburger */}
        <div className="flex items-center space-x-4">
          <button
            data-testid="searchButton"
            onClick={handleSearchicon}
            className="text-white hover:text-red-500"
          >
            <HiOutlineSearch size={22} />
          </button>

          <Link to="/account">
            <img
              src="https://res.cloudinary.com/dcika1gku/image/upload/v1752312906/Avatar_szyzt0.png"
              alt="profile"
              className="w-9 h-9 rounded-full border border-white"
            />
          </Link>

          <button
            onClick={logout}
            className="hidden lg:inline bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown for small screens */}
      {menuOpen && (
        <div className="lg:hidden bg-black/90 text-white px-4 py-2 mt-2 space-y-2 rounded shadow-md">
          <Link to="/" className="block hover:text-red-500">Home</Link>
          <Link to="/popular" className="block hover:text-red-500">Popular</Link>
          <button
            onClick={logout}
            className="block w-full text-left hover:text-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  )
}
