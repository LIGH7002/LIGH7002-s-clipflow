
import React from 'react';
import { 
  Youtube, 
  Instagram, 
  CheckCircle2, 
  CreditCard, 
  Shield, 
  Bell, 
  User,
  ArrowUpRight,
  Music,
  LogOut
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
      <section>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-500">Manage your account, integrations, and preferences.</p>
      </section>

      {/* Integrations */}
      <section>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          Connected Accounts
        </h3>
        <div className="grid gap-4">
          <IntegrationItem 
            icon={Youtube} 
            name="YouTube" 
            account="TechInsights Channel" 
            status="connected" 
            color="bg-red-50 text-red-600" 
          />
          <IntegrationItem 
            icon={Music} 
            name="TikTok" 
            account="@tech_insights" 
            status="connected" 
            color="bg-black text-white" 
          />
          <IntegrationItem 
            icon={Instagram} 
            name="Instagram Reels" 
            account="Not Connected" 
            status="disconnected" 
            color="bg-pink-50 text-pink-600" 
          />
        </div>
      </section>

      {/* Subscription */}
      <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 ios-shadow overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10 blur-2xl"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-widest">Active Plan</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">ClipFlow Pro</h3>
            <p className="text-gray-500">$29.00 / month • Next billing Nov 24, 2023</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-3 bg-gray-100 text-gray-900 rounded-2xl font-bold hover:bg-gray-200 transition-all">Manage Billing</button>
            <button className="px-6 py-3 bg-black text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg shadow-black/10">
              Upgrade <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* General Settings */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 ios-shadow space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
              <Bell size={20} />
            </div>
            <h4 className="font-bold">Notifications</h4>
          </div>
          <ToggleItem label="New clip generated" checked={true} />
          <ToggleItem label="Success upload reports" checked={true} />
          <ToggleItem label="Viral trend alerts" checked={false} />
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-gray-100 ios-shadow space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
              <Shield size={20} />
            </div>
            <h4 className="font-bold">Privacy & Security</h4>
          </div>
          <ToggleItem label="Two-factor auth" checked={true} />
          <ToggleItem label="Data sharing" checked={false} />
          <button className="w-full text-left text-sm font-bold text-red-500 mt-2 flex items-center gap-2">
            <LogOut size={16} /> Delete Account
          </button>
        </div>
      </section>
    </div>
  );
};

const IntegrationItem = ({ icon: Icon, name, account, status, color }: any) => (
  <div className="bg-white p-5 rounded-3xl border border-gray-100 ios-shadow flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center`}>
        <Icon size={24} />
      </div>
      <div>
        <h4 className="font-bold text-gray-900">{name}</h4>
        <p className="text-sm text-gray-500">{account}</p>
      </div>
    </div>
    {status === 'connected' ? (
      <div className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-3 py-1.5 rounded-full">
        <CheckCircle2 size={16} /> Connected
      </div>
    ) : (
      <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all">
        Connect Account
      </button>
    )}
  </div>
);

const ToggleItem = ({ label, checked }: { label: string, checked: boolean }) => (
  <div className="flex items-center justify-between py-1">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <button className={`w-10 h-5 rounded-full transition-colors relative ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}>
      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${checked ? 'left-6' : 'left-1'}`}></div>
    </button>
  </div>
);

export default SettingsPage;
