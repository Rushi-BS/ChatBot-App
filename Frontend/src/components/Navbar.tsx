import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/signin");
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
