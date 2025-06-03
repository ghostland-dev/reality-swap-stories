
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import IdentityGenerator from '@/components/IdentityGenerator';
import Stories from '@/components/Stories';
import Leaderboard from '@/components/Leaderboard';
import Profile from '@/components/Profile';
import NotificationCenter from '@/components/NotificationCenter';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <IdentityGenerator />;
      case 'stories':
        return <Stories />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile />;
      default:
        return <IdentityGenerator />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-reality-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">RS</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">Reality Swap</h1>
                <p className="text-xs text-gray-600">Le TikTok inversé</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(true)}
                className="relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">2</span>
                </div>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-sm font-bold">⚡</span>
                </div>
                <span className="text-sm font-semibold text-gray-700">1,847</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {renderContent()}
      </main>

      {/* Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Notification Center */}
      <NotificationCenter 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-reality-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-1/3 right-10 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default Index;
