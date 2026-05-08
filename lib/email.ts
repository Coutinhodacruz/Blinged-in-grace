import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface MailData {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: MailData) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
    };

    return transporter.sendMail(mailOptions);
}

export const adminEmailTemplate = (order: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f7; color: #51545e; margin: 0; padding: 0; width: 100%; }
    .wrapper { width: 100%; background-color: #f4f4f7; padding: 40px 0; }
    .container { width: 90%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { background-color: #1a1a1a; padding: 40px; text-align: center; border-bottom: 4px solid #D4AF37; }
    .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; }
    .content { padding: 40px; }
    .section-title { font-size: 12px; font-weight: bold; color: #D4AF37; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 8px; }
    .data-row { margin-bottom: 25px; }
    .label { font-size: 13px; color: #888; margin-bottom: 5px; display: block; }
    .value { font-size: 16px; color: #222; font-weight: 500; }
    .message-body { background-color: #f9f9f9; border-left: 4px solid #D4AF37; padding: 20px; font-size: 15px; color: #444; line-height: 1.8; border-radius: 0 8px 8px 0; }
    .footer { background-color: #f4f4f7; padding: 20px; text-align: center; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>New Custom Order Request</h1>
      </div>
      <div class="content">
        <div class="section-title">Customer Details</div>
        <div class="data-row">
          <span class="label">Name</span>
          <span class="value">${order.customerName}</span>
        </div>
        <div class="data-row">
          <span class="label">Email</span>
          <span class="value">${order.customerEmail}</span>
        </div>
        <div class="data-row">
          <span class="label">Phone</span>
          <span class="value">${order.customerPhone}</span>
        </div>
        <div class="data-row">
          <span class="label">Category</span>
          <span class="value" style="text-transform: capitalize;">${order.category}</span>
        </div>
        <div class="data-row">
          <span class="label">Target Date</span>
          <span class="value">${new Date(order.targetDate).toLocaleDateString()}</span>
        </div>

        <div class="section-title" style="margin-top: 40px;">Order Vision</div>
        <div class="message-body">
          ${order.details}
        </div>

        ${order.inspirationImageUrl ? `
        <div class="section-title" style="margin-top: 40px;">Inspiration Image</div>
        <div style="margin-top: 10px;">
          <a href="${order.inspirationImageUrl}" target="_blank" style="color: #D4AF37; font-weight: bold; text-decoration: none;">View Inspiration Image &rarr;</a>
        </div>
        ` : ''}
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Blinged in Grace Admin.
      </div>
    </div>
  </div>
</body>
</html>
`;

export const userOrderTemplate = (order: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Georgia', serif; background-color: #fafafa; color: #333; margin: 0; padding: 0; width: 100%; }
    .wrapper { width: 100%; background-color: #fafafa; padding: 60px 0; }
    .container { width: 90%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e8e8e8; border-radius: 4px; overflow: hidden; }
    .hero { background: linear-gradient(135deg, #1a1a1a 0%, #333 100%); padding: 60px 20px; text-align: center; border-bottom: 3px solid #D4AF37; }
    .hero h1 { color: #D4AF37; margin: 0; font-size: 32px; font-weight: normal; font-style: italic; }
    .hero p { color: #eee; font-size: 14px; margin-top: 10px; letter-spacing: 3px; text-transform: uppercase; }
    .content { padding: 50px 40px; text-align: center; }
    .content p { font-size: 18px; line-height: 1.8; color: #444; margin-bottom: 30px; }
    .button-container { margin: 40px 0; }
    .btn { background-color: #1a1a1a; color: #D4AF37 !important; padding: 18px 35px; text-decoration: none; border: 1px solid #D4AF37; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; transition: all 0.3s; display: inline-block; }
    .signature { margin-top: 50px; font-size: 16px; border-top: 1px solid #eee; padding-top: 30px; }
    .footer { padding: 40px 20px; text-align: center; font-size: 12px; color: #999; background-color: #f9f9f9; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="hero">
        <h1>Blinged in Grace</h1>
        <p>Your Vision Has Been Received</p>
      </div>
      <div class="content">
        <p>Dear ${order.customerName},</p>
        <p>Thank you so much for sharing your creative vision with us! We've received your custom request for <strong>${order.category}</strong> and we're already getting excited about the possibilities.</p>
        <p>Our team (Desiree & Rire) will personally review your request, including your inspiration and target date. We'll reach out to you within <strong>24 to 48 hours</strong> to discuss the details, timeline, and providing you with a custom quote.</p>
        
        <div class="signature">
          With Grace & Sparkle,<br>
          <strong>Desiree & Rire</strong>
        </div>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Blinged in Grace. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
`;
