import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, CheckCircle, AlertCircle, Eye, ArrowRight } from "lucide-react";

interface PublishFormData {
  name: string;
  description: string;
  category: string;
  tags: string[];
  icon: string;
  pricing: number;
  documentation: string;
  previewImages: string[];
  terms: boolean;
}

const CATEGORIES = [
  "Compliance",
  "Legal",
  "Marketing",
  "Finance",
  "Support",
  "Data",
  "Operations",
  "HR",
  "Sales",
  "Other",
];

export default function PublishTemplate() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<"details" | "pricing" | "preview" | "submit">("details");
  const [formData, setFormData] = useState<PublishFormData>({
    name: "",
    description: "",
    category: "",
    tags: [],
    icon: "📋",
    pricing: 100,
    documentation: "",
    previewImages: [],
    terms: false,
  });
  const [tagInput, setTagInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const addTag = () => {
    if (tagInput.trim() && formData.tags.length < 5) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const isStepValid = () => {
    if (step === "details") {
      return formData.name && formData.description && formData.category && formData.tags.length > 0;
    }
    if (step === "pricing") {
      return formData.pricing > 0;
    }
    if (step === "preview") {
      return formData.documentation.length > 10;
    }
    return true;
  };

  const handleSubmit = () => {
    if (formData.terms) {
      setSubmitted(true);
      setTimeout(() => {
        navigate("/my-templates");
      }, 2000);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-lg bg-slate-800/50 border border-slate-700/50 p-8 text-center">
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-100 mb-2">Template Submitted!</h1>
          <p className="text-slate-400 mb-6">
            Your template has been submitted for review. We'll notify you once it's approved.
          </p>
          <Button
            onClick={() => navigate("/my-templates")}
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0"
          >
            View My Templates
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Publish Template</h1>
            <p className="text-sm text-slate-400">Share your workflow with the community</p>
          </div>
          <button onClick={() => navigate("/my-templates")} className="text-slate-400 hover:text-slate-100">
            ✕
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {["details", "pricing", "preview", "submit"].map((s, index) => (
              <div key={s} className="flex items-center">
                <button
                  onClick={() => setStep(s as any)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step === s
                      ? "bg-cyan-500 text-white"
                      : ["details", "pricing", "preview"].includes(s) && step !== "details"
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {index + 1}
                </button>
                {index < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      ["pricing", "preview", "submit"].includes(step) && index < ["details", "pricing", "preview"].indexOf(step)
                        ? "bg-emerald-500"
                        : "bg-slate-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-400">
            <span>Details</span>
            <span>Pricing</span>
            <span>Preview</span>
            <span>Submit</span>
          </div>
        </div>

        {/* Step 1: Details */}
        {step === "details" && (
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Template Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., KYC Verification Pipeline"
                className="bg-slate-800/50 border-slate-700 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what your template does and who it's for..."
                rows={4}
                className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
              <p className="text-xs text-slate-500 mt-1">{formData.description.length}/500 characters</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-100"
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Icon</label>
                <div className="flex gap-2">
                  <Input
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    maxLength={2}
                    className="bg-slate-800/50 border-slate-700 text-slate-100 text-2xl text-center"
                  />
                  <div className="flex items-center justify-center w-12 h-10 rounded-lg bg-slate-700/30 text-2xl">
                    {formData.icon}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Tags (Max 5)</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                  placeholder="Add a tag and press Enter"
                  className="bg-slate-800/50 border-slate-700 text-slate-100"
                />
                <Button onClick={addTag} variant="outline" className="border-slate-600 text-slate-300">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button onClick={() => removeTag(index)} className="hover:text-cyan-200">
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => navigate("/my-templates")}
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setStep("pricing")}
                disabled={!isStepValid()}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0 disabled:opacity-50"
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Pricing */}
        {step === "pricing" && (
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Suggested Price (Credits)</label>
              <div className="relative">
                <Input
                  type="number"
                  value={formData.pricing}
                  onChange={(e) => setFormData({ ...formData, pricing: parseInt(e.target.value) || 0 })}
                  min="10"
                  max="10000"
                  className="bg-slate-800/50 border-slate-700 text-slate-100 pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">credits</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Estimated USD cost: ${(formData.pricing / 100).toFixed(2)} per execution
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30">
              <h3 className="font-semibold text-slate-100 mb-3">Revenue Split</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Your Earnings (45%):</span>
                  <span className="text-cyan-300 font-semibold">{Math.round(formData.pricing * 0.45)} credits</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Platform Fee (30%):</span>
                  <span className="text-purple-300 font-semibold">{Math.round(formData.pricing * 0.3)} credits</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Provider Costs (25%):</span>
                  <span className="text-pink-300 font-semibold">{Math.round(formData.pricing * 0.25)} credits</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <p className="text-sm text-emerald-300">
                ✓ You'll earn <strong>{Math.round(formData.pricing * 0.45)} credits</strong> per execution of your template
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setStep("details")}
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep("preview")}
                disabled={!isStepValid()}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0 disabled:opacity-50"
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Preview */}
        {step === "preview" && (
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Documentation</label>
              <textarea
                value={formData.documentation}
                onChange={(e) => setFormData({ ...formData, documentation: e.target.value })}
                placeholder="Write comprehensive documentation for your template..."
                rows={8}
                className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono text-sm"
              />
              <p className="text-xs text-slate-500 mt-1">{formData.documentation.length} characters</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30">
              <h3 className="font-semibold text-slate-100 mb-4">Preview</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{formData.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-100">{formData.name}</h4>
                    <p className="text-sm text-slate-400">{formData.description}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 rounded text-xs bg-slate-600/50 text-slate-300">{formData.category}</span>
                      {formData.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 rounded text-xs bg-cyan-500/20 text-cyan-300">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setStep("pricing")}
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep("submit")}
                disabled={!isStepValid()}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0 disabled:opacity-50"
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Submit */}
        {step === "submit" && (
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-8 space-y-6">
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm text-blue-300">
                <strong>Review Summary:</strong> Your template will be reviewed by our team within 24 hours. Once approved, it
                will be available in the marketplace.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-100">Template Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Name</p>
                  <p className="text-slate-100 font-semibold">{formData.name}</p>
                </div>
                <div>
                  <p className="text-slate-500">Category</p>
                  <p className="text-slate-100 font-semibold">{formData.category}</p>
                </div>
                <div>
                  <p className="text-slate-500">Price</p>
                  <p className="text-slate-100 font-semibold">{formData.pricing} credits</p>
                </div>
                <div>
                  <p className="text-slate-500">Your Earnings</p>
                  <p className="text-emerald-300 font-semibold">{Math.round(formData.pricing * 0.45)} credits/run</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-700/30 border border-slate-600/30">
              <input
                type="checkbox"
                checked={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                className="w-4 h-4 mt-1"
              />
              <label className="text-sm text-slate-300">
                I agree to the <span className="text-cyan-300 hover:underline cursor-pointer">Terms of Service</span> and{" "}
                <span className="text-cyan-300 hover:underline cursor-pointer">Creator Agreement</span>. I confirm that this
                template complies with all policies and does not infringe on any intellectual property rights.
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setStep("preview")}
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!formData.terms}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit for Review
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
