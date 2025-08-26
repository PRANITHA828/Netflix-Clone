// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import Search from "./pages/Search";
import Account from "./pages/Account";
import MovieDetails from "./pages/MovieDetails";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './App.css' 


export default function App() {
  const token = Cookies.get("jwt_token");

  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<ProtectedRoute element={<Home />} />}
        />
        <Route
          path="/popular"
          element={<ProtectedRoute element={<Popular />} />}
        />
        <Route
          path="/search"
          element={<ProtectedRoute element={<Search />} />}
        />
        <Route
          path="/account"
          element={<ProtectedRoute element={<Account />} />}
        />
        <Route
          path="/movies/:id"
          element={<ProtectedRoute element={<MovieDetails />} />}
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    
  );
}
