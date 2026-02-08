
import { TrendingUp, Activity } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: number;
    highlight?: boolean;
}

export default function StatCard({ label, value, highlight = false }: StatCardProps) {
    return (
        <div className="corporate-card p-5 h-24 flex flex-col justify-between relative overflow-hidden">
            {highlight && (
                <div className="absolute right-0 top-0 p-2 opacity-5">
                    <TrendingUp size={64} className="text-[#0047BB]" />
                </div>
            )}

            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</p>

            <div className="flex items-end gap-2 relative z-10">
                <p className={`text-3xl font-bold tracking-tight ${highlight ? 'text-[#0047BB]' : 'text-slate-800'}`}>
                    {value}
                </p>
                {highlight && (
                    <div className="mb-1 flex items-center text-xs text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                        <TrendingUp size={12} className="mr-0.5" /> +12%
                    </div>
                )}
            </div>
        </div>
    )
}
