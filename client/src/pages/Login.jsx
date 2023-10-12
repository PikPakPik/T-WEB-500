import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login: authLogin } = useAuth();
  const [formData, setFormData] = useState({ email: "", userPassword: "" });
  const [error, setError] = useState("");

  // Validate user inputs
  const validateInputs = () => {
    const { email, userPassword } = formData;
    return email && userPassword;
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    setError("");
    authLogin(
      { email: formData.email, userPassword: formData.userPassword },
      () => {
        setError("Email ou mot de passe incorrect");
      }
    );
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="relative flex flex-col justify-center mt-32 overflow-hidden">
      <div className="w-full p-6 mx-auto bg-base-300 rounded-md shadow-md lg:max-w-lg">
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
              required
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
              required
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex justify-between gap-4">
            <button className="btn btn-primary" onClick={handleLogin}>
              Me connecter
            </button>
            <Link to="/register">
              <button className="btn btn-secondary">M'inscrire</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
