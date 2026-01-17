import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GitBranch, Download, Undo2, Eye, Trash2, CheckCircle } from "lucide-react";

interface WorkflowVersion {
  id: string;
  version: number;
  name: string;
  description: string;
  createdAt: string;
  createdBy: string;
  status: "published" | "draft" | "archived";
  executions: number;
  isActive: boolean;
}

const VERSIONS: WorkflowVersion[] = [
  {
    id: "1",
    version: 3,
    name: "Customer Onboarding v3.0",
    description: "Added email verification step and improved error handling",
    createdAt: "2 hours ago",
    createdBy: "You",
    status: "published",
    executions: 156,
    isActive: true,
  },
  {
    id: "2",
    version: 2,
    name: "Customer Onboarding v2.1",
    description: "Fixed KYC validation logic",
    createdAt: "1 day ago",
    createdBy: "You",
    status: "published",
    executions: 234,
    isActive: false,
  },
  {
    id: "3",
    version: 2,
    name: "Customer Onboarding v2.0",
    description: "Initial release with basic features",
    createdAt: "3 days ago",
    createdBy: "You",
    status: "archived",
    executions: 89,
    isActive: false,
  },
  {
    id: "4",
    version: 1,
    name: "Customer Onboarding v1.0",
    description: "Beta version",
    createdAt: "1 week ago",
    createdBy: "You",
    status: "archived",
    executions: 12,
    isActive: false,
  },
];

export default function WorkflowVersions() {
  const [versions, setVersions] = useState<WorkflowVersion[]>(VERSIONS);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  const handleRollback = (id: string) => {
    setVersions(
      versions.map((v) => ({
        ...v,
        isActive: v.id === id,
      }))
    );
    alert("Rolled back to this version successfully!");
  };

  const handleDelete = (id: string) => {
    setVersions(versions.filter((v) => v.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-300";
      case "draft":
        return "bg-yellow-500/10 border-yellow-500/30 text-yellow-300";
      case "archived":
        return "bg-slate-500/10 border-slate-500/30 text-slate-300";
      default:
        return "bg-slate-500/10 border-slate-500/30 text-slate-300";
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <GitBranch className="w-6 h-6" />
            Workflow Versions
          </h1>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Version List */}
        <div className="space-y-4">
          {versions.map((version) => (
            <div
              key={version.id}
              onClick={() => setSelectedVersion(selectedVersion === version.id ? null : version.id)}
              className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6 cursor-pointer hover:border-slate-600/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-100">{version.name}</h3>
                    {version.isActive && (
                      <span className="px-2 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Active
                      </span>
                    )}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        version.status
                      )}`}
                    >
                      {version.status.charAt(0).toUpperCase() + version.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-3">{version.description}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>v{version.version}</span>
                    <span>Created {version.createdAt}</span>
                    <span>by {version.createdBy}</span>
                    <span>{version.executions} executions</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="p-2 rounded-lg bg-slate-700/30 border border-slate-600/30 text-slate-300 hover:border-slate-600/50 transition-all"
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {!version.isActive && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRollback(version.id);
                      }}
                      className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:border-cyan-500/50 transition-all"
                      title="Rollback"
                    >
                      <Undo2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="p-2 rounded-lg bg-slate-700/30 border border-slate-600/30 text-slate-300 hover:border-slate-600/50 transition-all"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  {version.status !== "archived" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(version.id);
                      }}
                      className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:border-red-500/50 transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {selectedVersion === version.id && (
                <div className="mt-4 pt-4 border-t border-slate-700/50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Total Executions</p>
                      <p className="text-2xl font-bold text-cyan-300">{version.executions}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Success Rate</p>
                      <p className="text-2xl font-bold text-emerald-300">98.5%</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Avg Execution Time</p>
                      <p className="text-2xl font-bold text-purple-300">2.3s</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Version Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <p className="text-slate-400 text-sm mb-2">Total Versions</p>
            <p className="text-3xl font-bold text-cyan-300">{versions.length}</p>
          </div>
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <p className="text-slate-400 text-sm mb-2">Active Version</p>
            <p className="text-lg font-bold text-slate-100">v{versions.find((v) => v.isActive)?.version}</p>
          </div>
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <p className="text-slate-400 text-sm mb-2">Total Executions</p>
            <p className="text-3xl font-bold text-emerald-300">
              {versions.reduce((sum, v) => sum + v.executions, 0)}
            </p>
          </div>
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <p className="text-slate-400 text-sm mb-2">Last Updated</p>
            <p className="text-sm font-bold text-slate-100">{versions[0]?.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
