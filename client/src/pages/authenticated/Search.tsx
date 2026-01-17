import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Zap, Package, Users, Clock } from "lucide-react";

interface SearchResult {
  id: string;
  type: "workflow" | "template" | "user";
  title: string;
  description: string;
  icon: React.ReactNode;
  metadata?: string;
}

const SEARCH_RESULTS: SearchResult[] = [
  {
    id: "1",
    type: "workflow",
    title: "Customer Onboarding",
    description: "Automated KYC and document verification workflow",
    icon: <Zap className="w-5 h-5 text-cyan-400" />,
    metadata: "24 executions • Last run 2 hours ago",
  },
  {
    id: "2",
    type: "template",
    title: "Invoice Processing",
    description: "Extract and process invoice data automatically",
    icon: <Package className="w-5 h-5 text-purple-400" />,
    metadata: "1.2K installs • 4.8★",
  },
  {
    id: "3",
    type: "workflow",
    title: "Email Campaign Manager",
    description: "Send personalized emails based on user behavior",
    icon: <Zap className="w-5 h-5 text-cyan-400" />,
    metadata: "156 executions • Last run 1 day ago",
  },
  {
    id: "4",
    type: "template",
    title: "Lead Scoring",
    description: "Score and rank leads based on engagement",
    icon: <Package className="w-5 h-5 text-purple-400" />,
    metadata: "856 installs • 4.6★",
  },
  {
    id: "5",
    type: "user",
    title: "Sarah Johnson",
    description: "Team member • Editor",
    icon: <Users className="w-5 h-5 text-emerald-400" />,
    metadata: "Joined 3 months ago",
  },
  {
    id: "6",
    type: "workflow",
    title: "Contract Review",
    description: "Analyze and extract key terms from contracts",
    icon: <Zap className="w-5 h-5 text-cyan-400" />,
    metadata: "45 executions • Last run 5 hours ago",
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "workflow" | "template" | "user">("all");

  const filtered = SEARCH_RESULTS.filter((result) => {
    const matchesQuery = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || result.type === selectedType;
    return matchesQuery && matchesType;
  });

  const typeColors = {
    workflow: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
    template: "bg-purple-500/10 border-purple-500/30 text-purple-300",
    user: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Search className="w-6 h-6" />
            Search
          </h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Search Input */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search workflows, templates, or people..."
              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 py-6 text-lg"
              autoFocus
            />
          </div>
        </div>

        {/* Type Filter */}
        <div className="flex gap-2 mb-8">
          {["all", "workflow", "template", "user"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedType === type
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-slate-600"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filtered.map((result) => (
            <a
              key={result.id}
              href="#"
              className="block p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{result.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {result.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                        typeColors[result.type]
                      }`}
                    >
                      {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-2">{result.description}</p>
                  {result.metadata && (
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      {result.metadata}
                    </div>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">
              {searchQuery ? "No results found" : "Start typing to search"}
            </p>
          </div>
        )}

        {/* Recent Searches */}
        {!searchQuery && (
          <div className="mt-12">
            <h2 className="text-lg font-bold text-slate-100 mb-4">Recent Searches</h2>
            <div className="flex flex-wrap gap-2">
              {["Customer Onboarding", "Invoice Processing", "Lead Scoring"].map((search) => (
                <button
                  key={search}
                  onClick={() => setSearchQuery(search)}
                  className="px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:border-slate-600/50 transition-all text-sm"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
