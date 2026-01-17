import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Zap, Plus, Trash2, Edit2, Play, Pause } from "lucide-react";

interface Schedule {
  id: string;
  workflowId: string;
  workflowName: string;
  type: "cron" | "recurring" | "event";
  cronExpression?: string;
  recurringPattern?: "daily" | "weekly" | "monthly";
  recurringTime?: string;
  eventType?: "webhook" | "email" | "api_call";
  eventCondition?: string;
  isActive: boolean;
  lastRun?: Date;
  nextRun?: Date;
  totalRuns: number;
  successRate: number;
}

const MOCK_SCHEDULES: Schedule[] = [
  {
    id: "1",
    workflowId: "wf_001",
    workflowName: "Daily Ouedkniss Scraper",
    type: "recurring",
    recurringPattern: "daily",
    recurringTime: "09:00",
    isActive: true,
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
    nextRun: new Date(Date.now() + 22 * 60 * 60 * 1000),
    totalRuns: 156,
    successRate: 98.5,
  },
  {
    id: "2",
    workflowId: "wf_002",
    workflowName: "Instagram Auto-Reply",
    type: "event",
    eventType: "webhook",
    eventCondition: "New Instagram DM received",
    isActive: true,
    totalRuns: 1247,
    successRate: 99.2,
  },
  {
    id: "3",
    workflowId: "wf_003",
    workflowName: "Weekly Report Generator",
    type: "recurring",
    recurringPattern: "weekly",
    recurringTime: "Monday 10:00",
    isActive: false,
    lastRun: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    nextRun: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    totalRuns: 52,
    successRate: 96.0,
  },
  {
    id: "4",
    workflowId: "wf_004",
    workflowName: "Price Monitor (Cron)",
    type: "cron",
    cronExpression: "0 */6 * * *",
    isActive: true,
    lastRun: new Date(Date.now() - 3 * 60 * 60 * 1000),
    nextRun: new Date(Date.now() + 3 * 60 * 60 * 1000),
    totalRuns: 89,
    successRate: 97.5,
  },
];

export default function WorkflowScheduler() {
  const [schedules, setSchedules] = useState<Schedule[]>(MOCK_SCHEDULES);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    workflowName: "",
    type: "recurring" as "cron" | "recurring" | "event",
    recurringPattern: "daily" as "daily" | "weekly" | "monthly",
    recurringTime: "09:00",
    cronExpression: "",
    eventType: "webhook" as "webhook" | "email" | "api_call",
    eventCondition: "",
  });

  const handleToggleActive = (id: string) => {
    setSchedules(
      schedules.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const handleDelete = (id: string) => {
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  const handleAddSchedule = () => {
    if (formData.workflowName) {
      const newSchedule: Schedule = {
        id: Date.now().toString(),
        workflowId: `wf_${Date.now()}`,
        workflowName: formData.workflowName,
        type: formData.type,
        recurringPattern: formData.recurringPattern,
        recurringTime: formData.recurringTime,
        cronExpression: formData.cronExpression,
        eventType: formData.eventType,
        eventCondition: formData.eventCondition,
        isActive: true,
        totalRuns: 0,
        successRate: 0,
      };
      setSchedules([...schedules, newSchedule]);
      setFormData({
        workflowName: "",
        type: "recurring",
        recurringPattern: "daily",
        recurringTime: "09:00",
        cronExpression: "",
        eventType: "webhook",
        eventCondition: "",
      });
      setShowForm(false);
    }
  };

  const getCronDescription = (cron: string) => {
    // Simple cron descriptions
    const parts = cron.split(" ");
    if (cron === "0 0 * * *") return "Every day at midnight";
    if (cron === "0 */6 * * *") return "Every 6 hours";
    if (cron === "0 9 * * 1-5") return "Weekdays at 9 AM";
    return cron;
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-cyan-400" />
            Workflow Scheduler
          </h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Add Schedule Button */}
        <div className="mb-8">
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-cyan-600 hover:bg-cyan-700 text-white border-0 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Schedule
          </Button>
        </div>

        {/* Add Schedule Form */}
        {showForm && (
          <div className="mb-8 rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <h2 className="text-lg font-bold text-slate-100 mb-4">Create New Schedule</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Workflow Name
                </label>
                <Input
                  value={formData.workflowName}
                  onChange={(e) => setFormData({ ...formData, workflowName: e.target.value })}
                  placeholder="Select or search workflow..."
                  className="bg-slate-700/30 border-slate-600 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Schedule Type
                </label>
                <div className="flex gap-4">
                  {["recurring", "cron", "event"].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={type}
                        checked={formData.type === type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-slate-300 capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.type === "recurring" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Pattern
                    </label>
                    <select
                      value={formData.recurringPattern}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          recurringPattern: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-700/30 border border-slate-600 text-slate-100"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Time
                    </label>
                    <Input
                      type="time"
                      value={formData.recurringTime}
                      onChange={(e) =>
                        setFormData({ ...formData, recurringTime: e.target.value })
                      }
                      className="bg-slate-700/30 border-slate-600 text-slate-100"
                    />
                  </div>
                </div>
              )}

              {formData.type === "cron" && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Cron Expression
                  </label>
                  <Input
                    value={formData.cronExpression}
                    onChange={(e) =>
                      setFormData({ ...formData, cronExpression: e.target.value })
                    }
                    placeholder="0 9 * * 1-5 (9 AM on weekdays)"
                    className="bg-slate-700/30 border-slate-600 text-slate-100 text-sm font-mono"
                  />
                  <p className="text-xs text-slate-400 mt-1">Format: minute hour day month weekday</p>
                </div>
              )}

              {formData.type === "event" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Event Type
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) =>
                        setFormData({ ...formData, eventType: e.target.value as any })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-700/30 border border-slate-600 text-slate-100"
                    >
                      <option value="webhook">Webhook</option>
                      <option value="email">Email</option>
                      <option value="api_call">API Call</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Condition
                    </label>
                    <Input
                      value={formData.eventCondition}
                      onChange={(e) =>
                        setFormData({ ...formData, eventCondition: e.target.value })
                      }
                      placeholder="e.g., New Instagram DM"
                      className="bg-slate-700/30 border-slate-600 text-slate-100"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleAddSchedule}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white border-0"
                >
                  Create Schedule
                </Button>
                <Button
                  onClick={() => setShowForm(false)}
                  className="bg-slate-700 hover:bg-slate-600 text-slate-100 border-0"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Schedules List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-100">Active Schedules</h2>

          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6 hover:border-slate-600/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-100">{schedule.workflowName}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        schedule.isActive
                          ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                          : "bg-slate-500/10 border border-slate-500/30 text-slate-300"
                      }`}
                    >
                      {schedule.isActive ? "Active" : "Inactive"}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 capitalize">
                      {schedule.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                    {schedule.type === "recurring" && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {schedule.recurringPattern} at {schedule.recurringTime}
                      </div>
                    )}
                    {schedule.type === "cron" && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {getCronDescription(schedule.cronExpression || "")}
                      </div>
                    )}
                    {schedule.type === "event" && (
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        {schedule.eventCondition}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    {schedule.lastRun && (
                      <div>
                        <p className="text-slate-500 text-xs">Last Run</p>
                        <p className="text-slate-300">
                          {schedule.lastRun.toLocaleString()}
                        </p>
                      </div>
                    )}
                    {schedule.nextRun && (
                      <div>
                        <p className="text-slate-500 text-xs">Next Run</p>
                        <p className="text-slate-300">
                          {schedule.nextRun.toLocaleString()}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-slate-500 text-xs">Total Runs</p>
                      <p className="text-slate-300">{schedule.totalRuns}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">Success Rate</p>
                      <p className={schedule.successRate > 95 ? "text-emerald-300" : "text-yellow-300"}>
                        {schedule.successRate.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleToggleActive(schedule.id)}
                    className={`p-2 rounded-lg border transition-all ${
                      schedule.isActive
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:border-emerald-500/50"
                        : "bg-slate-700/30 border-slate-600/30 text-slate-400 hover:border-slate-600/50"
                    }`}
                    title={schedule.isActive ? "Pause" : "Resume"}
                  >
                    {schedule.isActive ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                  <button className="p-2 rounded-lg bg-slate-700/30 border border-slate-600/30 text-slate-400 hover:border-slate-600/50 transition-all">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(schedule.id)}
                    className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:border-red-500/50 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
