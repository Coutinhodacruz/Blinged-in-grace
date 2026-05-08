import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import GalleryItem from '@/models/GalleryItem';

export async function GET() {
    try {
        await dbConnect();
        const items = await GalleryItem.find({}).sort({ createdAt: -1 });
        return NextResponse.json(items);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
