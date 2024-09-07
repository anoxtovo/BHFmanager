import { Request, Response } from 'express';
import File from '../models/fileModel';

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const file = new File({
      filename: req.file?.filename,
      filepath: req.file?.path,
    });
    await file.save();
    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ message: 'File upload failed' });
  }
};

export const getFiles = async (req: Request, res: Response) => {
  const files = await File.find();
  res.json(files);
};
