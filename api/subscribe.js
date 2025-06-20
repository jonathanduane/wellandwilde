// Simple in-memory storage for serverless
const subscribers = new Map();
let subscriberIdCounter = 1;

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;
    
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email address provided.' });
    }

    // Check if email already exists
    for (const [id, subscriber] of subscribers) {
      if (subscriber.email === email) {
        return res.status(400).json({ message: 'This email is already subscribed to our newsletter.' });
      }
    }

    // Create new subscriber
    const subscriber = {
      id: subscriberIdCounter++,
      email,
      subscribedAt: new Date()
    };
    subscribers.set(subscriber.id, subscriber);

    console.log(`New subscriber: ${email}`);

    res.status(201).json({
      message: 'Successfully subscribed to our newsletter!',
      subscriber: { id: subscriber.id, email: subscriber.email }
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Failed to subscribe. Please try again.' });
  }
}