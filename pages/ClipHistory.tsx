
import React from 'react';
import { Search, Filter, MoreHorizontal, Eye, Share2, Trash2, Download } from 'lucide-react';

const ClipHistory: React.FC = () => {
  const clips = Array.from({ length: 9 }).map((_, i) => ({
    id: `clip-${i}`,
    title: `Amazing Tech Feature ${i + 1}`,
    thumbnail: `https://picsum.photos/seed/clip-${i}/400/700`,
    date: 'Oct 24, 2023',
    views: '12.4K',
    engagement: '8.4%',
    status: i % 3 === 0 ? 'Viral' : 'Stable'
  }));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Clip History</h1>
          <p className="text-gray-500">Review and manage your automated content library.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
            <Filter size={18} /> Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            <Download size={18} /> Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clips.map((clip) => (
          <div key={clip.id} className="bg-white rounded-[2.5rem] border border-gray-100 ios-shadow overflow-hidden group hover:scale-[1.02] transition-all duration-300">
            <div className="relative aspect-[9/16] bg-gray-100">
              <img src={clip.thumbnail} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  clip.status === 'Viral' ? 'bg-orange-500 text-white' : 'bg-black/50 text-white backdrop-blur-md'
                }`}>
                  {clip.status}
                </span>
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:scale-110 transition-transform">
                    <Eye size={22} />
                  </button>
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:scale-110 transition-transform">
                    <Share2 size={22} />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight mb-1">{clip.title}</h3>
                  <p className="text-xs text-gray-400">{clip.date}</p>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-900">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Views</p>
                  <p className="text-sm font-bold text-gray-900">{clip.views}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Engagement</p>
                  <p className="text-sm font-bold text-gray-900">{clip.engagement}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClipHistory;
