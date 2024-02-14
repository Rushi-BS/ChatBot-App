import { useState } from "react";
import SigninForm from "../components/forms/SignInForm";
import ApiHelper from "../utils/ApiHelper";
import { ApiResponse } from "../utils/type";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const apiHelper = new ApiHelper();

const Signin: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: ApiResponse<string> = await apiHelper.post("/user/signIn", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.results) {
        // Store the token in localStorage
        localStorage.setItem("token", response.data.results);
        console.log('Stored Token:', localStorage.getItem('token'));
  
        // Additional console.log to check the token just before setting the Authorization header
        console.log('Token before setting Authorization Header:', response.data.results);
  
        // Attach the token to the Authorization header for future requests
        apiHelper.setAuthorizationHeader(response.data.results);
        console.log('Token after setting Authorization Header:', response.data.results);
      }

      if (response.data.error) {
        // Handle login error
        toast.error(response.data.message);
      } else {
        // Login successful
        toast.success(response.data.message);
        // You can perform additional actions after successful login, such as redirecting to another page
        navigate("/");
      }
    } catch (error) {
      // Handle network or unexpected errors
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <div>
      <SigninForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Signin;
