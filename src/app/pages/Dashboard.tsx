import { useNavigate } from 'react-router';
import { MessageCircle, Brain, Smartphone, LogOut } from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const options = [
    {
      id: 'whatsapp',
      title: 'WhatsApp Chatbot',
      description: 'Lab equipment complaint assistant via WhatsApp interface',
      icon: MessageCircle,
      color: 'from-green-400 to-green-600',
      path: '/whatsapp-chatbot',
    },
    {
      id: 'llm',
      title: 'LLM',
      description: 'Large Language Model interface and configuration',
      icon: Brain,
      color: 'from-purple-400 to-purple-600',
      path: '/llm',
    },
    {
      id: 'app',
      title: 'App',
      description: 'Mobile application management and settings',
      icon: Smartphone,
      color: 'from-blue-400 to-blue-600',
      path: '/app',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-3">Choose Your Service</h2>
          <p className="text-gray-600">Select from the available options below</p>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.id}
                onClick={() => navigate(option.path)}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 overflow-hidden group"
              >
                {/* Icon Header */}
                <div className={`bg-gradient-to-br ${option.color} p-8 flex items-center justify-center`}>
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl mb-2">{option.title}</h3>
                  <p className="text-gray-600 text-sm">{option.description}</p>
                  
                  {/* Action Button */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm text-indigo-600 group-hover:text-indigo-800 flex items-center gap-1">
                      Open <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg mb-3">Quick Guide</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-600" />
                WhatsApp Chatbot
              </h4>
              <p className="text-gray-600">
                Access the lab equipment complaint system through WhatsApp messaging interface.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-600" />
                LLM
              </h4>
              <p className="text-gray-600">
                Configure and interact with the Large Language Model for advanced AI capabilities.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-blue-600" />
                App
              </h4>
              <p className="text-gray-600">
                Manage mobile application settings, features, and user configurations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
