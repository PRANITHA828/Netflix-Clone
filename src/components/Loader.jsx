import ClipLoader from "react-spinners/ClipLoader";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <ClipLoader color="#E50914" size={60} speedMultiplier={0.8} />
    </div>
  );
}
