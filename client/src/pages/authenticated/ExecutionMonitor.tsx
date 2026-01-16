import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertCircle, Zap, Download, RotateCcw, X } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface ExecutionStep {
  id: string;
  name: string;
  type: "input" | "process" | "decision" | "review" | "output";
  status: "pending" | "running" | "completed" | "failed";
  startTime?: number;
  endTime?: number;
  duration?: number;
  costUSD: number;
  creditsUsed: number;
  provider?: string;
  logs: string[];
  error?: string;
}

interface ExecutionData {
  id: string;
  workflowName: string;
  workflowId: string;
  status: "running" | "completed" | "failed";
  progress: number;
  startTime: number;
  endTime?: number;
  totalDuration?: number;
  steps: ExecutionStep[];
  totalCostUSD: number;
  totalCreditsUsed: number;
  inputData?: Record<string, any>;
  outputData?: Record<string, any>;
}

export default function ExecutionMonitor() {
  const [, navigate] = useLocation();
  const [execution, setExecution] = useState<ExecutionData>({
    id: `exec_${Date.now()}`,
    workflowName: "Invoice Processing Pipeline",
    workflowId: "wf_123",
    status: "running",
    progress: 65,
    startTime: Date.now() - 45000,
    steps: [
      {
        id: "step_1",
        name: "Upload Invoice",
        type: "input",
        status: "completed",
        startTime: Date.now() - 45000,
        endTime: Date.now() - 42000,
        duration: 3,
        costUSD: 0,
        creditsUsed: 0,
        logs: ["Invoice file received", "File validation passed", "Stored in processing queue"],
      },
      {
        id: "step_2",
        name: "OCR Extraction",
        type: "process",
        status: "completed",
        startTime: Date.now() - 42000,
        endTime: Date.now() - 25000,
        duration: 17,
        costUSD: 0.35,
        creditsUsed: 53,
        provider: "Google Vision API",
        logs: [
          "Initializing OCR engine",
          "Processing document pages: 2",
          "Extracted 47 fields",
          "Confidence score: 94.2%",
        ],
      },
      {
        id: "step_3",
        name: "Data Validation",
        type: "process",
        status: "completed",
        startTime: Date.now() - 25000,
        endTime: Date.now() - 15000,
        duration: 10,
        costUSD: 0.15,
        creditsUsed: 23,
        provider: "Custom Rules Engine",
        logs: ["Validating extracted data", "Cross-referencing with PO database", "All validations passed"],
      },
      {
        id: "step_4",
        name: "Human Review",
        type: "review",
        status: "running",
        startTime: Date.now() - 15000,
        duration: 15,
        costUSD: 0,
        creditsUsed: 0,
        logs: ["Queued for human review", "Assigned to reviewer: John Smith", "Awaiting review..."],
      },
      {
        id: "step_5",
        name: "Payment Processing",
        type: "output",
        status: "pending",
        costUSD: 0.25,
        creditsUsed: 38,
        logs: [],
      },
    ],
    totalCostUSD: 0.75,
    totalCreditsUsed: 114,
  });

  const [selectedStep, setSelectedStep] = useState<ExecutionStep | null>(execution.steps[0]);
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set([execution.steps[0].id]));

  // Simulate execution progress
  useEffect(() => {
    const interval = setInterval(() => {
      setExecution((prev) => {
        if (prev.status === "completed") return prev;

        const newExecution = { ...prev };
        const runningStep = newExecution.steps.find((s) => s.status === "running");

        if (runningStep && Math.random() > 0.7) {
          runningStep.status = "completed";
          runningStep.endTime = Date.now();
          runningStep.duration = (runningStep.endTime - (runningStep.startTime || 0)) / 1000;

          const nextStep = newExecution.steps.find((s) => s.status === "pending");
          if (nextStep) {
            nextStep.status = "running";
            nextStep.startTime = Date.now();
          } else {
            newExecution.status = "completed";
            newExecution.endTime = Date.now();
            newExecution.totalDuration = (newExecution.endTime - newExecution.startTime) / 1000;
          }

          newExecution.progress = Math.min(100, newExecution.progress + 15);
        }

        return newExecution;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleLogs = (stepId: string) => {
    const newExpanded = new Set(expandedLogs);
    if (newExpanded.has(stepId)) {
      newExpanded.delete(stepId);
    } else {
      newExpanded.add(stepId);
    }
    setExpandedLogs(newExpanded);
  };

  const costData = execution.steps
    .filter((s) => s.costUSD > 0)
    .map((s) => ({
      name: s.name,
      cost: s.costUSD,
      credits: s.creditsUsed,
    }));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case "running":
        return <Clock className="w-5 h-5 text-cyan-400 animate-spin" />;
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/workflows")} className="text-slate-400 hover:text-slate-100">
              ← Back
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-100">{execution.workflowName}</h1>
              <p className="text-xs text-slate-400">Execution ID: {execution.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-slate-600 text-slate-300">
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Status Overview */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Status */}
          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <p className="text-xs text-slate-500 mb-2">Status</p>
            <div className="flex items-center gap-2">
              {execution.status === "running" && (
                <>
                  <Clock className="w-5 h-5 text-cyan-400 animate-spin" />
                  <span className="text-lg font-bold text-cyan-300">Running</span>
                </>
              )}
              {execution.status === "completed" && (
                <>
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-lg font-bold text-emerald-300">Completed</span>
                </>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <p className="text-xs text-slate-500 mb-2">Progress</p>
            <div className="mb-2">
              <p className="text-lg font-bold text-slate-100">{execution.progress}%</p>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-2 rounded-full transition-all"
                style={{ width: `${execution.progress}%` }}
              />
            </div>
          </div>

          {/* Duration */}
          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <p className="text-xs text-slate-500 mb-2">Duration</p>
            <p className="text-lg font-bold text-slate-100">
              {execution.totalDuration
                ? `${execution.totalDuration.toFixed(1)}s`
                : `${((Date.now() - execution.startTime) / 1000).toFixed(1)}s`}
            </p>
          </div>

          {/* Cost */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border border-cyan-500/30">
            <p className="text-xs text-slate-500 mb-2">Total Cost</p>
            <p className="text-lg font-bold text-cyan-300">{execution.totalCreditsUsed} credits</p>
            <p className="text-xs text-slate-400">${execution.totalCostUSD.toFixed(3)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Steps Timeline */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-slate-100 mb-6">Execution Steps</h2>

            {execution.steps.map((step, index) => (
              <div key={step.id} className="rounded-lg bg-slate-800/50 border border-slate-700/50 overflow-hidden">
                {/* Step Header */}
                <div
                  onClick={() => setSelectedStep(step)}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedStep?.id === step.id ? "bg-cyan-500/10 border-b border-cyan-500/30" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700/50">
                        <span className="text-sm font-bold text-slate-300">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-100">{step.name}</p>
                        {step.provider && <p className="text-xs text-slate-500">{step.provider}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {step.duration && (
                        <span className="text-sm text-slate-400">{step.duration.toFixed(1)}s</span>
                      )}
                      {step.costUSD > 0 && (
                        <span className="text-sm font-semibold text-cyan-300">{step.creditsUsed} credits</span>
                      )}
                      {getStatusIcon(step.status)}
                    </div>
                  </div>
                </div>

                {/* Step Details */}
                {selectedStep?.id === step.id && (
                  <div className="p-4 border-t border-slate-700/50 space-y-4">
                    {/* Cost Breakdown */}
                    {step.costUSD > 0 && (
                      <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
                        <p className="text-xs text-slate-500 mb-2">Cost Breakdown</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">USD Cost:</span>
                          <span className="text-cyan-300 font-semibold">${step.costUSD.toFixed(3)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">Credits Used:</span>
                          <span className="text-cyan-300 font-semibold">{step.creditsUsed}</span>
                        </div>
                      </div>
                    )}

                    {/* Logs */}
                    <div>
                      <button
                        onClick={() => toggleLogs(step.id)}
                        className="text-sm font-semibold text-slate-300 hover:text-slate-100 mb-2 flex items-center gap-2"
                      >
                        {expandedLogs.has(step.id) ? "▼" : "▶"} Logs ({step.logs.length})
                      </button>
                      {expandedLogs.has(step.id) && (
                        <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50 font-mono text-xs text-slate-400 max-h-48 overflow-y-auto">
                          {step.logs.map((log, i) => (
                            <div key={i} className="py-1">
                              <span className="text-slate-600">[{(i + 1).toString().padStart(2, "0")}]</span> {log}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Error */}
                    {step.error && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                        <p className="text-xs text-red-400 font-semibold mb-1">Error</p>
                        <p className="text-xs text-red-300">{step.error}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Analytics and Results */}
          <div className="space-y-6">
            {/* Cost Chart */}
            {costData.length > 0 && (
              <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-4">
                <h3 className="text-sm font-bold text-slate-100 mb-4">Cost by Step</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={costData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #475569",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#e2e8f0" }}
                    />
                    <Bar dataKey="cost" fill="#06b6d4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Output Data */}
            {execution.outputData && (
              <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-4">
                <h3 className="text-sm font-bold text-slate-100 mb-4">Output Data</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {Object.entries(execution.outputData).map(([key, value]) => (
                    <div key={key} className="text-xs">
                      <p className="text-slate-400">{key}:</p>
                      <p className="text-slate-300 ml-2 font-mono break-words">
                        {typeof value === "string" ? value : JSON.stringify(value)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-4">
              <h3 className="text-sm font-bold text-slate-100 mb-4">Actions</h3>
              <div className="space-y-2">
                <Button className="w-full bg-slate-700/50 hover:bg-slate-700 text-slate-100 border-0">
                  View Full Report
                </Button>
                <Button className="w-full bg-slate-700/50 hover:bg-slate-700 text-slate-100 border-0">
                  Schedule Rerun
                </Button>
                <Button className="w-full bg-slate-700/50 hover:bg-slate-700 text-slate-100 border-0">
                  Share Results
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
