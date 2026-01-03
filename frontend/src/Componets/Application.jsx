import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const Application = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  // Helper function to get status color class
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const fetchApplication = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`https://work-provider-1.onrender.com/Api/My/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
      // Data is correctly nested under the 'applications' key
      setApplications(res.data.applications);
      setLoading(false);
      
    } catch (error) {
      console.error("Error fetching applications:", error);
      setLoading(false);

      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError("Network error or request failed: " + error.message);
      } else {
        setError("An unexpected error occurred while fetching applications.");
      }
    }
  };
  
  useEffect(() => {
    if (id) {
      fetchApplication(id);
    }
  }, [id]);


  return (
 <div>
  <Navbar className = 'h-1'/>
     <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8 border-b-2 border-indigo-500 pb-3">
        Applications for Work Post ID
      </h2>
        
      {applications.length === 0 ? (
        <p className="text-center text-xl text-gray-500 p-10 bg-white shadow rounded-lg">
          No applications found for this work post yet.
        </p>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app._id} className="bg-white p-6 shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition duration-300">
              
              {/* Card Header (Status and Date) */}
              <div className="flex justify-between items-start mb-4 border-b pb-3 border-gray-100">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass(app.states)}`}>
                  {app.states}
                </span>
                <p className="text-sm text-gray-500">
                  Applied On: {new Date(app.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              {/* Worker Details (populated) */}
              {app.workerId ? (
                <div className="worker-details mb-4">
                  <h3 className="text-xl font-bold text-indigo-600 mb-2">Applicant: {app.workerId.name}</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
                    <p>
                      <span className="font-medium text-gray-600">Type:</span> {app.workerId.workerType || 'N/A'}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">Email:</span> {app.workerId.email}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">Phone:</span> {app.workerId.phoneNumber}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">Address:</span> {app.workerId.address}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-red-500 text-sm italic">Worker details unavailable.</p>
              )}
              
              {/* Work Details Summary */}
              {app.workId && (
                <div className="work-details-summary mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Work Type:</span> {app.workId.workerType} | 
                    <span className="font-medium ml-4">Payment Offered:</span> **${app.workId.PyMeant}**
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                  <button className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-green-500 hover:bg-green-600 transition duration-150 shadow-md">
                    Accept
                  </button>
                  <button className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-red-500 hover:bg-red-600 transition duration-150 shadow-md">
                    Reject
                  </button>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
 </div>
  );
};

export default Application;