'use client';

import React, { useState, useEffect } from 'react';
import { 
    ClipboardList, 
    Loader2,
    Calendar,
    Mail,
    Phone,
    ExternalLink,
    CheckCircle2,
    Clock,
    AlertCircle,
    ChevronDown,
    ImageIcon,
    Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export default function ManageOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/admin/orders');
            const data = await res.json();
            setOrders(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch orders');
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch('/api/admin/orders', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            });
            if (res.ok) {
                toast.success('Order status updated');
                fetchOrders();
            }
        } catch (error) {
            toast.error('Failed to update status');
        }
    };
    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this order?')) return;

        try {
            const res = await fetch(`/api/admin/orders?id=${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                toast.success('Order deleted');
                fetchOrders();
            } else {
                toast.error('Failed to delete order');
            }
        } catch (error) {
            toast.error('Error deleting order');
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'reviewed': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'in-progress': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'completed': return 'bg-green-100 text-green-700 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock size={14} />;
            case 'completed': return <CheckCircle2 size={14} />;
            case 'cancelled': return <AlertCircle size={14} />;
            default: return <Clock size={14} />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">Custom Orders</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-full border shadow-sm">
                    <ClipboardList size={16} /> {orders.length} Total Requests
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-green-500" size={40} />
                </div>
            ) : orders.length === 0 ? (
                <Card className="p-12 text-center border-dashed border-2">
                    <ClipboardList className="mx-auto text-slate-300 mb-4" size={48} />
                    <p className="text-slate-500">No order requests yet. They'll appear here when customers submit them!</p>
                </Card>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <Card key={order._id} className="p-6 border-none shadow-md bg-white hover:shadow-lg transition-all overflow-hidden border-l-4 border-l-green-500">
                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="flex-grow space-y-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h4 className="text-lg font-bold text-slate-800">{order.customerName}</h4>
                                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyles(order.status)}`}>
                                            {getStatusIcon(order.status)} {order.status}
                                        </div>
                                        <span className="text-xs text-slate-400 font-medium ml-auto">
                                            Submitted {new Date(order.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Mail size={16} className="text-slate-400" /> {order.customerEmail}
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Phone size={16} className="text-slate-400" /> {order.customerPhone}
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Calendar size={16} className="text-slate-400" /> Target: {new Date(order.targetDate).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vision Details</p>
                                        <p className="text-slate-700 leading-relaxed text-sm">{order.details}</p>
                                    </div>
                                </div>

                                <div className="lg:w-48 space-y-4">
                                    {order.inspirationImageUrl ? (
                                        <div className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200">
                                            <img 
                                                src={order.inspirationImageUrl} 
                                                alt="Inspiration" 
                                                className="w-full h-full object-cover"
                                            />
                                            <a 
                                                href={order.inspirationImageUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                                            >
                                                <ExternalLink size={20} />
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="aspect-square rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                                            <ImageIcon size={24} />
                                        </div>
                                    )}

                                    <div className="relative">
                                        <select 
                                            value={order.status}
                                            onChange={(e) => updateStatus(order._id, e.target.value)}
                                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-green-500 appearance-none pr-8"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="reviewed">Reviewed</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                    <Button 
                                        variant="outline" 
                                        className="w-full text-red-500 border-red-100 hover:bg-red-50 hover:text-red-600 rounded-lg text-xs font-bold gap-2"
                                        onClick={() => handleDelete(order._id)}
                                    >
                                        <Trash2 size={14} /> Delete Request
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
