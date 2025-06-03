
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, Users, Trophy, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const tabs = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'stories', label: 'Histoires', icon: Users },
    { id: 'leaderboard', label: 'Classement', icon: Trophy },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 z-50 safe-area-bottom">
      <div className="flex justify-around items-center py-2 px-4 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center p-3 min-w-0 h-auto rounded-xl transition-all duration-300 hover-scale ${
                isActive 
                  ? 'text-reality-600 bg-reality-50' 
                  : 'text-gray-500 hover:text-reality-500 hover:bg-gray-50'
              }`}
            >
              <div className={`relative ${isActive ? 'animate-bounce-soft' : ''}`}>
                <Icon className={`w-5 h-5 mb-1 ${isActive ? 'drop-shadow-lg' : ''}`} />
                {isActive && (
                  <div className="absolute -inset-1 bg-reality-200 rounded-full opacity-30 animate-pulse-ring"></div>
                )}
              </div>
              <span className={`text-xs font-medium transition-all duration-200 ${
                isActive ? 'text-reality-700' : ''
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-reality-600 rounded-full mt-1 animate-pulse"></div>
              )}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
