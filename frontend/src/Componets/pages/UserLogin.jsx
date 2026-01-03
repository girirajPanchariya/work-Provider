import React, { useState } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../useContext/AuthContext";

const UserLogin = () => {
  const [user,setUser] = useState({
    email:"",
     password:"",
     loginType:"",


  })
  const navigate  = useNavigate()
  const {login} = useAuth()
    const handelChange = async(e)=>{
        setUser({... user,[e.target.name]:e.target.value})
    }
      const handelSubmit = async(e)=>{
    e.preventDefault();
         try {
  const res = await axios.post(
    'https://work-provider-1.onrender.com/login',
    user,
    {
      headers: {
        'Content-Type': 'application/json', // fixed spelling
      },
      withCredentials: true // fixed spelling
    }
  );
  login(res.data.user)
  
  alert(res.data.message)

  navigate('/')
  // handle response 
  console.log(res.data);
} catch (error) {
  // handle error
  alert(res.data.message)
  console.error(error);
}
      }
  return (
    <div className="min-h-screen w-full bg-blue-500 ">
      <Navbar />
      <div className="flex justify-center items-center pt-10 rounded-sm">
        <div className="bg-white p-8 rounded shadow w-full max-w-md">
          <h1 className="text-2xl font-bold text-blue-600 text-center md-10">
            Logn-Page
          </h1>
          <form className="" action="" onSubmit={handelSubmit}>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor=""
              >
                Email
              </label>
              <input
                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="text"
                value={user.email}
                onChange={handelChange}
                name="email"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor=""
              >
                password
              </label>
              <input
                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="text"
                value={user.password}
                name="password"
                 onChange={handelChange}
              />
            </div>{" "}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor=""
              >
                Login-Type
              </label>
              <select
              value={user.loginType}
               onChange={handelChange}
               name="loginType"
               className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                  <option value="">select</option>
                <option value="worker">Worker</option>
                <option value="workProvider">WorkProvider</option>
              </select>
            </div>
            <div className="flex justify-between gap-4 ">
              <button
                type="Link"
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                <Link to={"/Registertion"}>Registertion</Link>
              </button>
              <button
                type="submit"
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                Login  
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
