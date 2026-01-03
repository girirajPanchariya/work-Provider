import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";

const WorkerTypeToWork = () => {
  const [works, setWorks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // track which job is being applied

  // ✅ Apply for a job
  const apply = async (workId) => {
    try {
      setLoadingId(workId);

      const res = await axios.post(
        `https://work-provider-1.onrender.com/Api/Apply/${workId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      alert(res.data.message);

      // ✅ Convert to string for consistent comparison
      setAppliedJobs((prev) => [...prev, workId]);
      re
    } catch (error) {
      console.error("Apply error:", error);
      const msg =
        error.response?.data?.message || "Failed to apply for this job.";
      alert(msg);
    } finally {
      setLoadingId(null);
    }
  };

  // ✅ Fetch work and applied jobs from backend
  const fetchWork = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/User/workType`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setWorks(res.data.work || []);
      setUser(res.data.user || null);

      // ✅ Ensure appliedJobs is a string array
      if (res.data.appliedJobs) {
        setAppliedJobs(res.data.appliedJobs.map(String));
      }
    } catch (error) {
      console.error("Error fetching work data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWork();
  }, []);

  return (
    <div className="w-full bg-[#0b5555] px-0 min-h-screen">
      <Navbar />

      {/* 🧑 User Info Section */}
      {user && (
        <div className="bg-white max-w-xl mx-auto mt-10 p-6 rounded-lg shadow-md border">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            User Info
          </h2>
          <ul className="text-gray-800 space-y-2 text-lg">
            <li>
              <strong>Name:</strong> {user.name}
            </li>
            <li>
              <strong>Email:</strong> {user.email}
            </li>
            <li>
              <strong>Phone:</strong> {user.PhonNumber || "N/A"}
            </li>
            <li>
              <strong>Worker Type:</strong> {user.workerType}
            </li>
            <li>
              <strong>Address:</strong> {user.address || "N/A"}
            </li>
          </ul>
        </div>
      )}

      {/* 📋 Work Details Section */}
      <div className="flex flex-col items-center py-10 px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Work Details</h1>

        {loading ? (
          <p className="text-white text-lg">Loading work details...</p>
        ) : works.length > 0 ? (
          <div className="w-full max-w-xl space-y-6">
            {works.map((work) => {
              // ✅ Compare as strings to avoid mismatch
              const isApplied = appliedJobs.includes(String(work._id));

              return (
                <div
                  key={work._id}
                  className="bg-blue-300 text-white rounded-lg shadow-md border border-gray-300 p-6"
                >
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 text-center">
                    Work Information
                  </h2>
                  <ul className="text-gray-700 space-y-3 text-base">
                    <li>
                      <span className="font-semibold">Work Type:</span>{" "}
                      {work.workerType}
                    </li>
                    <li>
                      <span className="font-semibold">Location:</span>{" "}
                      {work.address || "N/A"}
                    </li>
                    <li>
                      <span className="font-semibold">Payment:</span> ₹
                      {work.PyMeant}
                    </li>
                    <li>
                      <span className="font-semibold">Date:</span>{" "}
                      {work.workPostData?.split("T")[0]}
                    </li>
                    <li>
                      <span className="font-semibold">Description:</span>{" "}
                      {work.workDescription || "N/A"}
                    </li>
                    <li>
                      <span className="font-semibold">Phone Number:</span>{" "}
                      {work.PhonNumber || "N/A"}
                    </li>
                  </ul>

                  {/* ✅ Apply Button */}
                  {!isApplied ? (
                    <button
                      onClick={() => apply(work._id)}
                      disabled={loadingId === work._id}
                      className={`mt-4 w-full py-2 rounded-2xl text-white font-medium transition ${
                        loadingId === work._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#627594] hover:bg-[#4a5a70]"
                      }`}
                    >
                      {loadingId === work._id ? "Applying..." : "Apply"}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="mt-4 w-full py-2 rounded-2xl bg-gray-400 text-white font-medium cursor-not-allowed"
                    >
                      Applied
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-white text-lg">No work data available.</p>
        )}
      </div>
    </div>
  );
};

export default WorkerTypeToWork;
