import { useState } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../api";

const UserRegistration = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    loginType: "",
    address: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Photon API autocomplete
  const fetchAddressSuggestions = async (query) => {
    if (!query || query.length < 3) {
      setAddressSuggestions([]);
      return;
    }

    try {
      const res = await axios.get("https://photon.komoot.io/api/", {
        params: {
          q: query,
          limit: 6,
        },
      });

      // Optional: filter only India results
      const indiaResults = res.data.features.filter(
        (f) => f.properties.country === "India"
      );

      setAddressSuggestions(indiaResults || []);
    } catch (error) {
      console.error("Photon error:", error);
    }
  };

  // 🔹 Robust address formatting
  const formatAddress = (p) => {
    return [
      p.village || p.hamlet || p.locality || p.name, // Village
      p.county || p.suburb || p.district,           // Tehsil
      p.city || p.town || p.municipality,           // City
      p.state,                                      // State
      p.country,                                    // Country
    ]
      .filter(Boolean)
      .join(", ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/User/Register", form);
      alert(res.data.message);

      if (!otpSent) {
        setOtpSent(true);
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-500">
      <Navbar />

      <div className="flex justify-center items-center pt-10">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
            Registration
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!otpSent && (
              <>
                <input
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />

                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />

                <input
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />

                {/* ✅ Robust Address Autocomplete */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Village, Tehsil, City, State, Country"
                    value={form.address}
                    onChange={(e) => {
                      setForm({ ...form, address: e.target.value });
                      fetchAddressSuggestions(e.target.value);
                    }}
                    className="w-full px-4 py-2 border rounded"
                  />

                  {addressSuggestions.length > 0 && (
                    <ul className="absolute z-30 bg-white border w-full rounded shadow max-h-48 overflow-y-auto">
                      {addressSuggestions.map((item, index) => {
                        const formatted = formatAddress(item.properties);

                        return (
                          <li
                            key={index}
                            onClick={() => {
                              setForm({ ...form, address: formatted });
                              setAddressSuggestions([]);
                            }}
                            className="px-4 py-2 text-sm cursor-pointer hover:bg-blue-100"
                          >
                            {formatted}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                <select
                  name="loginType"
                  value={form.loginType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                >
                  <option value="">Select User Type</option>
                  <option value="worker">Worker</option>
                  <option value="workProvider">Work Provider</option>
                </select>
              </>
            )}

            {otpSent && (
              <input
                name="otp"
                placeholder="Enter OTP"
                value={form.otp}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {otpSent
                ? loading
                  ? "Verifying..."
                  : "Verify OTP & Register"
                : loading
                ? "Sending OTP..."
                : "Register"}
            </button>

            {!otpSent && (
              <Link
                to="/login"
                className="block text-center text-blue-600 mt-2"
              >
                Already have an account? Login
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
