import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://vercel-backend-obu7.onrender.com/api/users/forgot-password", { email });
      setToken(res.data.token); // Simulate email with token
       setMessage(res.data.message);
    navigate(`/reset-password/${res.data.token}`);

    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Reset Paasword</button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      {token && (
        <div className="mt-2 text-sm text-gray-500 break-all">
          <strong>Simulated Reset URL:</strong><br />
          http://localhost:5173/reset-password/{token}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
