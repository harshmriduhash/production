export default function NotFound() {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-gray-800 px-4">
        {/* Animated 404 Text */}
        <h1 className="text-9xl font-extrabold tracking-widest text-blue-500 animate-pulse">
          404
        </h1>
  
        {/* Subtitle */}
        <h2 className="text-2xl md:text-4xl font-semibold mt-4 animate-fade">
          Page Not Found
        </h2>
  
        {/* Description */}
        <p className="text-center text-sm md:text-base mt-4 max-w-lg">
          Oops! The page you’re looking for doesn’t exist. You may have mistyped the address or the page may have moved.
        </p>
  
        {/* Go Back Home Button */}
        <a
          href="/"
          className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Go Back Home
        </a>
      </div>
    );
  }
  