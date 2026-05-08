import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    category: string;
    details: string;
    targetDate: Date;
    inspirationImageUrl?: string;
    status: 'pending' | 'reviewed' | 'in-progress' | 'completed' | 'cancelled';
}

const OrderSchema: Schema = new Schema(
    {
        customerName: { type: String, required: true },
        customerEmail: { type: String, required: true },
        customerPhone: { type: String, required: true },
        category: { type: String, required: true },
        details: { type: String, required: true },
        targetDate: { type: Date, required: true },
        inspirationImageUrl: { type: String },
        status: { 
            type: String, 
            enum: ['pending', 'reviewed', 'in-progress', 'completed', 'cancelled'], 
            default: 'pending' 
        },
    },
    { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
