import nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    // SMTP2GO Configuration - uses environment variables in production
    const smtpHost = process.env.SMTP_HOST || 'mail.smtp2go.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '2525');
    const smtpUser = process.env.SMTP_USER || 'avril1';
    const smtpPass = process.env.SMTP_PASS || 'ireland*2022';

    const config: EmailConfig = {
      host: smtpHost,
      port: smtpPort,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    };

    console.log('Attempting SMTP connection with:', {
      host: smtpHost,
      port: smtpPort,
      user: smtpUser,
      // Don't log password for security
    });

    this.transporter = nodemailer.createTransport(config);
    console.log('Email service initialized successfully');
  }

  async sendNewSubscriberNotification(subscriberEmail: string): Promise<boolean> {
    if (!this.transporter) {
      console.log('Email service not configured. Skipping notification.');
      return false;
    }

    try {
      const mailOptions = {
        from: 'hello@wellandwilde.ie',
        to: 'hello@wellandwilde.ie',
        subject: 'New Newsletter Subscription - Well & Wilde',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">
              New Newsletter Subscription
            </h2>
            <p style="font-size: 16px; line-height: 1.6;">
              A new subscriber has joined the Well & Wilde newsletter:
            </p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <strong>Email:</strong> ${subscriberEmail}
            </div>
            <p style="font-size: 14px; color: #666; margin-top: 30px;">
              This notification was sent automatically from your Well & Wilde website.
            </p>
          </div>
        `,
        text: `New Newsletter Subscription\n\nA new subscriber has joined the Well & Wilde newsletter:\nEmail: ${subscriberEmail}\n\nThis notification was sent automatically from your Well & Wilde website.`
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`Email notification sent for new subscriber: ${subscriberEmail}`);
      return true;
    } catch (error) {
      console.error('Failed to send email notification:', error);
      return false;
    }
  }

  async sendWelcomeEmail(subscriberEmail: string): Promise<boolean> {
    if (!this.transporter) {
      console.log('Email service not configured. Skipping welcome email.');
      return false;
    }

    try {
      const mailOptions = {
        from: 'hello@wellandwilde.ie',
        to: subscriberEmail,
        subject: 'Welcome to Well & Wilde - Redefining Wellness',
        html: `
          <div style="font-family: 'Playfair Display', serif; max-width: 600px; margin: 0 auto; color: #333;">
            <div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);">
              <h1 style="font-size: 36px; margin-bottom: 10px; letter-spacing: 2px;">Well + Wilde</h1>
              <p style="font-size: 18px; margin: 0; opacity: 0.8;">Redefining Wellness</p>
            </div>
            
            <div style="padding: 40px 20px;">
              <h2 style="font-size: 28px; margin-bottom: 20px;">Welcome to Our Community</h2>
              
              <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
                Thank you for joining the Well & Wilde community. We're excited to have you on this journey of wellness redefinition.
              </p>
              
              <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
                You'll be the first to know about our:
              </p>
              
              <ul style="font-size: 16px; line-height: 1.8; margin-bottom: 30px;">
                <li>Corporate craft workshops and team-building experiences</li>
                <li>Unique wellness retreats in extraordinary locations</li>
                <li>Exclusive brand events and product launches</li>
                <li>Behind-the-scenes content and wellness insights</li>
              </ul>
              
              <div style="background-color: #000; color: white; padding: 30px; text-align: center; margin: 30px 0;">
                <h3 style="margin: 0 0 10px 0; font-size: 20px;">Coming Soon</h3>
                <p style="margin: 0; opacity: 0.9;">Stay tuned for our official launch</p>
              </div>
              
              <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
                Have questions or ideas? We'd love to hear from you at hello@wellandwilde.ie
              </p>
              
              <p style="font-size: 16px; line-height: 1.8;">
                Welcome aboard,<br>
                <strong>The Well & Wilde Team</strong>
              </p>
            </div>
            
            <div style="text-align: center; padding: 20px; background-color: #f8f8f8; border-top: 1px solid #eee;">
              <p style="font-size: 12px; color: #666; margin: 0;">
                © 2024 Well & Wilde. All rights reserved.
              </p>
            </div>
          </div>
        `,
        text: `Welcome to Well & Wilde - Redefining Wellness\n\nThank you for joining the Well & Wilde community. We're excited to have you on this journey of wellness redefinition.\n\nYou'll be the first to know about our:\n- Corporate craft workshops and team-building experiences\n- Unique wellness retreats in extraordinary locations\n- Exclusive brand events and product launches\n- Behind-the-scenes content and wellness insights\n\nComing Soon - Stay tuned for our official launch\n\nHave questions or ideas? We'd love to hear from you at hello@wellandwilde.ie\n\nWelcome aboard,\nThe Well & Wilde Team\n\n© 2024 Well & Wilde. All rights reserved.`
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`Welcome email sent to: ${subscriberEmail}`);
      return true;
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();