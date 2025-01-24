import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../redux/slices/authSlice';
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock } from "react-icons/fa";
function Login() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [formData, setFormData] = useState({
    userIdentifier: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }


  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/user`,
    withCredentials: true
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get('/get-user');
      const { user } = await res.data;

      if (user.role === 'admin') {
        dispatch(loginSuccess({ payload: user }));
        navigate("/admin", { replace: true });
      }
    }
    fetchUser();
  }, []);

  const handleLogin = async () => {
    console.log(formData);
    const res = await axiosInstance.post('/sign-in-using-password', formData);
    console.log(res);
    const { user } = await res.data;
    if (user.role === 'admin') {
      dispatch(loginSuccess({ payload: user }));
      navigate("/admin", { replace: true });
    }
  }

  return (
    <>
      {
        !isAuthenticated &&
        <div className="flex min-h-screen items-center justify-center bg-gray-900">
          <div className="w-96 bg-gray-800 rounded-lg p-10">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="userIdentifier"
                    value={formData.userIdentifier}
                    onChange={handleFormData}
                    placeholder="Email address"
                    className="w-full pl-10 pr-4 py-2 text-gray-200 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormData}
                    placeholder="Password"
                    className="w-full pl-10 pr-4 py-2 text-gray-200 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                Login
              </button>
            </form>
          </div>
        </div>
      }
    </>
  )
}

export default Login;