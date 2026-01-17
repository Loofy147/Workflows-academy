import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Shield, Bell, Eye, EyeOff } from "lucide-react";

export default function AccountSettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
  });

  const handleChangePassword = () => {
    alert("Password changed successfully!");
    setSettings({
      ...settings,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-100">Account Settings</h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Security Settings */}
        <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6 text-cyan-400" />
            Security
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Current Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={settings.currentPassword}
                  onChange={(e) => setSettings({ ...settings, currentPassword: e.target.value })}
                  placeholder="Enter your current password"
                  className="bg-slate-700/30 border-slate-600 pr-10"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">New Password</label>
                <Input
                  type="password"
                  value={settings.newPassword}
                  onChange={(e) => setSettings({ ...settings, newPassword: e.target.value })}
                  placeholder="Enter new password"
                  className="bg-slate-700/30 border-slate-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Confirm Password</label>
                <Input
                  type="password"
                  value={settings.confirmPassword}
                  onChange={(e) => setSettings({ ...settings, confirmPassword: e.target.value })}
                  placeholder="Confirm new password"
                  className="bg-slate-700/30 border-slate-600"
                />
              </div>
            </div>

            <Button
              onClick={handleChangePassword}
              className="bg-cyan-600 hover:bg-cyan-700 text-white border-0"
            >
              Change Password
            </Button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-purple-400" />
            Two-Factor Authentication
          </h2>

          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 border border-slate-600/30">
            <div>
              <p className="font-semibold text-slate-100">Enable 2FA</p>
              <p className="text-sm text-slate-400">Protect your account with two-factor authentication</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, twoFactorEnabled: !settings.twoFactorEnabled })}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                settings.twoFactorEnabled
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-slate-700 hover:bg-slate-600 text-slate-100"
              }`}
            >
              {settings.twoFactorEnabled ? "Enabled" : "Disabled"}
            </button>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Bell className="w-6 h-6 text-emerald-400" />
            Notification Preferences
          </h2>

          <div className="space-y-4">
            {[
              {
                key: "emailNotifications",
                label: "Email Notifications",
                description: "Receive email updates about your workflows",
              },
              {
                key: "pushNotifications",
                label: "Push Notifications",
                description: "Get push notifications on your devices",
              },
              {
                key: "weeklyDigest",
                label: "Weekly Digest",
                description: "Receive a weekly summary of your activity",
              },
            ].map((pref) => (
              <div key={pref.key} className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 border border-slate-600/30">
                <div>
                  <p className="font-semibold text-slate-100">{pref.label}</p>
                  <p className="text-sm text-slate-400">{pref.description}</p>
                </div>
                <button
                  onClick={() =>
                    setSettings({
                      ...settings,
                      [pref.key]: !settings[pref.key as keyof typeof settings],
                    })
                  }
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    settings[pref.key as keyof typeof settings]
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-slate-700 hover:bg-slate-600 text-slate-100"
                  }`}
                >
                  {settings[pref.key as keyof typeof settings] ? "On" : "Off"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mt-8 rounded-lg bg-red-500/10 border border-red-500/30 p-8">
          <h2 className="text-2xl font-bold text-red-400 mb-6">Danger Zone</h2>
          <div className="space-y-4">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white border-0">
              Delete Account
            </Button>
            <p className="text-sm text-slate-400">
              Once you delete your account, there is no going back. Please be certain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
