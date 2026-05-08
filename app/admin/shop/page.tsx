'use client';

import React, { useState, useEffect } from 'react';
import { 
    Plus, 
    Trash2, 
    Upload, 
    X,
    Loader2,
    CheckCircle2,
    ShoppingBag,
    Tag,
    DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export default function ManageShop() {
    const [products, setProducts] = useState<any[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const [newItem, setNewItem] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        imageUrl: '',
        tags: ''
    });

    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/admin/products');
            const data = await res.json();
            setProducts(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch products');
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
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

            const saveRes = await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    ...newItem, 
                    price: parseFloat(newItem.price),
                    tags: newItem.tags.split(',').map(t => t.trim()),
                    imageUrl: url 
                })
            });

            if (saveRes.ok) {
                toast.success('Product added successfully!');
                setShowModal(false);
                setNewItem({ name: '', category: '', description: '', price: '', imageUrl: '', tags: '' });
                setFile(null);
                fetchProducts();
            }
        } catch (error) {
            toast.error('Failed to create product');
        } finally {
            setIsUploading(false);
        }
    };
    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const res = await fetch(`/api/admin/products?id=${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                toast.success('Product deleted');
                fetchProducts();
            } else {
                toast.error('Failed to delete product');
            }
        } catch (error) {
            toast.error('Error deleting product');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">Shop Products</h3>
                <Button 
                    onClick={() => setShowModal(true)}
                    className="rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-lg shadow-blue-500/20"
                >
                    <Plus size={18} /> Add New Product
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-blue-500" size={40} />
                </div>
            ) : products.length === 0 ? (
                <Card className="p-12 text-center border-dashed border-2">
                    <ShoppingBag className="mx-auto text-slate-300 mb-4" size={48} />
                    <p className="text-slate-500">No products found. Start your shop collection!</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Card key={product._id} className="overflow-hidden border-none shadow-md bg-white hover:shadow-xl transition-all group flex flex-col">
                            <div className="aspect-square relative">
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-blue-700 font-bold shadow-sm">
                                    ${product.price}
                                </div>
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <Button 
                                        variant="destructive" 
                                        size="icon" 
                                        className="rounded-full"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                </div>
                            </div>
                            <div className="p-6 space-y-3 flex-grow">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                    {product.category}
                                </span>
                                <h4 className="font-bold text-slate-800 text-lg leading-tight">{product.name}</h4>
                                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{product.description}</p>
                                <div className="flex flex-wrap gap-1 pt-2">
                                    {product.tags?.map((tag: string) => (
                                        <span key={tag} className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Product Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <Card className="w-full max-w-2xl p-8 space-y-6 relative bg-white max-h-[90vh] overflow-y-auto">
                        <button 
                            onClick={() => setShowModal(false)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
                        >
                            <X size={20} />
                        </button>

                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-slate-800">Create New Product</h3>
                            <p className="text-slate-500 mt-1">List a new item in your creative shop.</p>
                        </div>

                        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-slate-500 ml-1 tracking-widest">Product Name</label>
                                    <input 
                                        type="text" required
                                        value={newItem.name}
                                        onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-slate-500 ml-1 tracking-widest">Category</label>
                                    <input 
                                        type="text" required
                                        value={newItem.category}
                                        onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-slate-500 ml-1 tracking-widest">Price ($)</label>
                                    <div className="relative">
                                        <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input 
                                            type="number" step="0.01" required
                                            value={newItem.price}
                                            onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                                            className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-slate-500 ml-1 tracking-widest">Tags (comma separated)</label>
                                    <div className="relative">
                                        <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input 
                                            type="text"
                                            value={newItem.tags}
                                            onChange={(e) => setNewItem({...newItem, tags: e.target.value})}
                                            className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-slate-500 ml-1 tracking-widest">Description</label>
                                    <textarea 
                                        required rows={3}
                                        value={newItem.description}
                                        onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-slate-500 ml-1 tracking-widest">Product Image</label>
                                    <div className="relative group">
                                        <input 
                                            type="file" required
                                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all ${file ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50 group-hover:border-blue-300'}`}>
                                            {file ? (
                                                <>
                                                    <CheckCircle2 className="text-blue-500 mb-2" size={24} />
                                                    <p className="text-xs font-bold text-slate-700 text-center line-clamp-1">{file.name}</p>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="text-slate-400 mb-2" size={24} />
                                                    <p className="text-xs text-slate-500 text-center">Click to upload product image</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <Button 
                                    type="submit"
                                    disabled={isUploading || !file}
                                    className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-widest uppercase shadow-lg shadow-blue-500/20"
                                >
                                    {isUploading ? <Loader2 className="animate-spin" /> : 'List Product'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
}
