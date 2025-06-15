// pages/ProcurementForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Procurement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    product_id: '',
    quantity: '',
    supplier: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/inventory/');
        setProducts(res.data);
      } catch (err) {
        setError('⚠️ Failed to load inventory items.');
      }
    };

    fetchProducts();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Submit procurement
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('http://localhost:8000/api/procurement/', formData);
      setMessage(res.data.message || '✅ Procurement successful.');
      setFormData({ product_id: '', quantity: '', supplier: '' });
    } catch (err) {
      const errMsg = err.response?.data?.error || '❌ Procurement failed. Please check your input.';
      setError(errMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 p-6 transition-colors">
      <div className="w-full max-w-2xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-300 mb-6">Procurement Form</h1>

        {message && (
          <div className="mb-4 text-green-700 bg-green-100 p-3 rounded dark:bg-green-900">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 text-red-700 bg-red-100 p-3 rounded dark:bg-red-900">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Select */}
          <div>
            <label className="block mb-2 font-semibold">Select Product</label>
            <select
  name="product_id"
  value={formData.product_id}
  onChange={handleChange}
  className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
  required
>
  <option value="">-- Choose a product --</option>
  {products.length > 0 ? (
    products.map((product) => (
      <option key={product.id} value={product.id}>
        {product.name} ({product.stock} in stock)
      </option>
    ))
  ) : (
    <option disabled>Loading...</option>
  )}
</select>

          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-2 font-semibold">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              min="1"
            />
          </div>

          {/* Supplier */}
          <div>
            <label className="block mb-2 font-semibold">Supplier</label>
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              required
              placeholder="e.g. ABC Suppliers Ltd"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
          >
            Submit Procurement
          </button>
        </form>
      </div>
    </div>
  );
};

export default Procurement;
