
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Medal, Trophy, TrendingUp, Star, Users, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CreateStory from './CreateStory';

interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  storiesCount: number;
  likesReceived: number;
  avatar: string;
  badge?: string;
}

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');
  const [showCreateStory, setShowCreateStory] = useState(false);
  const { toast } = useToast();

  const leaderboardData: Record<string, LeaderboardEntry[]> = {
    weekly: [
      { rank: 1, username: '@AlexK', points: 2847, storiesCount: 12, likesReceived: 234, avatar: '🌟', badge: 'Conteur de la semaine' },
      { rank: 2, username: '@MarieP', points: 2156, storiesCount: 8, likesReceived: 189, avatar: '🎭' },
      { rank: 3, username: '@TomR', points: 1923, storiesCount: 15, likesReceived: 167, avatar: '🎨' },
      { rank: 4, username: '@SarahC', points: 1645, storiesCount: 6, likesReceived: 143, avatar: '🎵' },
      { rank: 5, username: '@EmmaJ', points: 1421, storiesCount: 9, likesReceived: 128, avatar: '🚀' },
      { rank: 6, username: '@LucasM', points: 1298, storiesCount: 7, likesReceived: 115, avatar: '🌈' },
      { rank: 7, username: '@ChloeB', points: 1156, storiesCount: 5, likesReceived: 98, avatar: '🦋' },
      { rank: 8, username: '@MaxR', points: 1034, storiesCount: 8, likesReceived: 87, avatar: '⚡' },
    ],
    monthly: [
      { rank: 1, username: '@MarieP', points: 8945, storiesCount: 32, likesReceived: 756, avatar: '🎭', badge: 'Légende du mois' },
      { rank: 2, username: '@AlexK', points: 8234, storiesCount: 28, likesReceived: 689, avatar: '🌟' },
      { rank: 3, username: '@TomR', points: 7456, storiesCount: 41, likesReceived: 612, avatar: '🎨' },
      { rank: 4, username: '@EmmaJ', points: 6789, storiesCount: 25, likesReceived: 534, avatar: '🚀' },
      { rank: 5, username: '@SarahC', points: 6234, storiesCount: 19, likesReceived: 467, avatar: '🎵' },
      { rank: 6, username: '@LucasM', points: 5678, storiesCount: 23, likesReceived: 423, avatar: '🌈' },
      { rank: 7, username: '@ChloeB', points: 5123, storiesCount: 18, likesReceived: 389, avatar: '🦋' },
      { rank: 8, username: '@MaxR', points: 4567, storiesCount: 21, likesReceived: 345, avatar: '⚡' },
    ],
    allTime: [
      { rank: 1, username: '@TomR', points: 45678, storiesCount: 234, likesReceived: 3456, avatar: '🎨', badge: 'Maître conteur' },
      { rank: 2, username: '@MarieP', points: 42134, storiesCount: 198, likesReceived: 3123, avatar: '🎭' },
      { rank: 3, username: '@AlexK', points: 38567, storiesCount: 156, likesReceived: 2789, avatar: '🌟' },
      { rank: 4, username: '@EmmaJ', points: 34123, storiesCount: 187, likesReceived: 2456, avatar: '🚀' },
      { rank: 5, username: '@SarahC', points: 29876, storiesCount: 134, likesReceived: 2234, avatar: '🎵' },
      { rank: 6, username: '@LucasM', points: 26789, storiesCount: 145, likesReceived: 1987, avatar: '🌈' },
      { rank: 7, username: '@ChloeB', points: 23456, storiesCount: 112, likesReceived: 1756, avatar: '🦋' },
      { rank: 8, username: '@MaxR', points: 21234, storiesCount: 134, likesReceived: 1634, avatar: '⚡' },
    ]
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Trophy className="w-6 h-6 text-orange-500" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</div>;
    }
  };

  const getRankClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200';
      case 3:
        return 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200';
      default:
        return 'bg-white border-gray-100';
    }
  };

  const handleCreateStory = () => {
    setShowCreateStory(true);
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-6 pb-24">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gradient mb-4">Classement</h2>
          <p className="text-gray-600">Les meilleurs conteurs de la communauté</p>
        </div>

        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8">
          <Button
            variant={activeTab === 'weekly' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('weekly')}
            className={`flex-1 ${activeTab === 'weekly' ? 'gradient-primary text-white' : 'text-gray-600'}`}
          >
            Cette semaine
          </Button>
          <Button
            variant={activeTab === 'monthly' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('monthly')}
            className={`flex-1 ${activeTab === 'monthly' ? 'gradient-primary text-white' : 'text-gray-600'}`}
          >
            Ce mois
          </Button>
          <Button
            variant={activeTab === 'allTime' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('allTime')}
            className={`flex-1 ${activeTab === 'allTime' ? 'gradient-primary text-white' : 'text-gray-600'}`}
          >
            Tout temps
          </Button>
        </div>

        <div className="space-y-3">
          {leaderboardData[activeTab].map((entry, index) => (
            <Card 
              key={entry.username} 
              className={`glass-effect border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up ${getRankClass(entry.rank)}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      {getRankIcon(entry.rank)}
                      <div className="text-3xl">{entry.avatar}</div>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-gray-900">{entry.username}</h3>
                        {entry.badge && (
                          <span className="px-2 py-1 bg-reality-100 text-reality-700 text-xs rounded-full font-medium">
                            {entry.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{entry.points.toLocaleString()} pts</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span>{entry.storiesCount} histoires</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span>{entry.likesReceived} likes</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-gradient">
                      #{entry.rank}
                    </div>
                    {entry.rank <= 3 && (
                      <div className="flex items-center justify-end mt-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass-effect border-none shadow-xl mt-8">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-reality-500 to-reality-700 rounded-full flex items-center justify-center">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Votre classement</h3>
            <p className="text-gray-600 mb-4">
              Vous êtes actuellement #47 avec 1,847 points
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-reality-600">3</div>
                <div className="text-sm text-gray-600">Histoires</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-reality-600">156</div>
                <div className="text-sm text-gray-600">Likes reçus</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-reality-600">23</div>
                <div className="text-sm text-gray-600">Commentaires</div>
              </div>
            </div>
            <Button 
              onClick={handleCreateStory}
              className="gradient-primary text-white mt-4 hover-scale"
            >
              Raconter une nouvelle histoire
            </Button>
          </CardContent>
        </Card>
      </div>

      {showCreateStory && (
        <CreateStory 
          onClose={() => setShowCreateStory(false)} 
        />
      )}
    </>
  );
};

export default Leaderboard;
