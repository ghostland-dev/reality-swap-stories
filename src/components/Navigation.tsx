
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, BookOpen, Trophy, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'stories', label: 'Histoires', icon: BookOpen },
    { id: 'leaderboard', label: 'Classement', icon: Trophy },
    { id: 'profile', label: 'Profil', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 z-50">
      <div className="max-w-2xl mx-auto px-6 py-3">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-reality-600 bg-reality-50' 
                    : 'text-gray-600 hover:text-reality-600 hover:bg-reality-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-reality-600' : 'text-gray-600'}`} />
                <span className={`text-xs font-medium ${isActive ? 'text-reality-600' : 'text-gray-600'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="w-4 h-0.5 bg-reality-600 rounded-full"></div>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
