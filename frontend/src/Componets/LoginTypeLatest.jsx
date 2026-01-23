import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../api";

const LoginTypeLatest = () => {
  const [worker, setWorker] = useState([]);
  const [work, setWork] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorker = async () => {
    try {
      const res = await api.get("/User/All");
      setWorker(res.data.workers || []);
    } catch (error) {
      setError("Failed to fetch workers.");
    }
  };

  const fetchWork = async () => {
    try {
      const res = await api.get("/Work/All", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setWork(res.data.works || []);
    } catch (error) {
      setError("Failed to fetch works.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorker();
    fetchWork();
  }, []);

  if (loading) return <div className="text-center py-10 text-white">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-400">{error}</div>;

  return (
    <div className="w-full bg-[#1E293B] py-10 px-4 min-h-screen">
      <h1 className="text-3xl text-[#38BDF8] font-bold mb-6 text-center">All The Work</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {worker.map((wor) => (
          <div
            key={wor._id}
            className="bg-[#FDE68A] rounded-md shadow-md p-4 border border-[#CBD5E1] transition hover:shadow-lg hover:shadow-[#94A3B8]"
          >
            <ul className="text-[#0F172A] space-y-1 text-sm font-medium">
              <li><strong>Name:</strong> {wor.name || 'N/A'}</li>
              <li><strong>Work Type:</strong> {wor.workerType || 'N/A'}</li>
              <li><strong>Fees:</strong> {wor.phoneNumber || 'N/A'}</li>
              <li><strong>Location:</strong> {wor.address || 'N/A'}</li>
            </ul>
          </div>
        ))}
      </div>

      <h1 className="text-3xl text-[#38BDF8] font-bold mt-12 mb-6 text-center">Login Types: Work & Worker</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {work.map((wo) => (
          <div
            key={wo._id}
           className="bg-[#FDE68A] rounded-md shadow-md p-4 border border-[#93C5FD] transition hover:shadow-lg hover:shadow-[#60A5FA]"
>
            <ul className="text-[rgb(15,23,42)] space-y-1 text-sm font-medium">
              <li><strong>Worker Type:</strong> {wo.workerType || 'N/A'}</li>
              <li><strong>Address:</strong> {wo.address || 'N/A'}</li>
              <li><strong>Payment:</strong> {wo.PyMeant || 'N/A'}</li>
              <li><strong>Work Post Data:</strong> {wo.workPostData || 'N/A'}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginTypeLatest;
