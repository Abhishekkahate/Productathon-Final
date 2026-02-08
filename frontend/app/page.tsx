"use client";

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import LeadCard from '../components/LeadCard';
import StatCard from '../components/StatCard';
import { BarChart2, User, List, Sparkles } from 'lucide-react';
import { Lead } from '../lib/types';

export default function Home() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [activeTab, setActiveTab] = useState('leads');
    const [loading, setLoading] = useState(true);

    // NOTE: In production, configure env variable for API URL
    const API_URL = 'http://localhost:8000/api/v1';

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async (refresh = false) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/leads?refresh=${refresh}`);
            const data = await res.json();
            setLeads(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pb-12 bg-slate-50">
            <Header onRefresh={() => fetchLeads(true)} />

            <main className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
                {/* Page Title & Controls - Corporate Header Style */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
                        <p className="text-sm text-slate-500">Welcome back, Sales Officer</p>
                    </div>

                    {/* Standard Tab Navigation Pill */}
                    <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex">
                        <NavTab id="leads" label="Leads" icon={<List size={16} />} active={activeTab} set={setActiveTab} />
                        <NavTab id="dashboard" label="Analytics" icon={<BarChart2 size={16} />} active={activeTab} set={setActiveTab} />
                        <NavTab id="profile" label="Profile" icon={<User size={16} />} active={activeTab} set={setActiveTab} />
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 opacity-60">
                        <div className="w-12 h-12 border-4 border-slate-200 border-t-[#0047BB] rounded-full animate-spin mb-4"></div>
                        <p className="text-sm font-medium text-slate-500 tracking-wide">Retrieving Enterprise Data...</p>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        {activeTab === 'leads' && (
                            <div className="space-y-4 max-w-3xl mx-auto">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-lg text-slate-800">Priority Leads</h3>
                                    <span className="text-xs font-semibold bg-blue-50 text-[#0047BB] px-2 py-1 rounded border border-blue-100">
                                        {leads.length} Identified
                                    </span>
                                </div>
                                <div className="grid gap-4">
                                    {leads.map((lead) => (
                                        <LeadCard key={lead.lead_id} lead={lead} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'dashboard' && (
                            <div className="max-w-4xl mx-auto space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <StatCard label="Total Pipeline Opportunities" value={leads.length} />
                                    <StatCard label="High Conviction (>80%)" value={leads.filter((l) => l.confidence_score > 0.8).length} highlight />
                                </div>

                                <div className="corporate-card p-6">
                                    <h3 className="font-bold text-sm text-slate-700 uppercase tracking-wide mb-4 border-b border-slate-100 pb-2">
                                        Inferred Product Demand
                                    </h3>
                                    <div className="space-y-4">
                                        {Array.from(new Set(leads.flatMap(l => l.inferred_products))).slice(0, 5).map((p, i) => (
                                            <div key={i} className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-slate-600 w-1/3">{p}</span>
                                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden mx-4">
                                                    <div className="h-full bg-[#0047BB] rounded-full" style={{ width: `${Math.random() * 50 + 30}%` }}></div>
                                                </div>
                                                <span className="text-xs text-slate-400 w-8 text-right">{Math.floor(Math.random() * 20 + 5)}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div className="max-w-2xl mx-auto corporate-card p-8">
                                <div className="flex items-center gap-6 mb-8 border-b border-slate-100 pb-6">
                                    <div className="w-20 h-20 rounded-full border-4 border-slate-50 shadow-inner overflow-hidden">
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Officer" alt="User" className="w-full h-full bg-slate-50" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">Sales Officer</h2>
                                        <p className="text-slate-500">HPCL North Zone Division</p>
                                        <div className="mt-2 flex gap-2">
                                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">ID: HP-8821</span>
                                            <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded border border-emerald-100">Active</span>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-sm font-bold text-slate-800 mb-4">System Preferences</h3>
                                <div className="space-y-1">
                                    <div className="p-4 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-200 transition cursor-pointer flex justify-between items-center">
                                        <span className="text-sm font-medium text-slate-700">Email Notifications</span>
                                        <div className="w-9 h-5 bg-[#0047BB] rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div></div>
                                    </div>
                                    <div className="p-4 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-200 transition cursor-pointer flex justify-between items-center">
                                        <span className="text-sm font-medium text-slate-700">Analytical Mode</span>
                                        <div className="w-9 h-5 bg-slate-200 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

interface NavTabProps {
    id: string;
    label: string;
    icon: React.ReactNode;
    active: string;
    set: (id: string) => void;
}

const NavTab = ({ id, label, icon, active, set }: NavTabProps) => {
    const isActive = active === id;
    return (
        <button
            onClick={() => set(id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${isActive
                    ? 'bg-[#0047BB] text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
        >
            {icon}
            <span className="hidden sm:inline">{label}</span>
        </button>
    )
}
