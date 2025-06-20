import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSubscriberSchema } from "@shared/schema";
import { z } from "zod";
import { emailService } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Email subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertEmailSubscriberSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscriber = await storage.getEmailSubscriber(validatedData.email);
      if (existingSubscriber) {
        return res.status(400).json({ 
          message: "This email is already subscribed to our newsletter." 
        });
      }

      const subscriber = await storage.createEmailSubscriber(validatedData);
      
      // Send notification email to hello@wellandwilde.ie
      emailService.sendNewSubscriberNotification(subscriber.email);
      
      // Send welcome email to subscriber
      emailService.sendWelcomeEmail(subscriber.email);
      
      res.status(201).json({ 
        message: "Successfully subscribed to our newsletter!",
        subscriber: { id: subscriber.id, email: subscriber.email }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid email address. Please enter a valid email." 
        });
      }
      
      console.error("Subscription error:", error);
      res.status(500).json({ 
        message: "An error occurred while subscribing. Please try again." 
      });
    }
  });

  // Get all subscribers (for admin purposes)
  app.get("/api/subscribers", async (req, res) => {
    try {
      const subscribers = await storage.getAllEmailSubscribers();
      res.json({ subscribers: subscribers.map(s => ({ id: s.id, email: s.email, subscribedAt: s.subscribedAt })) });
    } catch (error) {
      console.error("Get subscribers error:", error);
      res.status(500).json({ message: "Failed to retrieve subscribers" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
