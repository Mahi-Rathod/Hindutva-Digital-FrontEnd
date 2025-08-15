import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../component/utils/axiosInstance/AxiosInstance.jsx";
import ButtonLoader from "../../component/utils/wifiLoader/ButtonLoader.jsx";
import { loginFailure, loginSuccess } from "../../redux/slices/authSlice";

const redirectBasedOnRole = (user, navigate) => {
  if (user.role === "admin") {
    navigate("/admin", { replace: true });
  }
};

function Login() {
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      userIdentifier: "",
      password: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get("/user/get-user");
        const { user } = res.data;
        if (user) {
          dispatch(loginSuccess({ payload: user }));
          redirectBasedOnRole(user, navigate);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post(
        "/user/sign-in-using-password",
        data
      );
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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      {!isAuthenticated && (
        <div className="flex min-h-screen items-center justify-center bg-gray-900">
          <div className="w-96 bg-gray-800 rounded-lg p-10">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label
                  htmlFor="userIdentifier"
                  className="block text-sm font-medium text-gray-300"
                >
                  Username or Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    id="userIdentifier"
                    {...register("userIdentifier", {
                      required: "Username or email is required",
                    })}
                    placeholder="Username or Email"
                    className="w-full pl-10 pr-4 py-2 text-gray-200 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
                  />
                </div>
                {errors.userIdentifier && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.userIdentifier.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    placeholder="Password"
                    className="w-full pl-10 pr-10 py-2 text-gray-200 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isLoading || !isValid}
                  aria-busy={isLoading}
                  aria-live="polite"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-300 relative min-h-[42px]"
                >
                  {isLoading ? (
                    <div className="absolute inset-0 flex justify-center items-center">
                      <ButtonLoader />
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>

              {error && (
                <p className="text-red-500 mt-4 text-center">{error}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
