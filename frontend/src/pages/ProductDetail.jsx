import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleFavorite = async () => {
    try {
      await API.post(`/user/favorite/${id}`);
      alert("Updated ❤️");
    } catch (err) {
      alert("Login required");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">

        {/* Image Section */}
        <div className="md:w-1/2 relative h-80 md:h-auto">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 p-8 flex flex-col">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
              {product.title}
            </h2>
          </div>

          <p className="text-gray-600 mt-4 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6">
            <span className="text-4xl font-extrabold text-blue-600">
              ₹{product.price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={toggleFavorite}
              className="flex-1 bg-red-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-red-600 active:scale-95 transition flex items-center justify-center gap-2"
            >
              <span>❤️</span> Favorite
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-bold hover:bg-gray-300 active:scale-95 transition"
            >
              Back Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}