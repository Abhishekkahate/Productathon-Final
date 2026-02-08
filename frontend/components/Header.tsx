
import { Droplet, RefreshCw, Bell, Search } from 'lucide-react';

interface HeaderProps {
    onRefresh: () => void;
}

export default function Header({ onRefresh }: HeaderProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 corporate-header transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">

                {/* Brand / Logo Area */}
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-white flex items-center justify-center shadow-md">
                        {/* HPCL Logo Placeholder - Blue Droplet on White */}
                        <Droplet size={24} className="text-[#0047BB] fill-[#0047BB]" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight tracking-tight text-white">HP-LeadAgent</h1>
                        <p className="text-[10px] font-medium tracking-wide text-blue-100 opacity-90 uppercase">B2B Intelligence Portal</p>
                    </div>
                </div>

                {/* Search Bar (Mock) - for Professional Look */}
                <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={16} className="text-blue-200" />
                    </div>
                    <input type="text" className="block w-full pl-10 pr-3 py-1.5 border border-blue-400/30 rounded-md leading-5 bg-blue-800/30 text-white placeholder-blue-200 focus:outline-none focus:bg-blue-900/40 focus:border-white/50 sm:text-sm transition duration-150 ease-in-out" placeholder="Search leads, companies..." />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button onClick={onRefresh} className="p-2 rounded-full hover:bg-white/10 transition text-white/90">
                        <RefreshCw size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-white/10 transition text-white/90 relative">
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#0047BB]"></span>
                    </button>
                    <div className="flex items-center gap-3 pl-4 border-l border-blue-400/30">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-semibold text-white">Sales Officer</p>
                            <p className="text-[10px] text-blue-200">North Zone</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/20 p-0.5 ring-1 ring-white/30">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Officer" alt="User" className="bg-white rounded-full w-full h-full" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
