import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, MapPin, Edit2, Save } from "lucide-react";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "AI workflow enthusiast",
    joinDate: "January 15, 2024",
  });

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-100">My Profile</h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-100">{profile.name}</h2>
                <p className="text-slate-400">Member since {profile.joinDate}</p>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className={isEditing ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-700 hover:bg-slate-600"}
            >
              {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit2 className="w-4 h-4 mr-2" />}
              {isEditing ? "Save" : "Edit"}
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
              <Input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                disabled={!isEditing}
                className="bg-slate-700/30 border-slate-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email
                </label>
                <Input
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                  className="bg-slate-700/30 border-slate-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Phone
                </label>
                <Input
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!isEditing}
                  className="bg-slate-700/30 border-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Location
              </label>
              <Input
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                disabled={!isEditing}
                className="bg-slate-700/30 border-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                disabled={!isEditing}
                className="w-full p-3 rounded-lg bg-slate-700/30 border border-slate-600 text-slate-100 disabled:opacity-50"
                rows={4}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <p className="text-slate-400 text-sm mb-2">Total Workflows</p>
            <p className="text-3xl font-bold text-cyan-300">24</p>
          </div>
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <p className="text-slate-400 text-sm mb-2">Total Executions</p>
            <p className="text-3xl font-bold text-purple-300">1,234</p>
          </div>
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <p className="text-slate-400 text-sm mb-2">Total Spent</p>
            <p className="text-3xl font-bold text-emerald-300">$450</p>
          </div>
        </div>
      </div>
    </div>
  );
}
