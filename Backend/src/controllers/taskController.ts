import { Request, Response } from 'express';
import TaskModel from '../model/taskModel';
import UserModel from '../model/userModel';



const addTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const userId = req.user?.id;
    const user = await UserModel.find({ _id: userId });

    const newTask = new TaskModel({ title, description, completed: false, userId });
    await newTask.save();

   
    res.status(200).json({ task: newTask, message: 'Task added successfully' });
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const removeTask = (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('id: ', id);
  TaskModel
    .findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: 'Task deleted successfully' }))
    .catch((error:any) => res.status(501).json({ message: error.message }));
};

const getTask = (req: Request, res: Response) => {
  TaskModel
    .find({ userId: req.user?.id })
    .then((data:any) => res.status(200).json(data))
    .catch((error:any) => res.status(501).json({ message: error.message }));
};
const updateTask= async (req : Request, res : Response) => {
  // console.log(req); 
  const {  taskId, completed } = req.body;

  try {
    const task = await TaskModel.findByIdAndUpdate(taskId, { completed }, { new: true });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addTask, getTask, removeTask , updateTask };


