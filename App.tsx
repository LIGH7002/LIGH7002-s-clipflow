
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  History, 
  Settings, 
  PlusCircle, 
  Bell, 
  Search, 
  LogOut, 
  Youtube, 
  CheckCircle2, 
  Zap, 
  CreditCard,
  Menu,
  X
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import ClipHistory from './pages/ClipHistory';
import SettingsPage from './pages/SettingsPage';
import LandingPage from './pages/LandingPage';
import { User } from './types';

// Mock Auth Context
const UserContext = React.createContext<{
  user: User | null;
  setUser: (u: User | null) => void;
}>({ user: null, setUser: () => {} });

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Clip History', path: '/history', icon: History },
    { name: 'Integrations', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-white/80 backdrop-blur-xl border-r border-gray-100 flex flex-col p-6 fixed left-0 top-0 z-50 transition-all duration-300">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">C</div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">ClipFlow</span>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
              isActive(link.path) 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <link.icon size={20} />
            <span className="font-medium">{link.name}</span>
          </Link>
        ))}
      </nav>

      <div className="pt-6 border-t border-gray-100 mt-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 px-4 py-3 w-full text-gray-500 hover:text-red-600 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

const Header = ({ user }: { user: User }) => {
  return (
    <header className="h-16 flex items-center justify-between px-8 bg-white/60 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 ml-64">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search clips..." 
          className="w-full pl-10 pr-4 py-2 bg-gray-100/50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-yellow-50 border border-yellow-100 rounded-full">
          <Zap size={14} className="text-yellow-600 fill-yellow-600" />
          <span className="text-xs font-semibold text-yellow-700">PRO PLAN</span>
        </div>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center overflow-hidden">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};

// Use an interface for Layout props to ensure correct typing of children
interface LayoutProps {
  children: React.ReactNode;
  user: User;
}

const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Sidebar />
      <Header user={user} />
      <main className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>({
    id: 'u1',
    name: 'Alex Rivera',
    email: 'alex@creator.io',
    avatar: 'https://picsum.photos/seed/alex/200',
    isPro: true,
    youtubeConnected: true,
    tiktokConnected: true,
    igConnected: false
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={
            user ? <Layout user={user}><Dashboard /></Layout> : <LandingPage />
          } />
          <Route path="/history" element={
            user ? <Layout user={user}><ClipHistory /></Layout> : <LandingPage />
          } />
          <Route path="/settings" element={
            user ? <Layout user={user}><SettingsPage /></Layout> : <LandingPage />
          } />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
