import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const MyWork = () => {
  const [work, setWork] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyWorks = async () => {
      try {
        const res = await axios.get('https://work-provider-1.onrender.com/Work/MyAll', {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setWork(res.data);
      } catch (err) {
        console.error('Error fetching work data:', err);
        setError('Failed to fetch work data.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyWorks();
  }, []);

  return (
    <div className="bg-[#007f7f] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">All The Work</h1>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && work.length === 0 && (
          <p className="text-center text-gray-500">No work data available.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {work.map((wor) => (
            <div
              key={wor._id}
              className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <ul className="text-gray-800 text-sm space-y-1">
                <li><strong>Name:</strong> {wor.userId.name}</li>
                <li><strong>Work Type:</strong> {wor.workerType}</li>
                <li><strong>Phone:</strong> {wor.phoneNumber}</li>
                <li><strong>Location:</strong> {wor.address}</li>
              </ul>
              <Link
                to={`/MyWork/${wor._id}`}
                className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                View Details
              </Link>
                <Link
                to={`/Application/${wor._id}`}
                className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                View Applicaiton
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyWork;
