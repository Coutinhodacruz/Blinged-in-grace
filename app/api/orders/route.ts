import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { sendEmail, adminEmailTemplate, userOrderTemplate } from '@/lib/email';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        
        // Basic validation
        const customerName = body.customerName || body.name;
        const customerEmail = body.customerEmail || body.email;
        const customerPhone = body.customerPhone || body.phone;
        const details = body.details;
        const targetDate = body.targetDate || body.date;

        if (!customerName || !customerEmail || !details) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const order = await Order.create({
            customerName,
            customerEmail,
            customerPhone,
            category: body.category,
            details,
            targetDate,
            inspirationImageUrl: body.inspirationImageUrl,
            status: 'pending'
        });

        // Send Email Notifications
        try {
            await Promise.all([
                // To Admin
                sendEmail({
                    to: process.env.EMAIL_USER!,
                    subject: `[New Order] ${customerName} - ${body.category}`,
                    html: adminEmailTemplate(order)
                }),
                // To User
                sendEmail({
                    to: customerEmail,
                    subject: `We've received your vision - Blinged in Grace`,
                    html: userOrderTemplate(order)
                })
            ]);
        } catch (mailError) {
            console.error('Failed to send order emails:', mailError);
            // We don't want to fail the whole request if emails fail, 
            // since the order is already saved in the database.
        }

        return NextResponse.json(order, { status: 201 });
    } catch (error: any) {
        console.error('Order creation error:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
