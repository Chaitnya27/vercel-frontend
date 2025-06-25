import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  

  const handleCheckout = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Please login to place an order");
      return;
    }
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/orders", {
        items: cartItems,
        totalAmount: total,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      alert("✅ Order placed successfully!");
      clearCart();
      // navigate("/my-orders"); // ✅ redirect to My Orders
    } catch (err) {
      console.error("Checkout error:", err.response?.data || err.message);
      alert("Checkout failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border p-4 rounded shadow"
              >
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x ₹{item.price}
                  </p>
                </div>
                <p className="font-semibold">
                  ₹{item.quantity * item.price}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right text-xl font-bold">
            Total: ₹{total}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleCheckout}
              className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
