import { Link, useNavigate } from "react-router-dom";
import ApiHelper from "../utils/ApiHelper";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const apiHelper = new ApiHelper();

  const handleLogout = async () => {
    try {
      const response = await apiHelper.post("/user/logout"); // Adjust the endpoint based on your server implementation

      // Clear the token from localStorage
      localStorage.removeItem("token");

      // Clear the chat state from localStorage
      localStorage.removeItem("chatState");

      // Clear navigation history
      window.history.replaceState({}, document.title, "/signin");


      // Redirect to the signin page
      navigate("/signin");

      // Display a success message
      toast.success(response.data.message); // Assuming your server sends a message upon successful logout
    } catch (error) {
      // Handle errors
      console.error("Error during logout:", error);

      // Display an error message
      toast.error("An error occurred during logout. Please try again.");
    }
  };

  return (
    <header className="bg-indigo-500 p-4 text-white flex justify-between items-center">
      <Link to={"/"}>
        <h1 className="text-2xl font-semibold text-center">Chat App</h1>
      </Link>
      <div className="flex items-center">
        <button className="bg-white text-indigo-500 rounded-full p-2 mr-4">
          <div className="w-6 h-6 rounded-full flex items-center justify-center">
            <Link to="/profile">
              <span className="text-indigo-500 font-semibold text-lg">P</span>
            </Link>
          </div>
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
