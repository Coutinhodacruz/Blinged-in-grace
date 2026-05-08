import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // 1. Admin Notification Template
    const adminHtml = `
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
            .message-body { background-color: #f9f9f9; border-left: 4px solid #D4AF37; padding: 20px; font-style: italic; font-size: 15px; color: #444; line-height: 1.8; border-radius: 0 8px 8px 0; }
            .footer { background-color: #f4f4f7; padding: 20px; text-align: center; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <h1>Blinged in Grace</h1>
              </div>
              <div class="content">
                <div class="section-title">New Client Inquiry</div>
                
                <div class="data-row">
                  <span class="label">Client Name</span>
                  <span class="value">${name}</span>
                </div>
                
                <div class="data-row">
                  <span class="label">Email Address</span>
                  <span class="value">${email}</span>
                </div>
                
                <div class="data-row">
                  <span class="label">Subject Line</span>
                  <span class="value">${subject}</span>
                </div>
                
                <div class="section-title" style="margin-top: 40px;">Message Details</div>
                <div class="message-body">
                  "${message}"
                </div>
              </div>
              <div class="footer">
                &copy; ${new Date().getFullYear()} Blinged in Grace. All rights reserved.
              </div>
            </div>
          </div>
        </body>
        </html>
    `;

    // 2. User Auto-Reply Template
    const userHtml = `
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
            .social { margin-bottom: 20px; }
            .social a { color: #D4AF37; text-decoration: none; margin: 0 15px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="hero">
                <h1>Blinged in Grace</h1>
                <p>Faith &bull; Creativity &bull; Sparkle</p>
              </div>
              <div class="content">
                <p>Dear ${name},</p>
                <p>We are truly touched that you chose to reach out to us. Your inquiry regarding "<strong>${subject}</strong>" has been received with warmth and gratitude.</p>
                <p>As we handcraft each piece with love and intention, please allow us <strong>24 to 48 hours</strong> to review your message and provide a thoughtful response.</p>
                
                <div class="button-container">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://blingedingrace.com'}/shop" class="btn">Explore Collections</a>
                </div>
                
                <div class="signature">
                  With Grace & Sparkle,<br>
                  <strong>Desiree & Rire</strong>
                </div>
              </div>
              <div class="footer">
                <div class="social">
                  <a href="#">INSTAGRAM</a>
                  <a href="#">FACEBOOK</a>
                  <a href="#">TIKTOK</a>
                </div>
                <p>&copy; ${new Date().getFullYear()} Blinged in Grace. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
    `;

    await Promise.all([
      sendEmail({
        to: process.env.EMAIL_USER!,
        subject: `[New Inquiry] ${subject} - ${name}`,
        html: adminHtml
      }),
      sendEmail({
        to: email,
        subject: `Thank you for contacting Blinged in Grace`,
        html: userHtml
      })
    ]);

    return NextResponse.json({ message: 'Message sent with grace' }, { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ message: 'We encountered a small glitch. Please try again.' }, { status: 500 });
  }
}
