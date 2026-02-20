import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">

      <h1
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        🛒 MarketPlace
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Home
        </button>

        <button
          onClick={() => navigate("/favorites")}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Favorites
        </button>

        {token ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}