import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const auth = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    userPassword: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    auth.login({ email: formData.email, userPassword: formData.userPassword })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-base-300 rounded-md shadow-md lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-purple-700">
          Connexion
        </h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              name="email"
              onChange={handleInputChange}
              placeholder="Email Address"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="userPassword"
              onChange={handleInputChange}
              placeholder="Enter Password"
              className="w-full input input-bordered input-primary"
            />
          </div>
          {/* <a href="#" class="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a> */}
          <div className="flex justify-between gap-4">
            <button className="btn btn-primary" onClick={handleLogin}>
              Me connecter
            </button>
            <Link to="/register">
              <button className="btn btn-secondary">M'inscire</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
