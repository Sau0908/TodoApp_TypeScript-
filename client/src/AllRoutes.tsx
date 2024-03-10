import { Route, Routes } from "react-router-dom";
import Main from "./component/TodoForm/Main";
import Login from "./component/AuthForm/Login";
import Register from "./component/AuthForm/Register";
import { TodoState } from "./context/TodoProvider";

const AllRoutes = () => {
  const { userToken } = TodoState();
  return (
    <div>
      <Routes>
        <Route path="/" element={userToken ? <Main /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
