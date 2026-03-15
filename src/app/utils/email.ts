import { Resend } from 'resend';

// Initialize lazily to avoid crashing during module load if API key is missing
let resend: Resend | null = null;

function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function sendWelcomeEmail(email: string, fullName: string) {
  try {
    const resendClient = getResend();
    
    if (!resendClient) {
      console.warn('⚠️ [Email] Resend API key missing. Skipping email.');
      return { success: false, error: 'API key missing' };
    }

    const { data, error } = await resendClient.emails.send({
      from: 'Voltsq Investments <onboarding@resend.dev>', // Replace with your verified domain
      to: [email],
      subject: 'Welcome to Voltsq Investments! 🚀',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Voltsq</title>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f7f9; }
              .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
              .header { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 40px 20px; text-align: center; color: #ffffff; }
              .header h1 { margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; }
              .content { padding: 40px 30px; }
              .content h2 { color: #1e293b; margin-top: 0; }
              .btn { display: inline-block; padding: 14px 28px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 20px; transition: background 0.3s ease; }
              .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
              .highlight { color: #3b82f6; font-weight: 600; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Voltsq Investments</h1>
              </div>
              <div class="content">
                <h2>Welcome, ${fullName}!</h2>
                <p>We're thrilled to have you join our global community of elite investors.</p>
                <p>At <span class="highlight">Voltsq</span>, we provide you with the tools, insights, and security you need to excel in the digital asset landscape.</p>
                <p>Your account is now active and you've been credited with <strong>$10,000</strong> in your demo account to start practicing your strategies immediately.</p>
                <a href="https://voltsq.com/login" class="btn">Start Trading Now</a>
                <p style="margin-top: 30px;">If you have any questions, our 24/7 support team is always here to help.</p>
                <p>Best regards,<br>The Voltsq Team</p>
              </div>
              <div class="footer">
                <p>&copy; 2026 Voltsq Investments. All rights reserved.</p>
                <p>This is an automated message, please do not reply directly to this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Email Send Error:', err);
    return { success: false, error: err };
  }
}
