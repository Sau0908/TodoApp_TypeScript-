import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
  name: string;
  email: string;
}

interface Task {
  _id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  userToken: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userToken, setToken] = useState<string | null>(() => {
    const token = localStorage.getItem("authToken");
    return token ? JSON.parse(token) : null;
  });
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<{ user: User }>(
          "http://localhost:8001/api/user/getuser",
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    if (userToken) {
      fetchUser();
    }
  }, [userToken]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get<Task[]>(
          "http://localhost:8001/api/task/getTask",
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setTasks(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (userToken) {
      fetchTasks();
    }
  }, [userToken]);

  return (
    <TodoContext.Provider
      value={{
        user,
        setUser,
        tasks,
        setTasks,
        userToken,
        setToken,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const TodoState = () => {
  const context = useContext(TodoContext);
  if (context == undefined) {
    throw new Error("error");
  }
  return context;
};

export default TodoProvider;
