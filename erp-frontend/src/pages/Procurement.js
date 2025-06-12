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

  useEffect(() => {
    axios.get('/api/inventory/')
      .then(res => setProducts(res.data))
      .catch(() => setError('⚠️ Failed to load inventory items.'));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('/procurement/', formData);
      setMessage(res.data.message);
      setFormData({ product_id: '', quantity: '', supplier: '' });
    } catch (err) {
      setError('❌ Procurement failed. Please check your input.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Procurement Form</h1>

        {message && <div className="mb-4 text-green-700 font-semibold bg-green-100 p-3 rounded">{message}</div>}
        {error && <div className="mb-4 text-red-600 font-semibold bg-red-100 p-3 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Select Product</label>
            <select
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">-- Choose a product --</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Supplier</label>
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. ABC Suppliers Ltd"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200"
          >
            Submit Procurement
          </button>
        </form>
      </div>
    </div>
  );
};

export default Procurement;
