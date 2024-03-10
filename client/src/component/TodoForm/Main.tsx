import { useNavigate } from "react-router";
import TaskManager from "../TaskManager/TaskManager";
import TodoForm from "./TodoForm";
import { AiOutlineLogout } from "react-icons/ai";

const Main = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    console.log("Logged out");
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 p-4">
        <TodoForm />
      </div>
      <div className="md:w-1/2 p-4 mt-2">
        <TaskManager />
      </div>
      <div className="absolute bottom-0 right-0 m-4">
        <button
          className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 focus:outline-none flex items-center space-x-2 fixed bottom-4  right-4"
          onClick={handleLogout}
        >
          <AiOutlineLogout />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Main;
