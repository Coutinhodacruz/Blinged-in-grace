import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    id: string;
    name: string;
    image: string;
    color: string;
    description: string;
    items: string[];
}

const CategorySchema: Schema = new Schema(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        color: { type: String, required: true },
        description: { type: String, required: true },
        items: [{ type: String }],
    },
    { timestamps: true }
);

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
