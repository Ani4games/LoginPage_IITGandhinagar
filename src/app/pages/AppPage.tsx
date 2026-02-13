import { useNavigate } from 'react-router';
import { ArrowLeft, Smartphone, Users, Bell, Shield } from 'lucide-react';

export function AppPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl mb-3">Mobile Application</h1>
          <p className="text-gray-600">App Management & Configuration</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Users */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl">Active Users</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-600">Total Users</span>
                <span className="font-medium">3,842</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-600">Active Today</span>
                <span className="font-medium">1,523</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-600">New This Week</span>
                <span className="font-medium">127</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg Session Duration</span>
                <span className="font-medium">8m 42s</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl">Push Notifications</h2>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-700">System Alerts</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-700">User Messages</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-700">Updates Available</span>
                <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-700">Marketing</span>
                <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
              </label>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl">Security Settings</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Two-Factor Auth</span>
                  <span className="text-green-600">✓ Enabled</span>
                </div>
                <p className="text-xs text-gray-500">Enhanced security for all users</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">SSL Certificate</span>
                  <span className="text-green-600">✓ Valid</span>
                </div>
                <p className="text-xs text-gray-500">Expires: Dec 15, 2026</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Data Encryption</span>
                  <span className="text-green-600">✓ Active</span>
                </div>
                <p className="text-xs text-gray-500">AES-256 encryption</p>
              </div>
            </div>
          </div>

          {/* App Version */}
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <h2 className="text-xl mb-4">App Information</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Current Version</div>
                <div className="font-medium">v2.4.1</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Build Number</div>
                <div className="font-medium">2024.02.11</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Platform</div>
                <div className="font-medium">iOS & Android</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Last Updated</div>
                <div className="font-medium">Feb 5, 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
