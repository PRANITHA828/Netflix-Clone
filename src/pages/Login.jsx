// src/components/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
      e.preventDefault();

    const userDetails = { username, password };
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    const response = await fetch("https://apis.ccbp.in/login", options);
    const data = await response.json();

    if (response.ok) {
      Cookies.set("jwt_token", data.jwt_token, { expires: 7 });
      Cookies.set('username', username)
      navigate("/");
    } else {
      setErrorMsg(data.error_msg);
    }
  };

  return (
    <div
  className="min-h-screen flex items-center justify-center px-4 sm:px-8 bg-black sm:bg-cover sm:bg-center"
  style={{
    backgroundImage:
      "url('https://res.cloudinary.com/dcika1gku/image/upload/v1751711666/netfilx_1_mbxgd1.png')",
  }}
>
  {/* Logo */}
  <img
    className="absolute top-6 left-6 sm:top-10 sm:left-20 w-20 sm:w-24 md:w-32 xl:w-48"
    src="https://res.cloudinary.com/dcika1gku/image/upload/v1752308579/Group_7399_mipxgb.png"
    alt="logo"
  />

  {/* Form */}
  <form
    onSubmit={handleLogin}
    className="bg-zinc-900/90 sm:bg-zinc-900/70 p-6 sm:p-8 md:p-10 rounded-lg w-full max-w-sm sm:max-w-md text-white z-10"
  >
    <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
      Login
    </h1>

    <label className="block mb-2 text-sm sm:text-base">USERNAME</label>
    <input
      type="text"
      className="w-full p-2 sm:p-3 rounded bg-zinc-800 border border-gray-700 mb-4"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />

    <label className="block mb-2 text-sm sm:text-base">PASSWORD</label>
    <input
      type="password"
      className="w-full p-2 sm:p-3 rounded bg-zinc-800 border border-gray-700 mb-4"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    {errorMsg && <p className="text-red-500 text-sm mb-4">{errorMsg}</p>}

    <button
      type="submit"
      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 sm:py-3 rounded"
    >
      Login
    </button>
  </form>
</div>

  );
}
