import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, Download, Eye, Heart } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  creator: string;
  rating: number;
  reviews: number;
  installs: number;
  costPerRun: number;
  creditsPerRun: number;
  image: string;
  verified: boolean;
  featured: boolean;
  tags: string[];
}

const TEMPLATES: Template[] = [
  {
    id: "kyc-1",
    name: "KYC Verification Pipeline",
    description: "Complete Know Your Customer workflow with ID verification, AML checks, and document validation",
    category: "Compliance",
    creator: "Verified Creator",
    rating: 4.8,
    reviews: 342,
    installs: 1250,
    costPerRun: 0.95,
    creditsPerRun: 143,
    image: "🆔",
    verified: true,
    featured: true,
    tags: ["compliance", "kyc", "verification"],
  },
  {
    id: "contract-1",
    name: "Contract Analysis & Extraction",
    description: "AI-powered contract review, clause extraction, and risk assessment for legal documents",
    category: "Legal",
    creator: "Legal Automation Inc",
    rating: 4.6,
    reviews: 218,
    installs: 890,
    costPerRun: 0.75,
    creditsPerRun: 113,
    image: "📄",
    verified: true,
    featured: true,
    tags: ["legal", "contracts", "nlp"],
  },
  {
    id: "content-1",
    name: "Content Generation & Optimization",
    description: "Generate, optimize, and publish marketing content with SEO analysis and tone adjustment",
    category: "Marketing",
    creator: "Content Team",
    rating: 4.5,
    reviews: 156,
    installs: 720,
    costPerRun: 0.35,
    creditsPerRun: 53,
    image: "✍️",
    verified: false,
    featured: false,
    tags: ["marketing", "content", "seo"],
  },
  {
    id: "invoice-1",
    name: "Invoice Processing & OCR",
    description: "Extract data from invoices, match with POs, and automate payment processing",
    category: "Finance",
    creator: "Finance Automation",
    rating: 4.7,
    reviews: 289,
    installs: 1050,
    costPerRun: 0.55,
    creditsPerRun: 83,
    image: "💰",
    verified: true,
    featured: true,
    tags: ["finance", "ocr", "automation"],
  },
  {
    id: "support-1",
    name: "Customer Support Chatbot",
    description: "AI-powered support agent with ticket routing, sentiment analysis, and knowledge base integration",
    category: "Support",
    creator: "Support Solutions",
    rating: 4.4,
    reviews: 195,
    installs: 650,
    costPerRun: 0.25,
    creditsPerRun: 38,
    image: "💬",
    verified: false,
    featured: false,
    tags: ["support", "chatbot", "ai"],
  },
  {
    id: "data-1",
    name: "Data Enrichment Pipeline",
    description: "Enrich customer data with demographic, firmographic, and behavioral insights",
    category: "Data",
    creator: "Data Team",
    rating: 4.6,
    reviews: 167,
    installs: 580,
    costPerRun: 0.45,
    creditsPerRun: 68,
    image: "📊",
    verified: true,
    featured: false,
    tags: ["data", "enrichment", "analytics"],
  },
];

const CATEGORIES = ["All", "Compliance", "Legal", "Marketing", "Finance", "Support", "Data"];

export default function Templates() {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"featured" | "popular" | "rating" | "newest">("featured");
  const [likedTemplates, setLikedTemplates] = useState<Set<string>>(new Set());

  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) => tag.includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "featured") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    if (sortBy === "popular") return b.installs - a.installs;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const toggleLike = (templateId: string) => {
    const newLiked = new Set(likedTemplates);
    if (newLiked.has(templateId)) {
      newLiked.delete(templateId);
    } else {
      newLiked.add(templateId);
    }
    setLikedTemplates(newLiked);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            AgentFlow
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/dashboard")} className="text-slate-300 hover:text-slate-100">
              Dashboard
            </button>
            <button onClick={() => navigate("/workflows")} className="text-slate-300 hover:text-slate-100">
              Workflows
            </button>
            <button onClick={() => navigate("/settings")} className="text-slate-300 hover:text-slate-100">
              Settings
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">Template Marketplace</h1>
          <p className="text-slate-400">Discover and deploy pre-built workflows to accelerate your automation</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
            <Input
              type="text"
              placeholder="Search templates by name, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 h-11"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-100 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-all overflow-hidden group"
            >
              {/* Header with Image */}
              <div className="p-6 bg-gradient-to-br from-slate-700/30 to-slate-800/30 border-b border-slate-700/50">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{template.image}</span>
                  <button
                    onClick={() => toggleLike(template.id)}
                    className={`p-2 rounded-lg transition-all ${
                      likedTemplates.has(template.id)
                        ? "bg-red-500/20 text-red-400"
                        : "bg-slate-700/30 text-slate-400 hover:bg-slate-700/50"
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={likedTemplates.has(template.id) ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Title and Category */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-100">{template.name}</h3>
                    {template.verified && (
                      <span className="px-2 py-1 rounded text-xs bg-emerald-500/20 text-emerald-300 font-semibold">
                        ✓ Verified
                      </span>
                    )}
                    {template.featured && (
                      <span className="px-2 py-1 rounded text-xs bg-cyan-500/20 text-cyan-300 font-semibold">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mb-3">{template.description}</p>
                  <span className="inline-block px-2 py-1 rounded text-xs bg-slate-700/50 text-slate-300">
                    {template.category}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="px-6 py-4 border-b border-slate-700/50">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-slate-100">{template.rating}</span>
                      <span className="text-xs text-slate-500">({template.reviews})</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Installs</p>
                    <p className="text-sm font-semibold text-slate-100">{(template.installs / 1000).toFixed(1)}k</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Cost/Run</p>
                    <p className="text-sm font-semibold text-cyan-300">{template.creditsPerRun} credits</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded text-xs bg-slate-700/30 text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Creator and Actions */}
              <div className="px-6 py-4">
                <p className="text-xs text-slate-500 mb-4">by {template.creator}</p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => navigate(`/workflows/builder/new?template=${template.id}`)}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Use Template
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 mb-4">No templates found matching your search</p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              variant="outline"
              className="border-slate-600 text-slate-300"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
