import mongoose, { Document } from 'mongoose';

interface ITask extends Document {
  title: string;
  description: string;
  userId: string;
  completed: boolean;
}

const taskInstance = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    completed: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model<ITask>('Task', taskInstance);

export default TaskModel;
