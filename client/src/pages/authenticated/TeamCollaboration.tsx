import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit2, Shield, Eye, Zap, Lock, LogOut, Mail } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  joinedDate: string;
  lastActive: string;
  status: "active" | "inactive";
}

interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "user_1",
    name: "You",
    email: "your@email.com",
    role: "admin",
    joinedDate: "2024-01-01",
    lastActive: "2 minutes ago",
    status: "active",
  },
  {
    id: "user_2",
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "editor",
    joinedDate: "2024-01-15",
    lastActive: "1 hour ago",
    status: "active",
  },
  {
    id: "user_3",
    name: "Mike Chen",
    email: "mike@company.com",
    role: "editor",
    joinedDate: "2024-01-20",
    lastActive: "3 hours ago",
    status: "active",
  },
  {
    id: "user_4",
    name: "Emma Davis",
    email: "emma@company.com",
    role: "viewer",
    joinedDate: "2024-02-01",
    lastActive: "2 days ago",
    status: "inactive",
  },
];

const AUDIT_LOGS: AuditLog[] = [
  {
    id: "log_1",
    action: "Workflow Published",
    user: "Sarah Johnson",
    timestamp: "2024-02-15 14:32",
    details: "Published KYC Verification Pipeline to marketplace",
  },
  {
    id: "log_2",
    action: "Member Added",
    user: "You",
    timestamp: "2024-02-15 10:15",
    details: "Added Emma Davis as Viewer",
  },
  {
    id: "log_3",
    action: "Workflow Executed",
    user: "Mike Chen",
    timestamp: "2024-02-14 16:45",
    details: "Executed Contract Analysis workflow - 45 credits used",
  },
  {
    id: "log_4",
    action: "Role Changed",
    user: "You",
    timestamp: "2024-02-14 09:20",
    details: "Changed Mike Chen role from Viewer to Editor",
  },
  {
    id: "log_5",
    action: "Workflow Created",
    user: "Sarah Johnson",
    timestamp: "2024-02-13 13:10",
    details: "Created new workflow: Invoice Processing Pipeline",
  },
];

const ROLE_PERMISSIONS = {
  admin: {
    label: "Admin",
    description: "Full access to all features",
    permissions: ["Create workflows", "Edit workflows", "Publish templates", "Manage team", "View analytics", "Manage billing"],
    icon: Shield,
  },
  editor: {
    label: "Editor",
    description: "Can create and edit workflows",
    permissions: ["Create workflows", "Edit workflows", "Publish templates", "View analytics"],
    icon: Edit2,
  },
  viewer: {
    label: "Viewer",
    description: "Read-only access",
    permissions: ["View workflows", "View analytics"],
    icon: Eye,
  },
};

export default function TeamCollaboration() {
  const [, navigate] = useLocation();
  const [members, setMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"editor" | "viewer">("editor");
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [selectedTab, setSelectedTab] = useState<"members" | "audit" | "permissions">("members");

  const handleInvite = () => {
    if (inviteEmail) {
      // Simulate invitation
      setShowInvite(false);
      setInviteEmail("");
      setInviteRole("editor");
    }
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(members.filter((m) => m.id !== memberId));
  };

  const handleChangeRole = (memberId: string, newRole: "admin" | "editor" | "viewer") => {
    setMembers(members.map((m) => (m.id === memberId ? { ...m, role: newRole } : m)));
    setEditingMember(null);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-100">Team Collaboration</h1>
          {!showInvite && (
            <Button
              onClick={() => setShowInvite(true)}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0"
            >
              <Plus className="w-4 h-4 mr-2" />
              Invite Member
            </Button>
          )}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Invite Modal */}
        {showInvite && (
          <div className="mb-8 rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <h2 className="text-lg font-bold text-slate-100 mb-4">Invite Team Member</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <Input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="bg-slate-800/50 border-slate-700 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full p-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-100"
                >
                  <option value="editor">Editor - Can create and edit workflows</option>
                  <option value="viewer">Viewer - Read-only access</option>
                </select>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowInvite(false)}
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleInvite}
                  disabled={!inviteEmail}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0 disabled:opacity-50"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Invite
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b border-slate-700/50">
          {["members", "audit", "permissions"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab as any)}
              className={`px-4 py-2 border-b-2 font-medium transition-all ${
                selectedTab === tab
                  ? "border-cyan-500 text-cyan-300"
                  : "border-transparent text-slate-400 hover:text-slate-300"
              }`}
            >
              {tab === "members" && "Team Members"}
              {tab === "audit" && "Audit Log"}
              {tab === "permissions" && "Role Permissions"}
            </button>
          ))}
        </div>

        {/* Team Members Tab */}
        {selectedTab === "members" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {members.map((member) => (
                <div key={member.id} className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-100">{member.name}</h3>
                      <p className="text-xs text-slate-500">{member.email}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        member.status === "active"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-slate-700/30 text-slate-400"
                      }`}
                    >
                      {member.status}
                    </span>
                  </div>

                  <div className="mb-4 space-y-2 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Role:</span>
                      <span className="text-slate-100 font-semibold capitalize">{member.role}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Joined:</span>
                      <span className="text-slate-100">{member.joinedDate}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Last Active:</span>
                      <span className="text-slate-100">{member.lastActive}</span>
                    </div>
                  </div>

                  {member.id !== "user_1" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingMember(member)}
                        className="flex-1 px-3 py-2 rounded-lg bg-slate-700/30 border border-slate-600/30 text-slate-300 hover:border-slate-600/50 text-sm font-medium transition-all"
                      >
                        <Edit2 className="w-3 h-3 inline mr-1" />
                        Change Role
                      </button>
                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="flex-1 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:border-red-500/50 text-sm font-medium transition-all"
                      >
                        <Trash2 className="w-3 h-3 inline mr-1" />
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Edit Role Modal */}
            {editingMember && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="rounded-lg bg-slate-800 border border-slate-700 p-6 max-w-md w-full">
                  <h2 className="text-lg font-bold text-slate-100 mb-4">Change Role</h2>
                  <p className="text-slate-400 mb-4">Select a new role for {editingMember.name}</p>

                  <div className="space-y-2 mb-6">
                    {(["admin", "editor", "viewer"] as const).map((role) => (
                      <button
                        key={role}
                        onClick={() => handleChangeRole(editingMember.id, role)}
                        className={`w-full p-3 rounded-lg border text-left transition-all ${
                          editingMember.role === role
                            ? "bg-cyan-500/20 border-cyan-500/30"
                            : "bg-slate-700/30 border-slate-600/30 hover:border-slate-600/50"
                        }`}
                      >
                        <p className="font-semibold text-slate-100 capitalize">{role}</p>
                        <p className="text-xs text-slate-400">{ROLE_PERMISSIONS[role].description}</p>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setEditingMember(null)}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 font-medium transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Audit Log Tab */}
        {selectedTab === "audit" && (
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50 bg-slate-800/30">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">User</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {AUDIT_LOGS.map((log) => (
                    <tr key={log.id} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-all">
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded text-xs bg-cyan-500/20 text-cyan-300 font-semibold">
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-100">{log.user}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-400">{log.timestamp}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-400">{log.details}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {selectedTab === "permissions" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(["admin", "editor", "viewer"] as const).map((role) => {
              const RoleIcon = ROLE_PERMISSIONS[role].icon;
              return (
                <div key={role} className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <RoleIcon className="w-6 h-6 text-cyan-400" />
                    <div>
                      <h3 className="font-bold text-slate-100">{ROLE_PERMISSIONS[role].label}</h3>
                      <p className="text-xs text-slate-500">{ROLE_PERMISSIONS[role].description}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {ROLE_PERMISSIONS[role].permissions.map((permission) => (
                      <div key={permission} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                          <span className="text-xs text-emerald-300">✓</span>
                        </div>
                        <span className="text-sm text-slate-300">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
