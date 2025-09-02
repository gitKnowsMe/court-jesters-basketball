import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

// Define the schema locally to avoid import issues in Vercel
const insertContactSubmissionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  eventType: z.string().min(1, "Event type is required"),
  message: z.string().min(1, "Message is required"),
});

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
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST') {
      // Validate request body
      if (!req.body) {
        return res.status(400).json({ 
          success: false, 
          message: "Request body is required" 
        });
      }

      // Parse and validate data
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      // Create submission object
      const submission: ContactSubmission = {
        ...validatedData,
        id: currentId++,
        phone: validatedData.phone || null,
        submittedAt: new Date()
      };
      
      // Store submission
      contactSubmissions.push(submission);
      
      // Return success response
      return res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully",
        id: submission.id 
      });

    } else if (req.method === 'GET') {
      // Return sorted submissions
      const sortedSubmissions = contactSubmissions.sort(
        (a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()
      );
      
      return res.json({
        success: true,
        data: sortedSubmissions
      });

    } else {
      // Method not allowed
      res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
      return res.status(405).json({ 
        success: false, 
        message: `Method ${req.method} Not Allowed` 
      });
    }

  } catch (error) {
    console.error("API Error:", error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        message: "Validation error", 
        errors: error.errors 
      });
    }
    
    // Handle other errors
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}