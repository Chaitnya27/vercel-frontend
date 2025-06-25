import { useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    image: "",
    description: ""
  });

  const navigate = useNavigate();

   useEffect(() => {
   const token = sessionStorage.getItem("token");


    if (!token) {
      alert("Please login to add a product.");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

  const userId = sessionStorage.getItem("userId");

    try {
      await axios.post("http://localhost:5000/api/products", { ...formData,user:userId} ,
        {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      alert("Product added successfully!");
      navigate("/products");
    } catch (err) {
      alert("Error adding product");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input className="p-2 border rounded" type="text" name="name" placeholder="Product Name" onChange={handleChange} required />
        <input className="p-2 border rounded" type="text" name="brand" placeholder="Brand" onChange={handleChange} required />
        <input className="p-2 border rounded" type="text" name="category" placeholder="Category" onChange={handleChange} required />
        <input className="p-2 border rounded" name="price" placeholder="Price" type="number" onChange={handleChange} required />
        <input className="p-2 border rounded" name="image" placeholder="Image URL" onChange={handleChange} required />
        <textarea className="p-2 border rounded" type="text" name="description" placeholder="Description" onChange={handleChange} rows={3}></textarea>
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
