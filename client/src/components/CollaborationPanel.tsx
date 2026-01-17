import { useState, useEffect } from "react";
import { Users, UserPlus, Eye, Edit2, CheckCircle } from "lucide-react";

interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "owner" | "editor" | "viewer";
  status: "online" | "offline" | "idle";
  cursorPosition?: { x: number; y: number };
  lastActive: Date;
  color: string;
}

interface CollaborationPanelProps {
  workflowId: string;
  isOpen?: boolean;
}

const MOCK_COLLABORATORS: Collaborator[] = [
  {
    id: "1",
    name: "You",
    email: "you@example.com",
    avatar: "👤",
    role: "owner",
    status: "online",
    lastActive: new Date(),
    color: "#06b6d4",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "👩",
    role: "editor",
    status: "online",
    lastActive: new Date(),
    color: "#a855f7",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@example.com",
    avatar: "👨",
    role: "viewer",
    status: "idle",
    lastActive: new Date(Date.now() - 5 * 60000),
    color: "#f59e0b",
  },
];

export default function CollaborationPanel({ workflowId, isOpen = true }: CollaborationPanelProps) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>(MOCK_COLLABORATORS);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleInvite = () => {
    if (inviteEmail) {
      const newCollaborator: Collaborator = {
        id: Date.now().toString(),
        name: inviteEmail.split("@")[0],
        email: inviteEmail,
        avatar: "👤",
        role: "editor",
        status: "offline",
        lastActive: new Date(),
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      };
      setCollaborators([...collaborators, newCollaborator]);
      setInviteEmail("");
      setShowInvite(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <CheckCircle className="w-4 h-4 text-cyan-400" />;
      case "editor":
        return <Edit2 className="w-4 h-4 text-purple-400" />;
      case "viewer":
        return <Eye className="w-4 h-4 text-slate-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-emerald-400";
      case "idle":
        return "bg-yellow-400";
      case "offline":
        return "bg-slate-500";
      default:
        return "bg-slate-500";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-slate-800/50 border-l border-slate-700/50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Collaborators ({collaborators.length})
          </h3>
          <button
            onClick={() => setShowInvite(!showInvite)}
            className="p-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:border-cyan-500/50 transition-all"
            title="Invite collaborator"
          >
            <UserPlus className="w-4 h-4" />
          </button>
        </div>

        {showInvite && (
          <div className="space-y-2">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleInvite()}
              placeholder="Enter email address"
              className="w-full px-3 py-2 rounded-lg bg-slate-700/30 border border-slate-600 text-slate-100 placeholder-slate-500 text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={handleInvite}
                className="flex-1 px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-all"
              >
                Invite
              </button>
              <button
                onClick={() => setShowInvite(false)}
                className="flex-1 px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 text-sm font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Collaborators List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {collaborators.map((collaborator) => (
          <div
            key={collaborator.id}
            className="p-3 rounded-lg bg-slate-700/30 border border-slate-600/30 hover:border-slate-600/50 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-sm">
                    {collaborator.avatar}
                  </div>
                  <div
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-slate-800 ${getStatusColor(
                      collaborator.status
                    )}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-100 truncate">{collaborator.name}</p>
                  <p className="text-xs text-slate-400 truncate">{collaborator.email}</p>
                </div>
              </div>
              {getRoleIcon(collaborator.role)}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {collaborator.status === "online"
                  ? "Editing now"
                  : `Last active ${Math.floor((Date.now() - collaborator.lastActive.getTime()) / 60000)}m ago`}
              </span>
              <select
                defaultValue={collaborator.role}
                className="text-xs px-2 py-1 rounded bg-slate-700/50 border border-slate-600/30 text-slate-300 hover:border-slate-600/50 transition-all"
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
                <option value="owner">Owner</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="p-4 border-t border-slate-700/50">
        <p className="text-xs font-semibold text-slate-400 mb-2">Recent Activity</p>
        <div className="space-y-2 text-xs text-slate-400">
          <p>✏️ Sarah edited Step 2</p>
          <p>👀 Mike is viewing</p>
          <p>✅ You added Step 3</p>
        </div>
      </div>
    </div>
  );
}
