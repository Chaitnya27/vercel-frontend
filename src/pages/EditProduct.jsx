import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    image: "",
    description: ""
  });

  useEffect(() => {
  axios.get(`https://vercel-backend-obu7.onrender.com/api/products/${id}`)
    .then(res => setFormData(res.data))
    .catch(err => {
      alert("Error loading product");
      console.error(err);
    });
}, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://vercel-backend-obu7.onrender.com/api/products/${id}`, formData, {
  headers: {
   Authorization: `Bearer ${sessionStorage.getItem("token")}`

  }
});
      alert("Product updated!");
      navigate("/products");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input className="p-2 border rounded" name="name" value={formData.name} onChange={handleChange} required />
        <input className="p-2 border rounded" name="brand" value={formData.brand} onChange={handleChange} />
        <input className="p-2 border rounded" name="category" value={formData.category} onChange={handleChange} />
        <input className="p-2 border rounded" name="price" type="number" value={formData.price} onChange={handleChange} required />
        <input className="p-2 border rounded" name="image" value={formData.image} onChange={handleChange} />
        <textarea className="p-2 border rounded" name="description" rows={3} value={formData.description} onChange={handleChange}></textarea>
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
