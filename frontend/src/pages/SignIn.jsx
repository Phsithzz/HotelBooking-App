import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom"
import config from "../config";

const SignIn = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSignIn = async () => {
    try {
      const userData = {
        username: username,
        password: password,
      };

      const res = await axios.post(
        config.apiPath + "/admin/signin",
        userData,
      );

      if (res.data.token !== undefined) {
        localStorage.setItem("token_flutter",res.data.token)
        navigate("/room")
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 
     ">
        <div className="
         border-6 border-black shadow-[6px_6px_0px_black]
        bg-white p-8 rounded-2xl  w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            onClick={() => handleSignIn()}
            className="
            cursor-pointer font-semibold
            w-full bg-white text-black py-2 rounded-lg
             hover:bg-black hover:text-white  
             border-4 border-black shadow-[4px_4px_0px_black]
            transition duration-200"
          >
            Sign In
          </button>
        </div>
      </div>
    </>
  );
};

export default SignIn;
