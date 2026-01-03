import { Request, Response, NextFunction } from 'express';

export const validateContactForm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({
      error: 'Email and message are required'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Invalid email format'
    });
  }

  if (message.length < 10) {
    return res.status(400).json({
      error: 'Message must be at least 10 characters'
    });
  }

  next();
};
