import { useState } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserRegistration = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    loginType: "",
    address: "",
    otp: "",       // add otp field
  });

  const [otpSent, setOtpSent] = useState(false);  // track if OTP was sent
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:4000/User/Register', form);

      alert(res.data.message);

      if (!otpSent) {
        // OTP just sent, now ask user to enter OTP
        setOtpSent(true);
      } else {
        // OTP verified and user registered
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      // If error response has data.message, use that, else generic
      alert(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-500">
      <Navbar />
      <div className="flex justify-center items-center pt-10 rounded-sm">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
            Registration
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Show these fields only if OTP not sent yet */}
            {!otpSent && (
              <>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    required
                    className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Password
                  </label>
                  <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    type="password"
                    required
                    className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Phone Number
                  </label>
                  <input
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Address
                  </label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    User-Type
                  </label>
                  <select
                    name="loginType"
                    value={form.loginType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <option value="">Select</option>
                    <option value="worker">Worker</option>
                    <option value="workProvider">Work Provider</option>
                  </select>
                </div>
              </>
            )}

            {/* Show OTP input only if OTP sent */}
            {otpSent && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Enter OTP
                </label>
                <input
                  name="otp"
                  value={form.otp}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            )}

            <div className="flex justify-between gap-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 disabled:opacity-50"
              >
                {otpSent ? (loading ? 'Verifying...' : 'Verify OTP & Register') : (loading ? 'Sending OTP...' : 'Register')}
              </button>
              {!otpSent && (
                <Link
                  to="/login"
                  className="w-full mt-4 bg-blue-600 text-white py-2 rounded text-center hover:bg-blue-700 transition duration-200 block"
                >
                  Login
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
