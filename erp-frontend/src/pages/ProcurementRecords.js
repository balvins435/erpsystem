// pages/ProcurementRecords.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProcurementRecords = () => {
  const [procurements, setProcurements] = useState([]);
  const [message, setMessage] = useState('');

  const fetchProcurements = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/procurements/");
      setProcurements(response.data);
    } catch (error) {
      console.error("Failed to fetch procurements:", error);
    }
  };

  const handleReceive = async (id) => {
    try {
      await axios.post(`http://localhost:8000/api/procurements/${id}/receive/`);
      setMessage("✅ Marked as received and stock updated.");
      fetchProcurements();
    } catch {
      setMessage("❌ Failed to mark as received.");
    }
  };

  useEffect(() => {
    fetchProcurements();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">📦 Procurement Records</h2>
        {message && (
          <div className="mb-4 p-3 rounded bg-gray-100 dark:bg-gray-800 text-sm">
            {message}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Supplier</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {procurements.map((p) => (
                <tr key={p.id} className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <td className="p-3">{typeof p.product === 'object' ? p.product.name : p.product}</td>
                  <td className="p-3">{p.supplier}</td>
                  <td className="p-3">{p.quantity}</td>
                  <td className="p-3">{p.status}</td>
                  <td className="p-3">
                    {p.status === 'Pending' && (
                      <button
                        onClick={() => handleReceive(p.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      >
                        Mark as Received
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {procurements.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-500">
                    No procurement records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProcurementRecords;
