import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailure } from '../../redux/slices/authSlice';
import { FaEnvelope, FaLock } from "react-icons/fa";
import WifiLoader from "../../component/utils/wifiLoader/WifiLoader.jsx";
import InputField from '../../component/inputField/InputField.jsx';
import axiosInstance from '../../component/utils/axiosInstance/AxiosInstance.jsx';

const redirectBasedOnRole = (user, navigate) => {
  if (user.role === 'admin') {
    navigate('/admin', { replace: true });
  }
};

function Login() {
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ userIdentifier: "", password: "" });
  const navigate = useNavigate();

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/user/get-user");
        const { user } = res.data;
        if(user){
          dispatch(loginSuccess({payload : user}));
          redirectBasedOnRole(user, navigate);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    
    fetchUser();
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axiosInstance.post("/user/sign-in-using-password", formData);
      const { user } = res.data;
      dispatch(loginSuccess({ payload: user }));
      redirectBasedOnRole(user, navigate);
    } catch (error) {
      const errMessage = error.response?.data?.message || "Login failed.";
      dispatch(loginFailure(errMessage));
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <>
      {!isAuthenticated && (
        <div className="flex min-h-screen items-center justify-center bg-gray-900">
          <div className="w-96 bg-gray-800 rounded-lg p-10">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            </div>
            <form onSubmit={handleLogin}>
              <InputField
                id="email"
                name="userIdentifier"
                value={formData.userIdentifier}
                onChange={handleFormData}
                icon={FaEnvelope}
                placeholder="Username or Email"
              />
              <InputField
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleFormData}
                icon={FaLock}
                placeholder="Password"
              />
              {isLoading ? (
                <div className="w-full flex justify-center items-center px-4 py-2">
                  <WifiLoader />
                </div>
              ) : (
                formData.userIdentifier && formData.password &&
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Login
                </button>
              )}
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;