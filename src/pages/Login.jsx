import { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; 

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUserId } = useCart();

   const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

if (!formData.email || !formData.password) {
    alert("All fields are required");
    return;
  }
  
  try {
    const res = await axios.post("http://localhost:5000/api/users/login", formData);

    sessionStorage.setItem("token", res.data.token);
    sessionStorage.setItem("userId", res.data._id);
    setUserId(res.data._id); 

    // ✅ Initialize per-user cart if not already present
    const existingCart = sessionStorage.getItem(`cart_${res.data._id}`);
    if (!existingCart) {
      sessionStorage.setItem(`cart_${res.data._id}`, JSON.stringify([]));
    }

    alert("Login successful");
    navigate("/products"); 
  } catch (err) {
    console.error("Login failed", err);
    alert("Login failed. Please check your credentials.");
  }
};


   return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center bg-blue-100"
      

    >
      <div className="bg-gray-100 hover:shadow-2xl hover:shadow-black bg-opacity-90 backdrop-blur-md p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-blue-600 hover:underline">
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
