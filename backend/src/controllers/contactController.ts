import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const submitInquiry = async (req: Request, res: Response) => {
  try {
    const { email, message } = req.body;
    
    const inquiry = await prisma.inquiry.create({
      data: {
        email,
        message,
        status: 'UNREAD'
      }
    });
    
    res.status(201).json({
      message: 'Inquiry submitted successfully',
      inquiry
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
};

export const getAllInquiries = async (req: Request, res: Response) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
};

export const updateInquiryStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const inquiry = await prisma.inquiry.update({
      where: { id: parseInt(id) },
      data: { status }
    });
    
    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
};
