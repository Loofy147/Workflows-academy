import { useState, useEffect } from "react";
import { Activity, Zap, CheckCircle2, AlertCircle, Clock, TrendingUp } from "lucide-react";

interface ExecutionStep {
  id: string;
  name: string;
  status: "pending" | "running" | "completed" | "failed";
  duration?: number;
  cost?: number;
  output?: any;
  error?: string;
  startTime?: Date;
  endTime?: Date;
}

interface ExecutionMetrics {
  totalSteps: number;
  completedSteps: number;
  failedSteps: number;
  totalDuration: number;
  totalCost: number;
  progress: number;
}

export default function RealtimeExecutionMonitor() {
  const [steps, setSteps] = useState<ExecutionStep[]>([
    { id: "1", name: "Fetch Data from Ouedkniss", status: "completed", duration: 2.3, cost: 1.5 },
    { id: "2", name: "AI Analysis", status: "running", duration: 0 },
    { id: "3", name: "Filter Results", status: "pending" },
    { id: "4", name: "Generate Report", status: "pending" },
    { id: "5", name: "Send Email", status: "pending" },
  ]);

  const [metrics, setMetrics] = useState<ExecutionMetrics>({
    totalSteps: 5,
    completedSteps: 1,
    failedSteps: 0,
    totalDuration: 2.3,
    totalCost: 1.5,
    progress: 20,
  });

  // Simulate real-time WebSocket updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        const runningStep = newSteps.find((s) => s.status === "running");

        if (runningStep) {
          // Simulate step completion
          if (Math.random() > 0.7) {
            runningStep.status = "completed";
            runningStep.duration = Math.random() * 5 + 0.5;
            runningStep.cost = Math.random() * 2 + 0.5;

            // Move to next step
            const nextStep = newSteps.find((s) => s.status === "pending");
            if (nextStep) {
              nextStep.status = "running";
            }

            // Update metrics
            setMetrics((prev) => ({
              ...prev,
              completedSteps: prev.completedSteps + 1,
              totalDuration: prev.totalDuration + (runningStep.duration || 0),
              totalCost: prev.totalCost + (runningStep.cost || 0),
              progress: Math.min(100, ((prev.completedSteps + 1) / prev.totalSteps) * 100),
            }));
          }
        }

        return newSteps;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case "running":
        return <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />;
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-slate-500" />;
    }
  };

  const isCompleted = metrics.completedSteps === metrics.totalSteps;

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-400" />
            Workflow Execution Monitor
          </h1>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Status Header */}
        <div className="mb-8">
          <div className="rounded-lg bg-gradient-to-r from-slate-800/50 to-slate-700/30 border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 mb-1">Customer Onboarding Workflow</h2>
                <p className="text-slate-400 text-sm">Execution ID: exec_1234567890</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-cyan-400">{metrics.progress.toFixed(0)}%</div>
                <p className="text-slate-400 text-sm">
                  {metrics.completedSteps} of {metrics.totalSteps} steps
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-700/30 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300"
                style={{ width: `${metrics.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-4">
            <p className="text-slate-400 text-sm mb-1">Total Duration</p>
            <p className="text-2xl font-bold text-cyan-300">{metrics.totalDuration.toFixed(1)}s</p>
          </div>
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-4">
            <p className="text-slate-400 text-sm mb-1">Total Cost</p>
            <p className="text-2xl font-bold text-purple-300">${metrics.totalCost.toFixed(2)}</p>
          </div>
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-4">
            <p className="text-slate-400 text-sm mb-1">Completed Steps</p>
            <p className="text-2xl font-bold text-emerald-300">{metrics.completedSteps}</p>
          </div>
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-4">
            <p className="text-slate-400 text-sm mb-1">Status</p>
            <p className={`text-2xl font-bold ${isCompleted ? "text-emerald-300" : "text-cyan-300"}`}>
              {isCompleted ? "✅ Complete" : "⏳ Running"}
            </p>
          </div>
        </div>

        {/* Steps Timeline */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-100 mb-4">Execution Steps</h3>

          {steps.map((step, index) => (
            <div
              key={step.id}
              className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-4 hover:border-slate-600/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{getStepIcon(step.status)}</div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-100">{step.name}</h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        step.status === "completed"
                          ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                          : step.status === "running"
                          ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
                          : step.status === "failed"
                          ? "bg-red-500/10 border border-red-500/30 text-red-300"
                          : "bg-slate-500/10 border border-slate-500/30 text-slate-300"
                      }`}
                    >
                      {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                    </span>
                  </div>

                  {step.duration && (
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {step.duration.toFixed(2)}s
                      </span>
                      {step.cost && (
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          ${step.cost.toFixed(2)}
                        </span>
                      )}
                    </div>
                  )}

                  {step.error && (
                    <div className="mt-2 p-2 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                      {step.error}
                    </div>
                  )}

                  {step.output && (
                    <div className="mt-2 p-2 rounded bg-slate-700/30 border border-slate-600/30 text-slate-300 text-sm max-h-24 overflow-y-auto">
                      <pre className="text-xs">{JSON.stringify(step.output, null, 2)}</pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Results Section */}
        {isCompleted && (
          <div className="mt-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-6">
            <h3 className="text-lg font-bold text-emerald-300 mb-4">✅ Execution Complete</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Records Processed</p>
                <p className="text-2xl font-bold text-emerald-300">1,247</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-emerald-300">98.5%</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Cost</p>
                <p className="text-2xl font-bold text-emerald-300">${metrics.totalCost.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
