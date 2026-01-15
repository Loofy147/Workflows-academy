import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Trash2, Edit, Play, Copy } from "lucide-react";

interface Workflow {
  id: number;
  name: string;
  description: string;
  status: "active" | "draft";
  runs: number;
  lastRun: string;
  createdAt: string;
}

export default function WorkflowsList() {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "draft">("all");

  const workflows: Workflow[] = [
    {
      id: 1,
      name: "Lead Generation Pipeline",
      description: "Automated lead capture and qualification",
      status: "active",
      runs: 234,
      lastRun: "2 hours ago",
      createdAt: "Jan 10, 2025",
    },
    {
      id: 2,
      name: "Customer Support Bot",
      description: "AI-powered customer support automation",
      status: "active",
      runs: 156,
      lastRun: "30 minutes ago",
      createdAt: "Jan 8, 2025",
    },
    {
      id: 3,
      name: "Data Processing Task",
      description: "Batch data processing and transformation",
      status: "draft",
      runs: 0,
      lastRun: "Never",
      createdAt: "Jan 15, 2025",
    },
  ];

  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch =
      workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || workflow.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            AgentFlow
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/dashboard")} className="text-slate-300 hover:text-slate-100">
              Dashboard
            </button>
            <button onClick={() => navigate("/templates")} className="text-slate-300 hover:text-slate-100">
              Templates
            </button>
            <button onClick={() => navigate("/settings")} className="text-slate-300 hover:text-slate-100">
              Settings
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-100 mb-2">Workflows</h1>
            <p className="text-slate-400">Manage and monitor all your AI workflows</p>
          </div>
          <Button
            onClick={() => navigate("/workflows/builder/new")}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Workflow
          </Button>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
            <Input
              type="text"
              placeholder="Search workflows..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
            />
          </div>

          <div className="flex gap-2">
            {(["all", "active", "draft"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterStatus === status
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600/50"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filteredWorkflows.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredWorkflows.map((workflow) => (
              <div
                key={workflow.id}
                className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 cursor-pointer" onClick={() => navigate(`/workflows/${workflow.id}`)}>
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {workflow.name}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">{workflow.description}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${
                      workflow.status === "active"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-slate-600/20 text-slate-400"
                    }`}
                  >
                    {workflow.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-6 text-sm">
                    <div>
                      <p className="text-slate-500">Executions</p>
                      <p className="text-slate-100 font-semibold">{workflow.runs}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Last Run</p>
                      <p className="text-slate-100 font-semibold">{workflow.lastRun}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Created</p>
                      <p className="text-slate-100 font-semibold">{workflow.createdAt}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => navigate(`/workflows/${workflow.id}/run`)}
                      className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                      title="Run workflow"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/workflows/${workflow.id}/edit`)}
                      className="p-2 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors"
                      title="Edit workflow"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-slate-600/20 text-slate-400 hover:bg-slate-600/30 transition-colors"
                      title="Duplicate workflow"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors"
                      title="Delete workflow"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 mb-4">No workflows found</p>
            <Button
              onClick={() => navigate("/workflows/builder/new")}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0"
            >
              Create your first workflow
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
