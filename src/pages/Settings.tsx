
import { useEmailPreferences } from "@/hooks/useEmailPreferences";
import { useTheme } from "@/contexts/ThemeContext";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { User, Bell, Palette, Shield } from "lucide-react";

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { preferences, updatePreferences, isLoading, isUpdating } = useEmailPreferences();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved!",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleEmailUpdatesChange = (checked: boolean) => {
    updatePreferences({ email_updates: checked });
  };

  const handlePushNotificationsChange = (checked: boolean) => {
    updatePreferences({ push_notifications: checked });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        <Sidebar />
        <div className="flex-1 p-4 lg:p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 bg-sky-500 rounded-lg animate-pulse mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading settings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar />
      
      <div className="flex-1 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Settings ⚙️
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Customize your DailyTasker experience
            </p>
          </div>

          <div className="space-y-6">
            {/* Profile Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-sky-600" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Profile</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Email cannot be changed from this page
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="display-name" className="text-gray-700 dark:text-gray-300">Display Name</Label>
                  <Input
                    id="display-name"
                    type="text"
                    placeholder="Enter your display name"
                    className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  />
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-sky-600" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Notifications</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications" className="text-gray-700 dark:text-gray-300">Push Notifications</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Get notified about task reminders and achievements
                    </p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={preferences?.push_notifications || false}
                    onCheckedChange={handlePushNotificationsChange}
                    disabled={isUpdating}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-updates" className="text-gray-700 dark:text-gray-300">Email Updates</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive instant email notifications when you create or complete tasks
                    </p>
                  </div>
                  <Switch
                    id="email-updates"
                    checked={preferences?.email_updates || false}
                    onCheckedChange={handleEmailUpdatesChange}
                    disabled={isUpdating}
                  />
                </div>
              </div>
            </div>

            {/* Appearance Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-6 h-6 text-sky-600" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Appearance</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode" className="text-gray-700 dark:text-gray-300">Dark Mode</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Switch to dark theme for better night viewing
                    </p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={isDarkMode}
                    onCheckedChange={toggleDarkMode}
                  />
                </div>
              </div>
            </div>

            {/* Privacy Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-sky-600" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Privacy & Security</h2>
              </div>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
                  Export Data
                </Button>
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button 
                onClick={handleSaveSettings}
                className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-2 rounded-xl"
              >
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
