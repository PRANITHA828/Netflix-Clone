import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Account() {
  const navigate = useNavigate()

  const username = Cookies.get('username') || 'User'
  const password = '********'  

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    Cookies.remove('username')
    navigate('/login')
  }

  return (
    <>
      <Header />
      <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center p-6">
        <div className="bg-zinc-800 p-6 rounded max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">Account</h1>

          <div className="mb-4">
            <p className="text-sm text-gray-400">Username</p>
            <p className="text-lg">{username}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400">Password</p>
            <p className="text-lg">{password}</p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 w-full py-2 mt-4 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}
