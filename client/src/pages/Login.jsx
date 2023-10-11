import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    userPassword: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Connexion réussie !");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div class="relative flex flex-col justify-center h-screen overflow-hidden">
      <div class="w-full p-6 m-auto bg-base-300 rounded-md shadow-md lg:max-w-lg">
        <h1 class="text-3xl font-semibold text-center text-purple-700">
          Connexion
        </h1>
        <form class="space-y-4">
          <div>
            <label class="label">
              <span class="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              name="email"
              onChange={handleInputChange}
              placeholder="Email Address"
              class="w-full input input-bordered input-primary"
            />
          </div>
          <div>
            <label class="label">
              <span class="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="userPassword"
              onChange={handleInputChange}
              placeholder="Enter Password"
              class="w-full input input-bordered input-primary"
            />
          </div>
          {/* <a href="#" class="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a> */}
          <div className="flex justify-between gap-4">
            <button class="btn btn-primary" onClick={handleLogin}>
              Me connecter
            </button>
            <Link to="/register">
              <button class="btn btn-secondary">M'inscire</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
