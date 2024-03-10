import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
declare global {
  namespace Express {
    interface Request {
      user?: { [key: string]: any };
      token?: string;
    }
  }
}
const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = (authorization as string).split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { [key: string]: any };
    req.user = decoded;
    req.token = token;
    next();
  } catch (error:any) {
    return res.status(500).json({ message: error.message });
  }
};

export default requireAuth;
