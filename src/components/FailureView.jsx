export default function FailureView({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-white py-10">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="w-60"
      />
      <p className="text-xl mt-4">Something went wrong. Please try again</p>
      <button
        onClick={onRetry}
        className="bg-red-600 mt-4 px-6 py-2 rounded hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  );
}
