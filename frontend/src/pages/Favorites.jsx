import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Favorites() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    API.get("/auth/me")
      .then((res) => {
        setProducts(res.data.favorites);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch favorites error:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <div className="p-6 text-center">Loading your favorites...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
          <span className="text-red-500">❤️</span> My Favorites
        </h2>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <p className="text-gray-500 text-xl font-medium">No favorites yet</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-1 mb-1">
                    {p.title}
                  </h3>
                  <p className="text-blue-600 font-extrabold text-xl mb-4">
                    ₹{p.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => navigate(`/product/${p._id}`)}
                    className="mt-auto w-full bg-gray-900 text-white py-2 rounded-xl font-semibold hover:bg-gray-800 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}