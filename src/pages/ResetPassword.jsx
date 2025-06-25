import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if(newPassword.length < 6 ){
      return alert("Password should have minimum 7 character");
    }
    try {
      await axios.post(`http://vercel-backend-obu7.onrender.com/api/users/reset-password/${token}`, {
        newPassword,
      });
      alert("✅ Password reset successful! Please login.");
      console.log("ResetPassword component mounted. Token:", token);

      navigate("/login");
    } catch (err) {
      console.error("Reset failed:", err.response?.data || err.message);
      alert("Password reset failed. Token may be expired or invalid.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
      <form onSubmit={handleReset} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
