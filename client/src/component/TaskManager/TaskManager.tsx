import React, { useState } from "react";
import { TodoState } from "../../context/TodoProvider";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const TaskManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const { tasks, setTasks, user } = TodoState();
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  console.log("user", user?.name);

  const changeTab = (tab: string): void => {
    setActiveTab(tab);
  };

  const handleSelection = async (taskId: number): Promise<void> => {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task._id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });

      setSelectedTasks((prevSelectedTasks) =>
        prevSelectedTasks.includes(taskId)
          ? prevSelectedTasks.filter((id) => id !== taskId)
          : [...prevSelectedTasks, taskId]
      );

      setTasks(updatedTasks);
      console.log("taskId", taskId);

      await axios.put(`http://localhost:8001/api/task/updateTask/${taskId}`, {
        taskId: taskId,
        completed: updatedTasks.find((task) => task._id === taskId)?.completed,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const handleDelete = async (taskId: number) => {
    try {
      await axios.delete(`http://localhost:8001/api/task/removeTask/${taskId}`);

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container bg-gray-100 p-2 mx-auto mt-10 border">
      <div className="bg-white p-2 rounded-lg mt-8 shadow-md">
        <div className="flex flex-wrap justify-center">
          <button
            className={`px-4 py-2 m-2 rounded focus:outline-none ${
              activeTab === "all"
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => changeTab("all")}
          >
            All Tasks
          </button>
          <button
            className={`px-4 py-2  m-2 rounded focus:outline-none ${
              activeTab === "progress"
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => changeTab("progress")}
          >
            In Progress
          </button>
          <button
            className={`px-4 py-2 m-2 rounded focus:outline-none ${
              activeTab === "done"
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => changeTab("done")}
          >
            Done
          </button>
        </div>
        <div className="bg-gray-100 mt-4 p-4 rounded-b-lg h-80 overflow-y-auto">
          <ul>
            {activeTab === "all" &&
              tasks.map((task) => (
                <li
                  key={task._id}
                  className="flex justify-between items-center py-2 px-4 mb-2 bg-gray-200 rounded"
                >
                  <div>
                    <h2 className="text-lg">{task.title}</h2>
                    <p>{task.description}</p>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`${
                        task.completed ? "text-green-500" : "text-blue-500"
                      } mr-2`}
                    >
                      {task.completed ? "Completed" : "In Progress"}
                    </span>
                    <input
                      type="checkbox"
                      checked={
                        selectedTasks.includes(task._id) || task.completed
                      }
                      onChange={() => handleSelection(task._id)}
                    />

                    <FaTrash
                      className="text-red-500 ml-2 cursor-pointer"
                      onClick={() => handleDelete(task._id)}
                    />
                  </div>
                </li>
              ))}
            {activeTab === "progress" &&
              tasks
                .filter((task) => !task.completed)
                .map((task) => (
                  <li
                    key={task._id}
                    className="flex justify-between items-center py-2 px-4 mb-2 bg-gray-200 rounded"
                  >
                    <div>
                      <h2 className="text-lg">{task.title}</h2>
                      <p>{task.description}</p>
                    </div>
                    <span className="text-blue-500">In Progress</span>
                  </li>
                ))}
            {activeTab === "done" &&
              tasks
                .filter((task) => task.completed)
                .map((task) => (
                  <li
                    key={task._id}
                    className="flex justify-between items-center py-2 px-4 mb-2 bg-gray-200 rounded"
                  >
                    <div>
                      <h2 className="text-lg">{task.title}</h2>
                      <p>{task.description}</p>
                    </div>
                    <span className="text-green-500">Completed</span>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
