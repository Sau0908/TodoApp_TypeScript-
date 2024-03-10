import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TodoState } from "../../context/TodoProvider";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const { setToken, setUser } = TodoState();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const result = await axios.post(
        "http://localhost:8001/api/user/login",
        formData
      );

      localStorage.setItem("authToken", JSON.stringify(result.data.token));
      setToken(result.data.token);
      setUser(result.data.user);
      navigate("/");
    } catch (error: any) {
      setError(error.response?.data.message || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center  h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-[10px] shadow-md m-auto">
        <div className="flex justify-center">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-business-planning_52683-76248.jpg?w=740&t=st=1703417196~exp=1703417796~hmac=fec448f85d611e6ab2cdd0ec87e6b17c7e8433f63d274f5131ec5663d6d6fa6d"
            alt="Profile"
            className="w-36 h-36 border-[4px] border-b-8   rounded-full mb-4"
          />
        </div>
        <h2 className="text-2xl font-bold mb-6">Login to TODO App</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
          >
            Log In
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
        </form>

        <p className="text-center text-sm mt-4">
          <span> Don't have an account ?</span>

          <Link to="/register" className=" font-semibold  hover:underline">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
