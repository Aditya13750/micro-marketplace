import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null); // 🔹 Store user data
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const navigate = useNavigate();

  // 🔹 Fetch products
  const fetchProducts = async () => {
    try {
      console.log(`🔍 Fetching products: search="${search}", page=${page}`);
      const res = await API.get(
        `/products?search=${search}&page=${page}&limit=6`
      );
      console.log("✅ Products fetched:", res.data.products.length);
      setProducts(res.data.products);
      setPages(res.data.pages);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    }
  };

  // 🔹 Fetch favorites (SAFE)
  const fetchFavorites = async () => {
    const token = localStorage.getItem("token");

    // 🚨 IMPORTANT: Don't call API if not logged in
    if (!token) {
      setUser(null);
      return;
    }

    try {
      console.log("👤 Fetching user data...");
      const res = await API.get("/auth/me");
      console.log("✅ User data received:", res.data.name);
      console.log("📋 Favorites list:", res.data.favorites.map(f => f._id || f));
      setUser(res.data);
      setFavorites(res.data.favorites.map((f) => f._id || f));
    } catch (err) {
      console.error("❌ Favorites/User error:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchFavorites();
  }, [search, page]);

  // 🔹 Toggle favorite
  const toggleFavorite = async (id) => {
    const token = localStorage.getItem("token");
    console.log("❤️ Toggle attempt for ID:", id);

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const res = await API.post(`/user/favorite/${id}`);
      console.log("✅ Toggle success. New favorites:", res.data);
      fetchFavorites(); // refresh UI
    } catch (err) {
      console.error("❌ Toggle error", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">

      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          {user ? `👋 Welcome back, ${user.name}!` : "🛒 Explore Products"}
        </h1>
        <p className="text-gray-600 mt-2">
          {user ? "Great to see you again! Check out our latest arrivals." : "Login to explore products and save your favorites!"}
        </p>
      </div>

      {/* SEARCH */}
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full p-4 rounded-xl shadow-md border focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* PRODUCTS */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 flex flex-col h-full"
            >
              <div className="relative group">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-56 w-full object-cover rounded-2xl shadow-inner"
                />
                <button
                  onClick={() => toggleFavorite(p._id)}
                  className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md text-2xl hover:scale-110 active:scale-95 transition"
                >
                  {favorites.some(favId => favId.toString() === p._id.toString()) ? "❤️" : "🤍"}
                </button>
              </div>

              <div className="mt-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                  {p.title}
                </h3>

                <p className="text-gray-600 mt-2 text-sm line-clamp-2 min-h-[2.5rem]">
                  {p.description}
                </p>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  <span className="text-2xl font-extrabold text-blue-600">
                    ₹{p.price.toLocaleString()}
                  </span>

                  <button
                    onClick={() => navigate(`/product/${p._id}`)}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:bg-blue-700 active:scale-95 transition duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center mt-10 gap-3 flex-wrap">
        {[...Array(pages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-lg ${page === i + 1
              ? "bg-blue-500 text-white"
              : "bg-white shadow"
              } hover:bg-blue-200 transition`}
          >
            {i + 1}
          </button>
        ))}
      </div>

    </div>
  );
}