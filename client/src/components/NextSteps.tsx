import { CheckCircle, Zap, Users, Rocket } from "lucide-react";

export default function NextSteps() {
  const phases = [
    {
      title: "Phase 0: Validation (Week 1)",
      icon: Users,
      color: "cyan",
      tasks: [
        "Conduct 10-15 customer interviews with Algerian SMBs",
        "Validate pain points (manual workflows, WhatsApp chaos)",
        "Understand willingness to pay",
        "Identify must-have features vs. nice-to-have",
        "Test Gumloop integration with proof-of-concept",
        "Validate payment integration with CIB/SATIM/Baridimob",
      ],
    },
    {
      title: "Phase 1: MVP Launch (Weeks 2-3)",
      icon: Rocket,
      color: "purple",
      tasks: [
        "Set up FastAPI + PostgreSQL + Redis infrastructure",
        "Implement authentication and basic rate limiting",
        "Create 5 pre-built templates (lead gen, support, etc.)",
        "Build simple dashboard for users",
        "Deploy to production (Railway, Render, or AWS)",
        "Launch with 10-20 beta users",
      ],
    },
    {
      title: "Phase 2: Iterate & Expand (Weeks 4-6)",
      icon: Zap,
      color: "emerald",
      tasks: [
        "Gather feedback from beta users",
        "Implement dynamic workflow generation",
        "Build template marketplace",
        "Add local payment integration",
        "Expand to 100+ users",
        "Optimize based on user feedback",
      ],
    },
  ];

  const immediateActions = [
    {
      action: "Choose your stack",
      details: "FastAPI (recommended) or Flask",
      owner: "Tech Lead",
      timeline: "Day 1",
    },
    {
      action: "Set up repository structure",
      details: "Follow Phase 1 checklist",
      owner: "Tech Lead",
      timeline: "Day 1-2",
    },
    {
      action: "Create Gumloop integration",
      details: "Test triggering workflows",
      owner: "Backend Engineer",
      timeline: "Day 2-3",
    },
    {
      action: "Build authentication",
      details: "JWT-based user system",
      owner: "Backend Engineer",
      timeline: "Day 3-4",
    },
    {
      action: "Deploy MVP",
      details: "Get first 10 beta users",
      owner: "DevOps/Tech Lead",
      timeline: "Day 5-7",
    },
  ];

  const criticalQuestions = [
    {
      question: "Domain name?",
      example: "e.g., algeriaagents.com",
      importance: "High",
    },
    {
      question: "Hosting provider?",
      example: "Railway, Render, AWS, DigitalOcean?",
      importance: "High",
    },
    {
      question: "Payment processor?",
      example: "Stripe for cards, CCP for local",
      importance: "Critical",
    },
    {
      question: "Frontend framework?",
      example: "React, Vue, or Next.js?",
      importance: "High",
    },
    {
      question: "Initial templates?",
      example: "Which 5 workflows to launch with?",
      importance: "High",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Next Steps
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
        </div>

        {/* Implementation Phases */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">
            Implementation Roadmap
          </h3>
          <div className="space-y-6">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const colorMap: Record<string, string> = {
                cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
                purple: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
                emerald: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
              };

              return (
                <div
                  key={index}
                  className={`p-8 rounded-lg bg-gradient-to-br ${colorMap[phase.color]} border`}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`p-3 rounded-lg ${
                        phase.color === "cyan"
                          ? "bg-cyan-500/20"
                          : phase.color === "purple"
                          ? "bg-purple-500/20"
                          : "bg-emerald-500/20"
                      }`}
                    >
                      <Icon className="w-6 h-6 text-slate-100" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-100">
                      {phase.title}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {phase.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex gap-3 p-3 rounded bg-slate-800/30">
                        <CheckCircle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-300">{task}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Immediate Actions */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">
            Immediate Action Items (Week 1)
          </h3>
          <div className="space-y-3">
            {immediateActions.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-start justify-between"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-100 mb-1">
                    {item.action}
                  </h4>
                  <p className="text-sm text-slate-400">{item.details}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-xs text-slate-400 mb-1">Owner</p>
                  <p className="text-sm font-semibold text-cyan-300 mb-2">
                    {item.owner}
                  </p>
                  <p className="text-xs text-slate-500">{item.timeline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Questions */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">
            Critical Questions to Answer
          </h3>
          <p className="text-slate-400 mb-6">
            Before starting implementation, ensure clarity on these decisions:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {criticalQuestions.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-slate-100 flex-1">
                    {item.question}
                  </h4>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded whitespace-nowrap ml-2 ${
                      item.importance === "Critical"
                        ? "bg-red-500/20 text-red-300"
                        : "bg-amber-500/20 text-amber-300"
                    }`}
                  >
                    {item.importance}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{item.example}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Recommendation */}
        <div className="p-8 rounded-lg bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-purple-500/10 border border-emerald-500/30">
          <h3 className="text-2xl font-bold text-slate-100 mb-4">
            Final Recommendation
          </h3>
          <p className="text-slate-300 mb-6 leading-relaxed">
            <strong>Proceed with Phase 0 validation, then launch MVP in Week 2-3.</strong> The key to success is moving fast, staying close to customers, and building the local moat early. The market opportunity is real, the timing is right, and the execution is achievable.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded bg-slate-800/30 border border-slate-700/30">
              <p className="text-sm text-slate-400 mb-2">Timeline</p>
              <p className="text-lg font-bold text-cyan-300">6-8 Weeks</p>
              <p className="text-xs text-slate-500 mt-1">To full feature set</p>
            </div>
            <div className="p-4 rounded bg-slate-800/30 border border-slate-700/30">
              <p className="text-sm text-slate-400 mb-2">Team Size</p>
              <p className="text-lg font-bold text-purple-300">2-3 Engineers</p>
              <p className="text-xs text-slate-500 mt-1">+ 1 Product Manager</p>
            </div>
            <div className="p-4 rounded bg-slate-800/30 border border-slate-700/30">
              <p className="text-sm text-slate-400 mb-2">Break-Even</p>
              <p className="text-lg font-bold text-emerald-300">Month 8-10</p>
              <p className="text-xs text-slate-500 mt-1">With proper execution</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
