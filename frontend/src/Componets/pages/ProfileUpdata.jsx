import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import api from '../../api';

const ProfileUpdata = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
    phoneNumber: "",
    address: "",
    workerType: "",
    email: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/User/user');

        const { password, ...userData } = res.data.user;
        setUser(prev => ({ ...prev, ...userData }));
      } catch (error) {
        console.log("Failed to fetch user:", error);
        alert("Could not load user data");
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmitted = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`http://localhost:4000/User/update`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      alert(res.data.message);
      setIsEditing(false);
      navigate('/');
    } catch (error) {
      console.log("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
        
    <div className='h-[200vh] w-screen bg-[#001F3F] '>   
      <Navbar className = 'mt-80' />
       <div className="max-w-3xl mx-auto p-6 bg-[#a8cfe9] shadow-md rounded-md">
      <div className="bg-[#917e78] text-white p-6 rounded mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
        <p className='text-black text-bold  text-2xl uppercase mt-6 font-bold'><strong className='text-white'>Name:   </strong> {user.name}</p>
        <p className='text-black text-bold  text-2xl uppercase mt-6 font-bold'><strong className='text-white'>Email:   </strong> {user.email}</p>
        <p className='text-black text-bold  text-2xl uppercase mt-6 font-bold'><strong className='text-white'>Worker Type:  </strong> {user.workerType}</p>
        <p className='text-black text-bold  text-2xl uppercase mt-6 font-bold'><strong className='text-white'>Phone:   </strong> {user.phoneNumber}</p>
        <p className='text-black text-bold  text-2xl uppercase mt-6 font-bold'><strong className='text-white'>Address:  </strong> {user.address}</p>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-6 bg-[#34D399] text-indigo-600 font-medium px-5 py-2 rounded hover:bg-gray-100 transition"
        >
          {isEditing ? "Cancel" : "Update Profile"}
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmitted} className="space-y-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Edit Your Information</h3>

          <input
            type="text"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-3 bg-[#f2efed] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <input
            type="password"
            placeholder="New Password (optional)"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-3 bg-[#f2efed] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 bg-[#f2efed] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <input
            type="text"
            placeholder="Address"
            name="address"
            value={user.address}
            onChange={handleChange}
            className="w-full p-3 bg-[#f2efed] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <select
            name="workerType"
            value={user.workerType}
            onChange={handleChange}
            className="w-full p-3 bg-[#f2efed] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="">Select Worker Type</option>
            <option value="electric">Electric</option>
            <option value="majdur">Majdur</option>
            <option value="kariger">Kariger</option>
          </select>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-3 rounded hover:bg-emerald-600 transition font-semibold"
          >
            Save Changes
          </button>
        </form>
      )}
    </div></div>

  );
};

export default ProfileUpdata;
