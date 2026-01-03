import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";

const ViewWork = () => {
  const [work, setWork] = useState(null);
  const [workers, setWorkers] = useState([]);
  const { id } = useParams();

  const fetchWorkDetails = async (id) => {
    try {
      const res = await axios.get(`https://work-provider-1.onrender.com/Work/MyAll/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("Fetched work:", res.data);
      setWork(res.data);
    } catch (error) {
      console.error("Error fetching work:", error);
    }
  };


   const fetchWorkers = async (id) => {
  try {
    const res = await axios.get(`http://localhost:4000/Work/work/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    setWorkers(res.data.workers || []);
    console.log(res.data.workers);
    
  } catch (error) {
    console.error("Error fetching workers:", error);
  }
}; 


  useEffect(() => {
    fetchWorkDetails(id);
    fetchWorkers(id);
  }, [id]);

  return (
    <div className="w-full bg-[#007f7f] px-4 min-h-screen">
      <Navbar />
      
      {/* Work Details Section */}
      <div className="flex flex-col items-center py-10 ">
        <h1 className="text-4xl font-bold text-white mb-6">Work Details</h1>

        {work ? (
          <div className="bg-[#03fcdf] max-w-xl w-full p-6 rounded-lg shadow-lg border border-black">
            <h2 className="text-2xl font-semibold mb-4 text-center text-black">Work Information</h2>
            <ul className="text-black text-lg space-y-3">
              <li><strong>Work Type:</strong> {work.workerType}</li>
              <li><strong>Phone Number:</strong> {work.phoneNumber || "N/A"}</li>
              <li><strong>Location:</strong> {work.address}</li>
              <li><strong>Payment:</strong> ₹{work.PyMeant}</li>
              <li><strong>Date:</strong> {work.workPostData?.split("T")[0]}</li>
            </ul>
          </div>
        ) : (
          <p className="text-white text-lg">Loading work details...</p>
        )}
      </div>

      {/* Related Workers Section */}
      <div className="py-10">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Related Workers</h2>
        {workers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {workers.map((wrr) => (
              <div
                key={wrr._id}
                className="bg-[#03fcdf]  p-4 rounded-lg shadow-md border border-black transition hover:scale-105 hover:shadow-lg hover:cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-2 text-black">{wrr.name}</h3>
                <ul className="text-black text-sm space-y-1">
                  <li><strong>Work Type:</strong> {wrr.workerType || "N/A"}</li>
                  <li><strong>Phone:</strong> {wrr.PhonNumber || "N/A"}</li>
                  <li><strong>Location:</strong> {wrr.address || "N/A"}</li>
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-center text-lg">No workers found for this job.</p>
        )}
      </div>
    </div>
  );
};

export default ViewWork;
