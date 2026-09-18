import { LayoutDashboard, Users, FileText, Clock3, Upload, Settings, HeartPulse } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/patients', label: 'Patients', icon: Users },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/timeline', label: 'Timeline', icon: Clock3 },
  { to: '/upload', label: 'Upload Document', icon: Upload },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-72 flex-col border-r border-slate-200 bg-white px-4 py-6">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
          <HeartPulse className="h-5 w-5" />
        </div>
        <div>
          <div className="text-lg font-semibold text-slate-900">MediTimeline AI</div>
          <div className="text-xs text-slate-500">Hackathon Prototype</div>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-xl bg-slate-50 p-3">
        <div className="font-semibold text-slate-800">MediTimeline AI</div>
        <div className="text-xs text-slate-500">Hackathon Prototype</div>
      </div>
    </aside>
  );
}
