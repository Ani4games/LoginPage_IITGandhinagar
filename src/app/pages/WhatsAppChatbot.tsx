import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { WhatsAppWireframe } from '../components/WhatsAppWireframe';

export function WhatsAppChatbot() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
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
      <WhatsAppWireframe />
    </div>
  );
}
