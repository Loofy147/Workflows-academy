import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle, ExternalLink } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  connected: boolean;
  rating: number;
  reviews: number;
}

const INTEGRATIONS: Integration[] = [
  {
    id: "1",
    name: "Slack",
    description: "Send notifications and messages to Slack channels",
    category: "Communication",
    icon: "💬",
    connected: true,
    rating: 4.8,
    reviews: 245,
  },
  {
    id: "2",
    name: "Google Sheets",
    description: "Read and write data to Google Sheets",
    category: "Data",
    icon: "📊",
    connected: false,
    rating: 4.9,
    reviews: 312,
  },
  {
    id: "3",
    name: "Stripe",
    description: "Process payments and manage transactions",
    category: "Payments",
    icon: "💳",
    connected: true,
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "4",
    name: "SendGrid",
    description: "Send emails at scale with SendGrid",
    category: "Email",
    icon: "📧",
    connected: false,
    rating: 4.6,
    reviews: 156,
  },
  {
    id: "5",
    name: "Zapier",
    description: "Connect to 5000+ apps via Zapier",
    category: "Automation",
    icon: "⚡",
    connected: false,
    rating: 4.5,
    reviews: 423,
  },
  {
    id: "6",
    name: "GitHub",
    description: "Trigger workflows from GitHub events",
    category: "Development",
    icon: "🐙",
    connected: false,
    rating: 4.7,
    reviews: 267,
  },
  {
    id: "7",
    name: "HubSpot",
    description: "Sync contacts and manage CRM data",
    category: "CRM",
    icon: "🎯",
    connected: false,
    rating: 4.8,
    reviews: 198,
  },
  {
    id: "8",
    name: "Twilio",
    description: "Send SMS and make phone calls",
    category: "Communication",
    icon: "☎️",
    connected: false,
    rating: 4.6,
    reviews: 134,
  },
];

export default function IntegrationMarketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [integrations, setIntegrations] = useState<Integration[]>(INTEGRATIONS);

  const categories = ["All", "Communication", "Data", "Payments", "Email", "Automation", "Development", "CRM"];

  const filtered = integrations.filter((int) => {
    const matchesSearch = int.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      int.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || int.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleIntegration = (id: string) => {
    setIntegrations(
      integrations.map((int) =>
        int.id === id ? { ...int, connected: !int.connected } : int
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-100">Integration Marketplace</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search integrations..."
              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 py-6 text-lg"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-slate-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((integration) => (
            <div
              key={integration.id}
              className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6 hover:border-slate-600/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{integration.icon}</div>
                {integration.connected && (
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-100 mb-2">{integration.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{integration.description}</p>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm text-slate-300">
                    {integration.rating} ({integration.reviews})
                  </span>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-700/30 border border-slate-600/30 text-slate-300">
                  {integration.category}
                </span>
              </div>

              <Button
                onClick={() => handleToggleIntegration(integration.id)}
                className={`w-full ${
                  integration.connected
                    ? "bg-slate-700 hover:bg-slate-600 text-slate-100 border-0"
                    : "bg-cyan-600 hover:bg-cyan-700 text-white border-0"
                }`}
              >
                {integration.connected ? "Connected" : "Connect"}
              </Button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No integrations found</p>
          </div>
        )}
      </div>
    </div>
  );
}
