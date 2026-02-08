import { useState } from 'react';
import { MapPin, Building2, ChevronRight, AlertTriangle, ArrowRightCircle, ExternalLink, MessageCircle, CheckCircle, XCircle, Send } from 'lucide-react';
import { Lead } from '../lib/types';

export default function LeadCard({ lead }: { lead: Lead }) {
    const [status, setStatus] = useState(lead.status);
    const [notified, setNotified] = useState(false);
    const [loading, setLoading] = useState(false);

    const score = lead.confidence_score * 100;
    const API_URL = 'http://localhost:8000/api/v1';

    // Status Styling
    const statusClass = status === 'Accepted' ? 'badge-success' :
        (status === 'Rejected' ? 'badge-warning' : 'badge-neutral');

    // Urgency Styling
    const urgencyColor = lead.urgency === 'High' ? 'text-red-600 bg-red-50 border-red-100' :
        (lead.urgency === 'Medium' ? 'text-amber-600 bg-amber-50 border-amber-100' : 'text-slate-600 bg-slate-50 border-slate-100');

    // handlers
    const handleFeedback = async (newStatus: 'Accepted' | 'Rejected') => {
        try {
            await fetch(`${API_URL}/leads/${lead.lead_id}/feedback?status=${newStatus}`, { method: 'POST' });
            setStatus(newStatus);
        } catch (e) { console.error(e); }
    };

    const handleNotify = async () => {
        if (notified) return;
        setLoading(true);
        try {
            await fetch(`${API_URL}/leads/${lead.lead_id}/notify`, { method: 'POST' });
            setNotified(true);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    return (
        <div className="group corporate-card p-5 relative border-l-4 border-l-[#0047BB] hover:border-l-[#ED1C24] transition-all">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                    <div className="w-10 h-10 rounded bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200">
                        <Building2 size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-base text-slate-800 leading-tight">{lead.company_name}</h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin size={10} /> {lead.location} • <span className="text-slate-400">{lead.industry_segment}</span>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${urgencyColor} flex items-center gap-1`}>
                        {lead.urgency === 'High' && <AlertTriangle size={10} />} {lead.urgency} Priority
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${statusClass}`}>
                        {status}
                    </span>
                </div>
            </div>

            {/* Intelligence Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Confidence Meter */}
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-slate-500">Conviction Score</span>
                        <span className={`font-bold ${score > 75 ? 'text-[#0047BB]' : 'text-slate-600'}`}>{Math.round(score)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full ${score > 75 ? 'bg-[#0047BB]' : 'bg-slate-400'}`}
                            style={{ width: `${score}%` }}
                        ></div>
                    </div>
                </div>

                {/* Next Action */}
                <div className="bg-blue-50 border border-blue-100 rounded p-2 flex items-start gap-2">
                    <ArrowRightCircle size={14} className="text-[#0047BB] mt-0.5" />
                    <div>
                        <p className="text-[10px] text-blue-600 font-semibold uppercase tracking-wide">Suggested Action</p>
                        <p className="text-xs text-slate-800 font-medium leading-tight">{lead.suggested_next_action}</p>
                    </div>
                </div>
            </div>

            {/* Reasoning & Source */}
            <div className="bg-slate-50 p-3 rounded border border-slate-100 mb-4 relative group/source">
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 italic">
                    "{lead.reasoning.split(';')[0]}"
                </p>
                {lead.signals[0]?.url && (
                    <a href={lead.signals[0].url} target="_blank" rel="noreferrer" className="absolute top-2 right-2 text-slate-400 hover:text-[#0047BB] transition-colors">
                        <ExternalLink size={12} />
                    </a>
                )}
            </div>

            {/* Product Tags & Actions */}
            <div className="flex justify-between items-center border-t border-slate-100 pt-3 flex-wrap gap-3">
                <div className="flex flex-wrap gap-2">
                    {lead.inferred_products.slice(0, 3).map((p, i) => (
                        <span key={i} className="text-[10px] font-medium px-2 py-0.5 bg-white border border-slate-200 text-slate-600 rounded shadow-sm hover:border-[#0047BB] transition-colors cursor-default">
                            {p}
                        </span>
                    ))}
                    {lead.inferred_products.length > 3 && (
                        <span className="text-[10px] text-slate-400 px-1 py-0.5">+{lead.inferred_products.length - 3}</span>
                    )}
                </div>

                {/* Interaction Buttons */}
                <div className="flex items-center gap-2">
                    {/* WhatsApp Notify */}
                    <button
                        onClick={handleNotify}
                        disabled={loading || notified}
                        className={`p-1.5 rounded transition-colors ${notified ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600 hover:bg-[#25D366] hover:text-white'}`}
                        title="Send WhatsApp Alert"
                    >
                        {notified ? <CheckCircle size={16} /> : <MessageCircle size={16} />}
                    </button>

                    {/* Feedback Loop */}
                    {status === 'New' && (
                        <>
                            <button onClick={() => handleFeedback('Accepted')} className="p-1.5 rounded bg-slate-100 text-slate-500 hover:bg-emerald-100 hover:text-emerald-600 transition-colors" title="Accept Lead">
                                <CheckCircle size={16} />
                            </button>
                            <button onClick={() => handleFeedback('Rejected')} className="p-1.5 rounded bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-600 transition-colors" title="Reject Lead">
                                <XCircle size={16} />
                            </button>
                        </>
                    )}

                    <button className="text-xs font-semibold text-[#0047BB] hover:text-[#003388] flex items-center gap-1 transition-transform active:translate-x-1 ml-2">
                        Details <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
