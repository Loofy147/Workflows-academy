import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Save } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface WorkflowStep {
  id: string;
  type: "input" | "process" | "decision" | "review" | "output";
  name: string;
  config: Record<string, any>;
  costUSD: number;
}

interface WorkflowData {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  totalCostUSD: number;
  suggestedPriceCredits: number;
}

const STEP_TYPES = [
  { id: "input", label: "Input", icon: "📥", description: "File/text/camera input" },
  { id: "process", label: "Process", icon: "⚙️", description: "Extract, analyze, infer" },
  { id: "decision", label: "Decision", icon: "🔀", description: "Conditional branching" },
  { id: "review", label: "Human Review", icon: "👤", description: "Manual review queue" },
  { id: "output", label: "Output", icon: "📤", description: "PDF, JSON, webhook" },
];

const COST_CONFIG = {
  conversionRate: 100,
  buffer: 0.2,
  markup: 1.5,
};

export default function WorkflowBuilder() {
  const [, navigate] = useLocation();
  const [workflow, setWorkflow] = useState<WorkflowData>({
    id: `wf_${Date.now()}`,
    name: "New Workflow",
    description: "",
    steps: [],
    totalCostUSD: 0,
    suggestedPriceCredits: 0,
  });

  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [showAddStep, setShowAddStep] = useState(false);

  const selectedStep = workflow.steps.find((s) => s.id === selectedStepId);

  const calculateCosts = (steps: WorkflowStep[]) => {
    const rawCostUSD = steps.reduce((sum, step) => sum + step.costUSD, 0);
    const bufferedCost = rawCostUSD * (1 + COST_CONFIG.buffer);
    const creditsNeeded = Math.ceil(bufferedCost * COST_CONFIG.conversionRate);
    const suggestedPrice = Math.ceil(creditsNeeded * COST_CONFIG.markup);

    return {
      rawCostUSD,
      bufferedCost,
      creditsNeeded,
      suggestedPrice,
    };
  };

  const addStep = (type: WorkflowStep["type"]) => {
    const newStep: WorkflowStep = {
      id: `step_${Date.now()}`,
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Step`,
      config: {
        mode: "balanced",
        confidence: 0.8,
        fallback: false,
      },
      costUSD: type === "input" ? 0 : type === "process" ? 0.3 : 0.05,
    };

    const newSteps = [...workflow.steps, newStep];
    const costs = calculateCosts(newSteps);

    setWorkflow({
      ...workflow,
      steps: newSteps,
      totalCostUSD: costs.bufferedCost,
      suggestedPriceCredits: costs.suggestedPrice,
    });

    setSelectedStepId(newStep.id);
    setShowAddStep(false);
  };

  const updateStep = (stepId: string, updates: Partial<WorkflowStep>) => {
    const newSteps = workflow.steps.map((s) => (s.id === stepId ? { ...s, ...updates } : s));
    const costs = calculateCosts(newSteps);

    setWorkflow({
      ...workflow,
      steps: newSteps,
      totalCostUSD: costs.bufferedCost,
      suggestedPriceCredits: costs.suggestedPrice,
    });
  };

  const deleteStep = (stepId: string) => {
    const newSteps = workflow.steps.filter((s) => s.id !== stepId);
    const costs = calculateCosts(newSteps);

    setWorkflow({
      ...workflow,
      steps: newSteps,
      totalCostUSD: costs.bufferedCost,
      suggestedPriceCredits: costs.suggestedPrice,
    });

    setSelectedStepId(null);
  };

  const costBreakdown = workflow.steps.map((step) => ({
    name: step.name,
    cost: step.costUSD,
  }));

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/workflows")} className="text-slate-400 hover:text-slate-100">
              ← Back
            </button>
            <div>
              <input
                type="text"
                value={workflow.name}
                onChange={(e) => setWorkflow({ ...workflow, name: e.target.value })}
                className="text-2xl font-bold text-slate-100 bg-transparent border-none outline-none"
              />
              <p className="text-sm text-slate-400">Workflow ID: {workflow.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-slate-600 text-slate-300">
              Save Draft
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0">
              <Save className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-80px)]">
        <div className="w-[30%] border-r border-slate-700/50 bg-slate-800/30 overflow-y-auto">
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-4">Workflow Steps</h3>
              <p className="text-sm text-slate-400 mb-4">{workflow.steps.length} steps configured</p>
            </div>

            <div className="space-y-2">
              {workflow.steps.map((step, index) => (
                <div
                  key={step.id}
                  onClick={() => setSelectedStepId(step.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedStepId === step.id
                      ? "bg-cyan-500/20 border border-cyan-500/50"
                      : "bg-slate-700/30 border border-slate-600/30 hover:border-slate-600/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {STEP_TYPES.find((t) => t.id === step.type)?.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-100 truncate">{step.name}</p>
                      <p className="text-xs text-slate-400">${step.costUSD.toFixed(2)}</p>
                    </div>
                    <span className="text-xs bg-slate-600/30 px-2 py-1 rounded text-slate-300">
                      {index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {!showAddStep ? (
              <Button
                onClick={() => setShowAddStep(true)}
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Step
              </Button>
            ) : (
              <div className="space-y-2 pt-4 border-t border-slate-700/50">
                {STEP_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => addStep(type.id as WorkflowStep["type"])}
                    className="w-full text-left p-3 rounded-lg bg-slate-700/30 border border-slate-600/30 hover:border-slate-600/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{type.icon}</span>
                      <div>
                        <p className="font-semibold text-slate-100 group-hover:text-cyan-300">
                          {type.label}
                        </p>
                        <p className="text-xs text-slate-400">{type.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => setShowAddStep(false)}
                  className="w-full p-2 text-slate-400 hover:text-slate-100 text-sm"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="w-[50%] border-r border-slate-700/50 overflow-y-auto">
          {selectedStep ? (
            <div className="p-8 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-100 mb-6">Step Editor</h2>

                <div className="space-y-2 mb-6">
                  <label className="block text-sm font-medium text-slate-300">Step Name</label>
                  <Input
                    value={selectedStep.name}
                    onChange={(e) => updateStep(selectedStep.id, { name: e.target.value })}
                    className="bg-slate-800/50 border-slate-700 text-slate-100"
                  />
                </div>

                <div className="space-y-2 mb-6">
                  <label className="block text-sm font-medium text-slate-300">Step Type</label>
                  <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-100">
                    {STEP_TYPES.find((t) => t.id === selectedStep.type)?.label}
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <label className="block text-sm font-medium text-slate-300">Processing Mode</label>
                  <select
                    value={selectedStep.config.mode}
                    onChange={(e) =>
                      updateStep(selectedStep.id, {
                        config: { ...selectedStep.config, mode: e.target.value },
                      })
                    }
                    className="w-full p-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-100"
                  >
                    <option value="fast">⚡ Fast (Lower cost)</option>
                    <option value="balanced">⚖️ Balanced (Recommended)</option>
                    <option value="accurate">🎯 Accurate (Higher cost)</option>
                  </select>
                </div>

                <div className="space-y-2 mb-6">
                  <label className="block text-sm font-medium text-slate-300">
                    Confidence Threshold: {(selectedStep.config.confidence * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={selectedStep.config.confidence}
                    onChange={(e) =>
                      updateStep(selectedStep.id, {
                        config: { ...selectedStep.config, confidence: parseFloat(e.target.value) },
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div className="flex items-center gap-3 mb-6 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                  <input
                    type="checkbox"
                    checked={selectedStep.config.fallback}
                    onChange={(e) =>
                      updateStep(selectedStep.id, {
                        config: { ...selectedStep.config, fallback: e.target.checked },
                      })
                    }
                    className="w-4 h-4"
                  />
                  <label className="text-sm text-slate-300">Use fallback provider on failure</label>
                </div>

                <Button
                  onClick={() => deleteStep(selectedStep.id)}
                  variant="outline"
                  className="w-full border-red-600/30 text-red-400 hover:bg-red-600/10"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Step
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400">
              <p>Select a step or add a new one to get started</p>
            </div>
          )}
        </div>

        <div className="w-[20%] bg-slate-800/50 border-l border-slate-700/50 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">Cost Estimation</h3>
              <p className="text-xs text-slate-400">Live cost calculation</p>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30">
                <p className="text-xs text-slate-400 mb-1">Cost per Run</p>
                <p className="text-2xl font-bold text-cyan-300">${workflow.totalCostUSD.toFixed(3)}</p>
              </div>

              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30">
                <p className="text-xs text-slate-400 mb-1">Suggested Price</p>
                <p className="text-2xl font-bold text-purple-300">{workflow.suggestedPriceCredits} credits</p>
              </div>
            </div>

            {costBreakdown.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-slate-300 mb-3">Cost Breakdown</p>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={costBreakdown}>
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
                    <Line
                      type="monotone"
                      dataKey="cost"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      dot={{ fill: "#06b6d4", r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="space-y-2 text-xs text-slate-400 p-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
              <div className="flex justify-between">
                <span>Raw Cost:</span>
                <span className="text-slate-200">
                  ${(workflow.totalCostUSD / (1 + COST_CONFIG.buffer)).toFixed(3)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Buffer (20%):</span>
                <span className="text-slate-200">
                  ${(workflow.totalCostUSD - workflow.totalCostUSD / (1 + COST_CONFIG.buffer)).toFixed(3)}
                </span>
              </div>
              <div className="border-t border-slate-600/30 pt-2 mt-2 flex justify-between font-semibold">
                <span>Credits Cost:</span>
                <span className="text-cyan-300">
                  {Math.ceil(workflow.totalCostUSD * COST_CONFIG.conversionRate)}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <p className="text-xs text-emerald-300 font-semibold">✓ Healthy Margin</p>
              <p className="text-xs text-emerald-400 mt-1">
                {Math.round((COST_CONFIG.markup - 1) * 100)}% markup recommended
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
