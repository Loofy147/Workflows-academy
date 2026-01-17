import { useState } from "react";
import { useLocation } from "wouter";
import {
  LayoutDashboard,
  Zap,
  Package,
  BarChart3,
  Users,
  Settings,
  CreditCard,
  Key,
  User,
  Bell,
  Shield,
  HelpCircle,
  Webhook,
  Activity,
  Plug,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
      { label: "Workflows", href: "/workflows", icon: <Zap className="w-5 h-5" />, badge: 24 },
      { label: "Templates", href: "/templates", icon: <Package className="w-5 h-5" /> },
      { label: "Analytics", href: "/analytics", icon: <BarChart3 className="w-5 h-5" /> },
    ],
  },
  {
    title: "Creator",
    items: [
      { label: "My Templates", href: "/my-templates", icon: <Package className="w-5 h-5" /> },
      { label: "Publish Template", href: "/templates/publish", icon: <Plug className="w-5 h-5" /> },
      { label: "Payouts", href: "/creator/payouts", icon: <CreditCard className="w-5 h-5" /> },
    ],
  },
  {
    title: "Team & Settings",
    items: [
      { label: "Team", href: "/team", icon: <Users className="w-5 h-5" /> },
      { label: "Billing", href: "/billing", icon: <CreditCard className="w-5 h-5" /> },
      { label: "API Keys", href: "/api-keys", icon: <Key className="w-5 h-5" /> },
      { label: "Webhooks", href: "/webhooks", icon: <Webhook className="w-5 h-5" /> },
      { label: "Integrations", href: "/integrations", icon: <Plug className="w-5 h-5" /> },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Profile", href: "/profile", icon: <User className="w-5 h-5" /> },
      { label: "Notifications", href: "/notifications", icon: <Bell className="w-5 h-5" />, badge: 3 },
      { label: "Settings", href: "/account-settings", icon: <Shield className="w-5 h-5" /> },
      { label: "Activity", href: "/activity", icon: <Activity className="w-5 h-5" /> },
      { label: "Help", href: "/help", icon: <HelpCircle className="w-5 h-5" /> },
    ],
  },
];

export default function Sidebar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>("Main");

  const isActive = (href: string) => location === href;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 md:hidden"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-slate-800/50 border-r border-slate-700/50 backdrop-blur-sm overflow-y-auto transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-700/50">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            AgentFlow
          </h1>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-6">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              <button
                onClick={() =>
                  setExpandedSection(expandedSection === section.title ? null : section.title)
                }
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-slate-300 transition-colors"
              >
                {section.title}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedSection === section.title ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedSection === section.title && (
                <div className="mt-2 space-y-1">
                  {section.items.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                        isActive(item.href)
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                          : "text-slate-300 hover:bg-slate-700/30 hover:text-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50 bg-slate-800/30">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
