
import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  RefreshCw, 
  Play, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Loader2,
  MoreVertical,
  Youtube,
  Instagram,
  Music,
  Info
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { AppStatus, Clip } from '../types';
import { analyzeVideoTranscript } from '../services/geminiService';

const data = [
  { name: 'Mon', views: 4000 },
  { name: 'Tue', views: 3000 },
  { name: 'Wed', views: 2000 },
  { name: 'Thu', views: 2780 },
  { name: 'Fri', views: 1890 },
  { name: 'Sat', views: 2390 },
  { name: 'Sun', views: 3490 },
];

const MOCK_TRANSCRIPT = "Hey guys! Today we are looking at the new Apple Vision Pro. It is absolutely insane how the eye tracking works. I've never seen anything like this before. Let me show you this one feature where you can actually look at a button and just tap your fingers to select it. This is the future of computing and it's happening right now...";

const Dashboard: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [progress, setProgress] = useState(0);
  const [recentClips, setRecentClips] = useState<Clip[]>([
    { 
      id: '1', 
      originalVideoId: 'v1', 
      title: 'Eye Tracking Demo', 
      thumbnail: 'https://picsum.photos/seed/clip1/300/500', 
      timestamp: '12:05', 
      duration: '0:45', 
      platforms: ['youtube', 'tiktok'], 
      status: 'published', 
      views: 12400,
      viralReason: "High curiosity gap and visual 'magic' demonstration."
    },
    { 
      id: '2', 
      originalVideoId: 'v1', 
      title: 'Future of Computing', 
      thumbnail: 'https://picsum.photos/seed/clip2/300/500', 
      timestamp: '08:20', 
      duration: '0:30', 
      platforms: ['tiktok', 'instagram'], 
      status: 'published', 
      views: 8900,
      viralReason: "Controversial claim about the 'future' sparks debate."
    },
  ]);

  const getStatusText = (status: AppStatus) => {
    switch (status) {
      case AppStatus.SCANNING: return "Scanning for new uploads...";
      case AppStatus.EXTRACTING: return "Extracting high-fidelity audio...";
      case AppStatus.ANALYZING: return "Viral Analysis (Gemini 3 Flash)...";
      case AppStatus.CUTTING: return "Generating 9:16 vertical crop...";
      case AppStatus.UPLOADING: return "Pushing to TikTok & Reels...";
      case AppStatus.COMPLETE: return "Success! Clips live.";
      default: return "";
    }
  };

  const runAutomationTask = async () => {
    setStatus(AppStatus.SCANNING);
    setProgress(10);
    
    await new Promise(r => setTimeout(r, 1500));
    setStatus(AppStatus.EXTRACTING);
    setProgress(30);
    
    await new Promise(r => setTimeout(r, 1500));
    setStatus(AppStatus.ANALYZING);
    setProgress(55);
    
    const analysis = await analyzeVideoTranscript(MOCK_TRANSCRIPT);

    setStatus(AppStatus.CUTTING);
    setProgress(80);
    
    await new Promise(r => setTimeout(r, 2000));
    setStatus(AppStatus.UPLOADING);
    setProgress(95);
    
    await new Promise(r => setTimeout(r, 1500));
    setStatus(AppStatus.COMPLETE);
    setProgress(100);

    const segment = analysis.segments[0];
    const newClip: Clip = {
      id: Math.random().toString(),
      originalVideoId: 'v3',
      title: segment.hookTitle,
      thumbnail: `https://picsum.photos/seed/${Math.random()}/300/500`,
      timestamp: 'Just now',
      duration: '0:42',
      platforms: ['youtube', 'tiktok', 'instagram'],
      status: 'published',
      views: 0,
      viralReason: segment.viralReason
    };

    setRecentClips(prev => [newClip, ...prev]);

    setTimeout(() => {
      setStatus(AppStatus.IDLE);
      setProgress(0);
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Top Banner / Status */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 ios-shadow flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome back, Alex!</h1>
          <p className="text-gray-500">Your Viral Content Engine is ready to process new hits.</p>
        </div>
        <button 
          onClick={runAutomationTask}
          disabled={status !== AppStatus.IDLE}
          className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all ${
            status === AppStatus.IDLE 
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-95' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {status === AppStatus.IDLE ? (
            <><RefreshCw size={20} /> Force Viral Scan</>
          ) : (
            <><Loader2 size={20} className="animate-spin" /> RUNNING...</>
          )}
        </button>
      </div>

      {status !== AppStatus.IDLE && (
        <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-6 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-blue-700 uppercase tracking-wider">{getStatusText(status)}</span>
            <span className="text-sm font-bold text-blue-700">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Stats Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <StatCard label="Avg Retention" value="78%" trend="+4.2%" />
            <StatCard label="Clips Created" value="142" trend="+8" />
            <StatCard label="Total Shares" value="42.8K" trend="+1.2K" />
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 ios-shadow">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold">Views across platforms</h3>
              <select className="bg-gray-50 border-none rounded-xl text-sm px-3 py-1 font-medium text-gray-500">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                  />
                  <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Clips */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 ios-shadow overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Recent Clips</h3>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</button>
          </div>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {recentClips.map((clip) => (
              <div key={clip.id} className="flex gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-100">
                <div className="relative w-20 h-28 rounded-xl overflow-hidden shrink-0 shadow-sm">
                  <img src={clip.thumbnail} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={20} className="text-white fill-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <h4 className="font-bold text-gray-900 truncate">{clip.title}</h4>
                  <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <Clock size={12} /> {clip.timestamp} • {clip.duration}
                  </p>
                  
                  {clip.viralReason && (
                    <div className="flex items-start gap-1.5 mb-2 bg-blue-50/80 p-1.5 rounded-lg border border-blue-100">
                      <Info size={12} className="text-blue-600 mt-0.5 shrink-0" />
                      <p className="text-[10px] text-blue-800 leading-tight italic line-clamp-2">
                        {clip.viralReason}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mb-2">
                    {clip.platforms.includes('youtube') && <Youtube size={14} className="text-red-500" />}
                    {clip.platforms.includes('tiktok') && <Music size={14} className="text-black" />}
                    {clip.platforms.includes('instagram') && <Instagram size={14} className="text-pink-500" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, trend }: { label: string, value: string, trend: string }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 ios-shadow">
    <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
    <div className="flex items-end gap-2">
      <h4 className="text-2xl font-bold text-gray-900 leading-none">{value}</h4>
      <span className="text-xs font-bold text-green-500 mb-0.5">{trend}</span>
    </div>
  </div>
);

export default Dashboard;
