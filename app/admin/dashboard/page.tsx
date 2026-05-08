'use client';

import React, { useState, useEffect } from 'react';
import { 
    ShoppingBag, 
    Image as ImageIcon, 
    ClipboardList, 
    Users,
    TrendingUp,
    Clock
} from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        products: 0,
        gallery: 0,
        orders: 0,
        pendingOrders: 0
    });

    useEffect(() => {
        // Fetch basic stats
        const fetchStats = async () => {
            try {
                const [pRes, gRes, oRes] = await Promise.all([
                    fetch('/api/admin/products'),
                    fetch('/api/admin/gallery'),
                    fetch('/api/admin/orders')
                ]);

                const products = await pRes.json();
                const gallery = await gRes.json();
                const orders = await oRes.json();

                setStats({
                    products: products.length || 0,
                    gallery: gallery.length || 0,
                    orders: orders.length || 0,
                    pendingOrders: orders.filter((o: any) => o.status === 'pending').length || 0
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { name: 'Total Products', value: stats.products, icon: ShoppingBag, color: 'bg-blue-500' },
        { name: 'Gallery Items', value: stats.gallery, icon: ImageIcon, color: 'bg-purple-500' },
        { name: 'Total Orders', value: stats.orders, icon: ClipboardList, color: 'bg-green-500' },
        { name: 'Pending Orders', value: stats.pendingOrders, icon: Clock, color: 'bg-amber-500' },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.name} className="p-6 border-none shadow-md bg-white hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className={`${stat.color} p-3 rounded-2xl text-white`}>
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                                    <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-8 border-none shadow-md bg-white">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <TrendingUp size={20} className="text-green-500" /> Recent Activity
                    </h3>
                    <div className="space-y-6">
                        <p className="text-slate-400 text-center py-8">Activity feed coming soon...</p>
                    </div>
                </Card>

                <Card className="p-8 border-none shadow-md bg-white">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <Users size={20} className="text-blue-500" /> Admin Note
                    </h3>
                    <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                        <p className="text-amber-800 text-sm leading-relaxed">
                            Welcome to the Blinged in Grace Admin Dashboard. From here you can manage your product listings, 
                            showcase new gallery pieces, and track custom order requests from your customers.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
