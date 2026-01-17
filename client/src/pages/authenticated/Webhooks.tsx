import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Copy, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

interface Webhook {
  id: string;
  url: string;
  events: string[];
  active: boolean;
  lastTriggered?: string;
  deliveryStatus: "success" | "failed" | "pending";
}

const WEBHOOKS: Webhook[] = [
  {
    id: "1",
    url: "https://api.example.com/webhooks/workflow-complete",
    events: ["workflow.completed", "workflow.failed"],
    active: true,
    lastTriggered: "2 minutes ago",
    deliveryStatus: "success",
  },
  {
    id: "2",
    url: "https://api.example.com/webhooks/template-published",
    events: ["template.published"],
    active: true,
    lastTriggered: "1 hour ago",
    deliveryStatus: "success",
  },
];

export default function Webhooks() {
  const [webhooks, setWebhooks] = useState<Webhook[]>(WEBHOOKS);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newWebhook, setNewWebhook] = useState({ url: "", events: [] as string[] });
  const [showUrl, setShowUrl] = useState<string | null>(null);

  const eventOptions = [
    "workflow.started",
    "workflow.completed",
    "workflow.failed",
    "template.published",
    "template.updated",
    "payment.received",
    "team.member.added",
  ];

  const handleAddWebhook = () => {
    if (newWebhook.url && newWebhook.events.length > 0) {
      setWebhooks([
        ...webhooks,
        {
          id: Date.now().toString(),
          url: newWebhook.url,
          events: newWebhook.events,
          active: true,
          deliveryStatus: "pending",
        },
      ]);
      setNewWebhook({ url: "", events: [] });
      setShowNewForm(false);
    }
  };

  const handleDeleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter((w) => w.id !== id));
  };

  const handleToggleEvent = (event: string) => {
    setNewWebhook({
      ...newWebhook,
      events: newWebhook.events.includes(event)
        ? newWebhook.events.filter((e) => e !== event)
        : [...newWebhook.events, event],
    });
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-100">Webhooks</h1>
          <Button
            onClick={() => setShowNewForm(!showNewForm)}
            className="bg-cyan-600 hover:bg-cyan-700 text-white border-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Webhook
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* New Webhook Form */}
        {showNewForm && (
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-100 mb-6">Create New Webhook</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Webhook URL</label>
                <Input
                  value={newWebhook.url}
                  onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                  placeholder="https://api.example.com/webhooks/..."
                  className="bg-slate-700/30 border-slate-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Subscribe to Events</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {eventOptions.map((event) => (
                    <label key={event} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newWebhook.events.includes(event)}
                        onChange={() => handleToggleEvent(event)}
                        className="w-4 h-4 rounded bg-slate-700 border-slate-600"
                      />
                      <span className="text-slate-300">{event}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddWebhook}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white border-0"
                >
                  Create Webhook
                </Button>
                <Button
                  onClick={() => setShowNewForm(false)}
                  className="bg-slate-700 hover:bg-slate-600 text-slate-100 border-0"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Webhooks List */}
        <div className="space-y-4">
          {webhooks.map((webhook) => (
            <div
              key={webhook.id}
              className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-mono text-sm text-slate-300">{webhook.url}</h3>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(webhook.url);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-slate-300"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {webhook.deliveryStatus === "success" ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                    )}
                    <span className="text-slate-400">
                      {webhook.lastTriggered ? `Last triggered ${webhook.lastTriggered}` : "Never triggered"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteWebhook(webhook.id)}
                  className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:border-red-500/50 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {webhook.events.map((event) => (
                  <span key={event} className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-medium">
                    {event}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {webhooks.length === 0 && !showNewForm && (
          <div className="text-center py-12">
            <p className="text-slate-400 mb-4">No webhooks configured yet</p>
            <Button
              onClick={() => setShowNewForm(true)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white border-0"
            >
              Create Your First Webhook
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
