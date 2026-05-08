'use client';

import React, { useState, useEffect } from 'react';
import { 
    Plus, 
    Trash2, 
    Upload, 
    X,
    Loader2,
    CheckCircle2,
    Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export default function ManageGallery() {
    const [items, setItems] = useState<any[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const [newItem, setNewItem] = useState({
        title: '',
        category: '',
        description: '',
        imageUrl: ''
    });

    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await fetch('/api/admin/gallery');
            const data = await res.json();
            setItems(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch gallery items');
            setLoading(false);
        }
    };

    const handleFileUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const { url } = await uploadRes.json();

            const saveRes = await fetch('/api/admin/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newItem, imageUrl: url })
            });

            if (saveRes.ok) {
                toast.success('Gallery item added successfully!');
                setShowUploadModal(false);
                setNewItem({ title: '', category: '', description: '', imageUrl: '' });
                setFile(null);
                fetchItems();
            }
        } catch (error) {
            toast.error('Failed to upload item');
        } finally {
            setIsUploading(false);
        }
    };
    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this gallery item?')) return;

        try {
            const res = await fetch(`/api/admin/gallery?id=${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                toast.success('Item deleted');
                fetchItems();
            } else {
                toast.error('Failed to delete item');
            }
        } catch (error) {
            toast.error('Error deleting item');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">Gallery Items</h3>
                <Button 
                    onClick={() => setShowUploadModal(true)}
                    className="rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                    <Plus size={18} /> Add New Item
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-amber-500" size={40} />
                </div>
            ) : items.length === 0 ? (
                <Card className="p-12 text-center border-dashed border-2">
                    <ImageIcon className="mx-auto text-slate-300 mb-4" size={48} />
                    <p className="text-slate-500">No gallery items found. Start by adding one!</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <Card key={item._id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all group">
                            <div className="aspect-square relative">
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <Button 
                                        variant="destructive" 
                                        size="icon" 
                                        className="rounded-full"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                </div>
                            </div>
                            <div className="p-4">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                                    {item.category || 'General'}
                                </span>
                                <h4 className="font-bold text-slate-800 mt-2 line-clamp-1">{item.title || 'Untitled'}</h4>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <Card className="w-full max-w-lg p-8 space-y-6 relative bg-white">
                        <button 
                            onClick={() => setShowUploadModal(false)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
                        >
                            <X size={20} />
                        </button>

                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-slate-800">Add Gallery Piece</h3>
                            <p className="text-slate-500 mt-1">Upload a new creation to your portfolio.</p>
                        </div>

                        <form onSubmit={handleFileUpload} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-slate-500 ml-1 tracking-widest">Title</label>
                                <input 
                                    type="text" 
                                    required
                                    value={newItem.title}
                                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                                    placeholder="e.g. Personalized Water Bottle"
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-slate-500 ml-1 tracking-widest">Category</label>
                                <input 
                                    type="text" 
                                    required
                                    value={newItem.category}
                                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                                    placeholder="e.g. Bedazzled Designs"
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-slate-500 ml-1 tracking-widest">Image File</label>
                                <div className="relative group">
                                    <input 
                                        type="file" 
                                        required
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                        accept="image/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all ${file ? 'border-amber-500 bg-amber-50' : 'border-slate-200 bg-slate-50 group-hover:border-amber-300'}`}>
                                        {file ? (
                                            <>
                                                <CheckCircle2 className="text-amber-500 mb-2" size={24} />
                                                <p className="text-sm font-bold text-slate-700">{file.name}</p>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="text-slate-400 mb-2" size={24} />
                                                <p className="text-sm text-slate-500">Click or drag image to upload</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Button 
                                type="submit"
                                disabled={isUploading || !file}
                                className="w-full h-14 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold tracking-widest uppercase shadow-lg shadow-amber-500/20"
                            >
                                {isUploading ? <Loader2 className="animate-spin" /> : 'Complete Upload'}
                            </Button>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
}
