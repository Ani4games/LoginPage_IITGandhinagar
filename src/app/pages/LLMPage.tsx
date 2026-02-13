import { useNavigate } from 'react-router';
import { ArrowLeft, Brain, Settings, Database, Activity } from 'lucide-react';

export function LLMPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
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
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl mb-3">Large Language Model</h1>
          <p className="text-gray-600">AI Model Configuration & Management</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Model Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl">Model Status</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-600">Status</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-green-700">Active</span>
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-600">Model Version</span>
                <span>GPT-4-Turbo</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-600">Requests Today</span>
                <span>1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg Response Time</span>
                <span>1.2s</span>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl">Configuration</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Temperature</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  defaultValue="0.7"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Precise</span>
                  <span>Creative</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Max Tokens</label>
                <input
                  type="number"
                  defaultValue="2048"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Update Settings
              </button>
            </div>
          </div>

          {/* Training Data */}
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl">Training Data</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl mb-1">24.5k</div>
                <div className="text-sm text-gray-600">Documents</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl mb-1">1.2M</div>
                <div className="text-sm text-gray-600">Tokens</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl mb-1">15</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
