import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  resetToken?: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: { type: String, required: false },
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
