import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryItem extends Document {
    title?: string;
    imageUrl: string;
    description?: string;
    category?: string;
}

const GalleryItemSchema: Schema = new Schema(
    {
        title: { type: String },
        imageUrl: { type: String, required: true },
        description: { type: String },
        category: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.GalleryItem || mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);
