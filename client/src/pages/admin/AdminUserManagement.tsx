import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash2, Shield, Ban, CheckCircle, AlertCircle, Mail } from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: "active" | "suspended" | "inactive";
  role: "user" | "creator" | "admin";
  workflows: number;
  templates: number;
  totalSpent: number;
  lastActive: string;
}

const USERS: AdminUser[] = [
  {
    id: "user_1",
    name: "John Smith",
    email: "john@example.com",
    joinDate: "2024-01-15",
    status: "active",
    role: "creator",
    workflows: 12,
    templates: 3,
    totalSpent: 450,
    lastActive: "2 minutes ago",
  },
  {
    id: "user_2",
    name: "Sarah Johnson",
    email: "sarah@company.com",
    joinDate: "2024-01-20",
    status: "active",
    role: "creator",
    workflows: 8,
    templates: 2,
    totalSpent: 320,
    lastActive: "1 hour ago",
  },
  {
    id: "user_3",
    name: "Mike Chen",
    email: "mike@company.com",
    joinDate: "2024-02-01",
    status: "active",
    role: "user",
    workflows: 5,
    templates: 0,
    totalSpent: 150,
    lastActive: "3 hours ago",
  },
  {
    id: "user_4",
    name: "Emma Davis",
    email: "emma@company.com",
    joinDate: "2024-02-05",
    status: "inactive",
    role: "user",
    workflows: 2,
    templates: 0,
    totalSpent: 50,
    lastActive: "5 days ago",
  },
  {
    id: "user_5",
    name: "Alex Rodriguez",
    email: "alex@company.com",
    joinDate: "2024-02-10",
    status: "suspended",
    role: "user",
    workflows: 0,
    templates: 0,
    totalSpent: 0,
    lastActive: "10 days ago",
  },
];

export default function AdminUserManagement() {
  const [, navigate] = useLocation();
  const [users, setUsers] = useState<AdminUser[]>(USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive" | "suspended">("all");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSuspendUser = (userId: string) => {
    setUsers(
      users.map((u) =>
        u.id === userId ? { ...u, status: u.status === "suspended" ? "active" : "suspended" } : u
      )
    );
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId));
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-100">User Management</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
            />
          </div>

          <div className="flex gap-2">
            {["all", "active", "inactive", "suspended"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === status
                    ? "bg-cyan-500 text-white"
                    : "bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-slate-600"
                }`}
              >
                {status === "all" ? "All Users" : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-800/30">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">User</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Workflows</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Templates</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Spent</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Last Active</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-all">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-100">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          user.status === "active"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : user.status === "inactive"
                              ? "bg-slate-700/30 text-slate-400"
                              : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-300 capitalize">{user.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-300">{user.workflows}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-300">{user.templates}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-300">${user.totalSpent}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-400">{user.lastActive}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSuspendUser(user.id)}
                          className="p-2 rounded-lg bg-slate-700/30 border border-slate-600/30 text-slate-300 hover:border-slate-600/50 transition-all"
                          title={user.status === "suspended" ? "Unsuspend" : "Suspend"}
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:border-red-500/50 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-4">
            <p className="text-sm text-slate-500 mb-1">Total Users</p>
            <p className="text-2xl font-bold text-slate-100">{users.length}</p>
          </div>
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-4">
            <p className="text-sm text-slate-500 mb-1">Active Users</p>
            <p className="text-2xl font-bold text-emerald-300">{users.filter((u) => u.status === "active").length}</p>
          </div>
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-4">
            <p className="text-sm text-slate-500 mb-1">Creators</p>
            <p className="text-2xl font-bold text-cyan-300">{users.filter((u) => u.role === "creator").length}</p>
          </div>
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-4">
            <p className="text-sm text-slate-500 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-purple-300">
              ${users.reduce((sum, u) => sum + u.totalSpent, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
