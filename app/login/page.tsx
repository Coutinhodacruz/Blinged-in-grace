'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Loader2, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Login successful!');
                if (data.user.role === 'admin') {
                    router.push('/admin/dashboard');
                } else {
                    router.push('/');
                }
            } else {
                toast.error(data.message || 'Login failed');
            }
        } catch (error) {
            toast.error('An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            <Card className="w-full max-w-md p-8 border-none shadow-2xl bg-white/80 backdrop-blur-md">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20 rotate-3">
                        <Sparkles className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-slate-800 italic">Blinged in Grace</h1>
                    <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-bold">Admin Portal</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-slate-500 ml-1 tracking-widest">Email Address</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@blingedingrace.com"
                                className="w-full border border-slate-200 rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-amber-500 outline-none transition-all bg-white/50"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-slate-500 ml-1 tracking-widest">Password</label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full border border-slate-200 rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-amber-500 outline-none transition-all bg-white/50"
                            />
                        </div>
                    </div>

                    <Button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold tracking-widest uppercase shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : (
                            <>Sign In <ArrowRight size={18} /></>
                        )}
                    </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-400 italic">
                        Handcrafted with love & grace.
                    </p>
                </div>
            </Card>
        </div>
    );
}
