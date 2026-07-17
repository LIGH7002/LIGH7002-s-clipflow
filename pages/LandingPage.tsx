
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Youtube, Instagram, Smartphone, CheckCircle2, ArrowRight, Play } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">C</div>
            <span className="text-xl font-bold tracking-tight">ClipFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-black">Features</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-black">Pricing</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-black">Blog</a>
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2.5 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-black/10"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold mb-6">
            <Zap size={14} className="fill-blue-600" />
            POWERED BY GEMINI 3 FLASH
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            Turn your YouTube videos <br />
            <span className="text-blue-600">into viral clips.</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            ClipFlow automatically detects new uploads, extracts engaging moments, and posts them to TikTok, Reels, and Shorts using AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2"
            >
              Start Your Free Trial <ArrowRight size={20} />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              <Play size={20} className="fill-black" /> Watch Demo
            </button>
          </div>
          <div className="mt-16 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl blur-2xl opacity-50 -z-10"></div>
            <img 
              src="https://picsum.photos/seed/dashboard/1200/600" 
              alt="Dashboard Preview" 
              className="rounded-3xl border border-gray-200 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to grow fast.</h2>
            <p className="text-gray-500">Automated workflows that save you 20+ hours a week.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Youtube, title: "Channel Sync", desc: "Connect your YouTube channel and we'll watch for new uploads 24/7." },
              { icon: Smartphone, title: "9:16 Formatting", desc: "Our AI intelligently crops and zooms to keep the action centered for vertical viewing." },
              { icon: CheckCircle2, title: "Auto-Captions", desc: "Stunning animated captions generated with Whisper for max engagement." }
            ].map((f, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl ios-shadow border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <f.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
