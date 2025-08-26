import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cookies from "js-cookie";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1280, // large screens
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1024, // medium
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 768, // small tablets
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480, // mobiles
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
  ],
};

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [originals, setOriginals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    const headers = { Authorization: `Bearer ${token}` };

    const fetchData = async () => {
      try {
        const [trendRes, topRes, origRes] = await Promise.all([
          fetch("https://apis.ccbp.in/movies-app/trending-movies", { headers }),
          fetch("https://apis.ccbp.in/movies-app/top-rated-movies", { headers }),
          fetch("https://apis.ccbp.in/movies-app/originals", { headers }),
        ]);

        if (!trendRes.ok || !origRes.ok || !topRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const trendData = await trendRes.json();
        const origData = await origRes.json();
        const topData = await topRes.json();

        setTrending(trendData.results);
        setOriginals(origData.results);
        setTopRated(topData.results);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-cover bg-no-repeat bg-center min-h-[90vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 text-white"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dcika1gku/image/upload/v1751711665/Image_ywkzpq.png')"
        }}
      >
        <Header />
        <div className="max-w-lg mt-10 md:mt-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Super Man</h1>
          <p className="text-base md:text-xl mb-4">
            Superman is a fictional superhero who first appeared in American comic books published by DC Comics.
          </p>
          <button className="bg-white text-black px-4 py-2 md:px-6 md:py-3 rounded hover:bg-black hover:text-white border border-white transition-colors duration-300">
            Play
          </button>
        </div>
      </div>

      {/* Movie Sections */}
      <div className="bg-black text-white px-4 sm:px-8 md:px-14 gap-4 lg:px-40 py-6">
        {/* Trending */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Trending Now</h1>
        <Slider  {...sliderSettings}>
          {trending.map((movie) => (
            <MovieCard key={movie.id} {...movie} posterPath={movie.poster_path} />
          ))}
        </Slider>
        
        

        {/* Top Rated */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mt-10 mb-4">Top Rated</h1>
        <Slider {...sliderSettings}>
          {topRated.map((movie) => (
            <MovieCard key={movie.id} {...movie} posterPath={movie.poster_path} />
          ))}
        </Slider>

        {/* Originals */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mt-10 mb-4">Originals</h1>
        <Slider {...sliderSettings}>
          {originals.map((movie) => (
            <MovieCard key={movie.id} {...movie} posterPath={movie.poster_path} />
          ))}
        </Slider>
      </div>

      <Footer />
    </>
  );
}
