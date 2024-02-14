import { useState } from "react";
import SignupForm from "../components/forms/SignUpForm";
import ApiHelper from "../utils/ApiHelper";
import { ApiResponse, UserType } from "../utils/type";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const apiHelper = new ApiHelper();

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
      const response: ApiResponse<UserType> = await apiHelper.post("/user/signUp", {
        email: formData.email,
        password: formData.password,
      });
      console.log(response);
      

      if (response.data.error) {
        // Handle signup error
        toast.error(response.data.message);
      } else {
        // Signup successful
        toast.success(response.data.message);
        navigate("/signin"); // Redirect to login page after successful signup
      }
    } catch (error) {
      // Handle network or unexpected errors
      toast.error("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div>
      <SignupForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Signup;
