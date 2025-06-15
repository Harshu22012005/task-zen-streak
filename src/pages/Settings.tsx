
import { Sidebar } from "@/components/Sidebar";
import { NavigationHeader } from "@/components/NavigationHeader";
import { AppThumbnailGenerator } from "@/components/AppThumbnailGenerator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Smartphone } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <NavigationHeader />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Settings</h1>
              <p className="text-gray-600 dark:text-gray-400">Customize your DailyTasker experience</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smartphone className="w-5 h-5" />
                  <span>App Customization</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AppThumbnailGenerator />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5" />
                  <span>Theme Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Theme customization options will be available soon.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
