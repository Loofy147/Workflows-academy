import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Trash2, Archive, CheckCircle, AlertCircle, Info } from "lucide-react";

interface Notification {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Workflow Completed",
    message: "Your 'Customer Onboarding' workflow executed successfully",
    timestamp: "2 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "info",
    title: "Template Published",
    message: "Your template 'KYC Verification' has been published to the marketplace",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "error",
    title: "Workflow Failed",
    message: "Your 'Invoice Processing' workflow failed at step 3",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "4",
    type: "info",
    title: "Payment Received",
    message: "You earned $45.50 from template usage this month",
    timestamp: "1 day ago",
    read: true,
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread" | "success" | "error" | "info">("all");

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter !== "all") return n.type === filter;
    return true;
  });

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Info className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Bell className="w-6 h-6" />
            Notifications
          </h1>
          <div className="text-sm text-slate-400">
            {notifications.filter((n) => !n.read).length} unread
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {["all", "unread", "success", "error", "info"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                filter === f
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-slate-600"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filtered.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-all ${
                notification.read
                  ? "bg-slate-800/30 border-slate-700/50"
                  : "bg-slate-800/50 border-slate-700/50 ring-1 ring-cyan-500/20"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{getIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-100">{notification.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">{notification.message}</p>
                  <p className="text-xs text-slate-500 mt-2">{notification.timestamp}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {!notification.read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="p-2 rounded-lg bg-slate-700/30 border border-slate-600/30 text-slate-300 hover:border-slate-600/50 transition-all"
                      title="Mark as read"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:border-red-500/50 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
