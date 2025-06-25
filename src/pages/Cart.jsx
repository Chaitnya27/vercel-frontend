import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";





const Cart = () => {
 const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("userId");

  if (!user || !token) {
    alert("Please login to place an order");
    return;
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  console.log("DEBUG totalAmount:", total); // ✅ check this in console

  try {
    const res = await axios.post(
      "http://localhost:5000/api/orders",
      {
        user,
        items: cartItems,
        totalAmount: total  // ✅ name must match backend schema
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Order placed successfully!");
    clearCart();
  } catch (err) {
    console.error("Checkout error:", err.response?.data || err.message);
    alert("Checkout failed");
  }
};



  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map(item => (
            <div key={item._id} className="flex items-center justify-between border rounded p-4 shadow">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded bg-white" />
              <div className="flex-1 ml-4">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500">₹{item.price}</p>
                <div className="flex items-center mt-2 gap-2">
                  <button
                    onClick={() => updateQuantity(item._id, -1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >−</button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >+</button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right text-xl font-bold">
            Total: ₹{total}
          </div>
          
          <button onClick={handleCheckout}
          className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700">
            Proceed to Checkout</button>

          
        </div>
      )}
    </div>
  );
};

export default Cart;
