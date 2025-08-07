import type { VercelRequest, VercelResponse } from '@vercel/node';
import { insertContactSubmissionSchema } from '../shared/schema';
import { z } from 'zod';

// In-memory storage for demo purposes
// In production, you should use a proper database
interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  eventType: string;
  message: string;
  submittedAt: Date;
}

const contactSubmissions: ContactSubmission[] = [];
let currentId = 1;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      const submission: ContactSubmission = {
        ...validatedData,
        id: currentId++,
        phone: validatedData.phone || null,
        submittedAt: new Date()
      };
      
      contactSubmissions.push(submission);
      
      res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully",
        id: submission.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Contact form submission error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  } else if (req.method === 'GET') {
    try {
      const sortedSubmissions = contactSubmissions.sort(
        (a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()
      );
      res.json(sortedSubmissions);
    } catch (error) {
      console.error("Get contact submissions error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}