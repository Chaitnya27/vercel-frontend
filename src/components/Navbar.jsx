import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { clearCart, setUserId } = useCart();

  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem(`cart_${userId}`);
    clearCart();
    setUserId(null);
    alert("Logged out successfully!");
    navigate("/login");
  };
return (
  <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white shadow-md p-4">
    <div className="flex justify-between items-center max-w-6xl mx-auto">
      <h1 className="text-xl font-bold">
        <Link to="/">MERN Store</Link>
      </h1>

      {/* Hamburger Button */}
      <button
        className="md:hidden text-white focus:outline-none text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6">
        <Link to="/products" className="hover:underline">Products</Link>
        {token ? (
          <>
            <Link to="/add-product" className="hover:underline">Add Product</Link>
            <Link to="/cart" className="hover:underline">Cart</Link>
            <Link to="/orders" className="hover:underline">My Orders</Link>
            <button onClick={handleLogout} className="hover:underline text-red-500">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline text-blue-400">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to="/cart" className="hover:underline">Cart</Link>
          </>
        )}
      </div>
    </div>

    {/* Mobile Menu */}
    {isOpen && (
      <div className="md:hidden mt-4 flex flex-col space-y-4 px-4">
        <Link to="/products" className="hover:underline" onClick={() => setIsOpen(false)}>Products</Link>
        {token ? (
          <>
            <Link to="/add-product" className="hover:underline" onClick={() => setIsOpen(false)}>Add Product</Link>
            <Link to="/cart" className="hover:underline" onClick={() => setIsOpen(false)}>Cart</Link>
            <Link to="/orders" className="hover:underline" onClick={() => setIsOpen(false)}>My Orders</Link>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="hover:underline text-red-500 text-left"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline text-blue-400" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/register" className="hover:underline" onClick={() => setIsOpen(false)}>Register</Link>
            <Link to="/cart" className="hover:underline" onClick={() => setIsOpen(false)}>Cart</Link>
          </>
        )}
      </div>
    )}
  </nav>
);

};

export default Navbar;
