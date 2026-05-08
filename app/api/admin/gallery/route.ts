import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import GalleryItem from '@/models/GalleryItem';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

async function isAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return false;

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        return decoded.role === 'admin';
    } catch (error) {
        return false;
    }
}

export async function GET() {
    try {
        await dbConnect();
        const items = await GalleryItem.find({}).sort({ createdAt: -1 });
        return NextResponse.json(items);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        await dbConnect();
        const body = await req.json();
        const item = await GalleryItem.create(body);
        return NextResponse.json(item, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ message: 'ID is required' }, { status: 400 });
        }

        await GalleryItem.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Gallery item deleted' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
