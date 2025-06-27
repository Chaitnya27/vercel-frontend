import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();
  const currentUserId = sessionStorage.getItem("userId");

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`https:/vercel-backend-obu7.onrender.com/api/products?search=${search}`);
      setProducts(res.data);
    } catch (err) {
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure?");
  if (!confirmDelete) return;

  try {
    const token = sessionStorage.getItem("token"); // ✅ get the token

    await axios.delete(`https://vercel-backend-obu7.onrender.com/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}` // ✅ send token in Authorization header
      }
    });

    setProducts(products.filter(p => p._id !== id));
    alert("Product deleted successfully.");
  } catch (err) {
    console.error("Delete error:", err.response?.data || err.message);
    alert("Error deleting product");
  }
};


  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search by name ,brand or category.."
        className="mb-4 p-2 border rounded w-full sm:w-1/2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {products.map(product => (
          <div key={product._id} className="border p-4 rounded shadow relative hover:shadow-2xl hover:shadow-black">
            <img src={product.image} alt={product.name} className="w-full h-40 object-contain" />
            <h2 className="font-bold mt-2">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.brand}</p>
            <p className="text-green-600 font-semibold">₹{product.price}</p>
            <p className="text-sm">{product.description}</p>

            {currentUserId === product.user && (
              <>
                <Link to={`/edit/${product._id}`} className="absolute top-2 left-2 bg-white px-2 rounded text-blue-500">
                  Edit
                </Link>
                <button onClick={() => handleDelete(product._id)} className="absolute top-2 right-2 bg-white px-2 rounded text-red-500">
                  Delete
                </button>
              </>
            )}

            <button
              onClick={() => addToCart(product)}
              className="mt-3 bg-green-600 w-full py-1 text-white rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
