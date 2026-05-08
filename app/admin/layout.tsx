'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
    LayoutDashboard, 
    ShoppingBag, 
    Image as ImageIcon, 
    ClipboardList, 
    LogOut,
    Menu,
    X,
    Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
        { name: 'Shop Items', icon: ShoppingBag, href: '/admin/shop' },
        { name: 'Gallery Items', icon: ImageIcon, href: '/admin/gallery' },
        { name: 'Orders', icon: ClipboardList, href: '/admin/orders' },
    ];

    const handleLogout = async () => {
        // Simple logout: clear cookie and redirect
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside 
                className={`${
                    isSidebarOpen ? 'w-64' : 'w-20'
                } bg-slate-900 text-white transition-all duration-300 flex flex-col fixed h-full z-50`}
            >
                <div className="p-6 flex items-center justify-between">
                    {isSidebarOpen && (
                        <Link href="/" className="flex items-center gap-2">
                            <Sparkles className="text-amber-400 w-6 h-6" />
                            <span className="font-display font-bold text-lg tracking-wider">BIG ADMIN</span>
                        </Link>
                    )}
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="hover:bg-slate-800 p-2 rounded-lg transition-colors"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-grow mt-6 px-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link 
                                key={item.name} 
                                href={item.href}
                                className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
                                    isActive 
                                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' 
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                <Icon size={22} className={isActive ? 'text-white' : 'group-hover:text-amber-400'} />
                                {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-slate-800">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-4 text-slate-400 hover:text-red-400 transition-colors w-full p-2"
                    >
                        <LogOut size={22} />
                        {isSidebarOpen && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main 
                className={`flex-grow transition-all duration-300 ${
                    isSidebarOpen ? 'ml-64' : 'ml-20'
                }`}
            >
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
                    <h2 className="text-xl font-bold text-slate-800 capitalize">
                        {pathname.split('/').pop()?.replace('-', ' ')}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
                            AD
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
