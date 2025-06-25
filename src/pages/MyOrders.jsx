import { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios.get("https://vercel-backend-obu7.onrender.com/api/orders/my-orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders placed yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="border p-4 rounded shadow">
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
              
              <p className="mt-2 font-semibold">Items:</p>
              <ul className="mt-2 space-y-2">
  {order.items.map(item => (
    <li key={item._id} className="flex items-center gap-4 border p-2 rounded">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-contain bg-white rounded"
      />
      <div>
        <p className="font-bold">{item.name}</p>
        <p className="text-sm text-gray-600">₹{item.price} × {item.quantity}</p>
      </div>
    </li>
  ))}
</ul>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
