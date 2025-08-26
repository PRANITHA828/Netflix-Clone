import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard";
import FailureView from "../components/FailureView";

export default function Popular() {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const fetchPopular = async () => {
    setLoading(true);
    setFailed(false);
    const token = Cookies.get("jwt_token");
    try {
      const res = await fetch("https://apis.ccbp.in/movies-app/popular-movies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPopular(data.results);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopular();
  }, []);

  if (loading) return <Loader />;
  if (failed) return <FailureView onRetry={fetchPopular} />;

  return (
    <>
      <Header />
      <div className="bg-black text-white p-6 min-h-screen px-4 sm:px-8 md:px-16 lg:px-40">
        <div className="grid sm:grid-cols-3 lg:grid-cols-5 md:grid-cols-4  mt-20 gap-4">
          {popular.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
