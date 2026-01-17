import { Activity, Zap, FileText, Users, DollarSign, Settings } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "workflow" | "template" | "team" | "billing" | "settings";
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
  color: string;
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    type: "workflow",
    title: "Workflow Executed",
    description: "Customer Onboarding workflow completed successfully",
    timestamp: "2 minutes ago",
    icon: <Zap className="w-5 h-5" />,
    color: "text-cyan-400",
  },
  {
    id: "2",
    type: "template",
    title: "Template Published",
    description: "KYC Verification template published to marketplace",
    timestamp: "1 hour ago",
    icon: <FileText className="w-5 h-5" />,
    color: "text-purple-400",
  },
  {
    id: "3",
    type: "team",
    title: "Team Member Added",
    description: "Sarah Johnson added to your workspace as Editor",
    timestamp: "3 hours ago",
    icon: <Users className="w-5 h-5" />,
    color: "text-emerald-400",
  },
  {
    id: "4",
    type: "billing",
    title: "Payment Received",
    description: "Earned $45.50 from template usage",
    timestamp: "1 day ago",
    icon: <DollarSign className="w-5 h-5" />,
    color: "text-emerald-400",
  },
  {
    id: "5",
    type: "workflow",
    title: "Workflow Created",
    description: "Invoice Processing workflow created",
    timestamp: "2 days ago",
    icon: <Zap className="w-5 h-5" />,
    color: "text-cyan-400",
  },
  {
    id: "6",
    type: "settings",
    title: "Settings Updated",
    description: "Notification preferences changed",
    timestamp: "3 days ago",
    icon: <Settings className="w-5 h-5" />,
    color: "text-slate-400",
  },
  {
    id: "7",
    type: "team",
    title: "Team Member Removed",
    description: "John Doe removed from workspace",
    timestamp: "1 week ago",
    icon: <Users className="w-5 h-5" />,
    color: "text-red-400",
  },
  {
    id: "8",
    type: "workflow",
    title: "Workflow Deleted",
    description: "Old Test workflow deleted",
    timestamp: "2 weeks ago",
    icon: <Zap className="w-5 h-5" />,
    color: "text-red-400",
  },
];

export default function ActivityTimeline() {
  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-6 h-6" />
            Activity Timeline
          </h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {ACTIVITIES.map((activity, index) => (
            <div key={activity.id} className="flex gap-6">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className={`p-3 rounded-full bg-slate-800/50 border border-slate-700/50 ${activity.color}`}>
                  {activity.icon}
                </div>
                {index < ACTIVITIES.length - 1 && (
                  <div className="w-1 h-16 bg-gradient-to-b from-slate-700 to-slate-800 my-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pt-1 pb-6">
                <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6 hover:border-slate-600/50 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-100">{activity.title}</h3>
                    <span className="text-xs text-slate-400 whitespace-nowrap ml-4">{activity.timestamp}</span>
                  </div>
                  <p className="text-slate-400">{activity.description}</p>

                  {/* Activity Type Badge */}
                  <div className="mt-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-700/30 border border-slate-600/30 text-xs font-medium text-slate-300">
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:border-slate-600/50 transition-all font-medium">
            Load More Activity
          </button>
        </div>
      </div>
    </div>
  );
}
