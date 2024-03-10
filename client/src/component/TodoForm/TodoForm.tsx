import React, { useState } from "react";
import axios from "axios";
import { TodoState } from "../../context/TodoProvider";

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { tasks, setTasks, userToken, user } = TodoState();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8001/api/task/addTask",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log("result", res);
      setTasks([
        ...tasks,
        { title, description, completed: false, _id: res.data.task._id },
      ]);
    } catch (error) {
      console.log(error);
    }
    setTitle("");
    setDescription("");
  };

  return (
    <div className="mx-4">
      <div className="text-center text-xl md:text-5xl">
        {`👋 Hii ${user?.name}, What's on the agenda for today?`}
      </div>
      <div className="mt-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={handleChange}
              placeholder="Enter title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={handleChange}
              placeholder="Enter description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
