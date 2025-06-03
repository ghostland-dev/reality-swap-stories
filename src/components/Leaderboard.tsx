
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Medal, Star, Crown, TrendingUp, Users } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface LeaderboardUser {
  id: number;
  username: string;
  points: number;
  storiesCount: number;
  votesReceived: number;
  rank: number;
  avatar?: string;
  trend: 'up' | 'down' | 'stable';
}

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');
  const [isLoading, setIsLoading] = useState(false);

  const leaderboardData: LeaderboardUser[] = [
    {
      id: 1,
      username: 'MarieP',
      points: 2847,
      storiesCount: 23,
      votesReceived: 189,
      rank: 1,
      trend: 'up'
    },
    {
      id: 2,
      username: 'AlexK',
      points: 2234,
      storiesCount: 18,
      votesReceived: 156,
      rank: 2,
      trend: 'stable'
    },
    {
      id: 3,
      username: 'TomR',
      points: 1998,
      storiesCount: 15,
      votesReceived: 142,
      rank: 3,
      trend: 'up'
    },
    {
      id: 4,
      username: 'Sarah_Chen',
      points: 1756,
      storiesCount: 12,
      votesReceived: 98,
      rank: 4,
      trend: 'down'
    },
    {
      id: 5,
      username: 'Diego_Silva',
      points: 1543,
      storiesCount: 11,
      votesReceived: 87,
      rank: 5,
      trend: 'up'
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-500" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default:
        return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
    }
  };

  const handleTabChange = (tab: 'weekly' | 'monthly' | 'alltime') => {
    setIsLoading(true);
    setActiveTab(tab);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 pb-24">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gradient mb-4">Classement</h2>
        <p className="text-gray-600">Les meilleurs conteurs de la communauté</p>
      </div>

      {/* Time Period Tabs */}
      <div className="flex space-x-2 mb-6 p-1 bg-gray-100 rounded-lg">
        {[
          { key: 'weekly', label: 'Semaine' },
          { key: 'monthly', label: 'Mois' },
          { key: 'alltime', label: 'Tout temps' }
        ].map((tab) => (
          <Button
            key={tab.key}
            onClick={() => handleTabChange(tab.key as 'weekly' | 'monthly' | 'alltime')}
            variant="ghost"
            className={`flex-1 transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-white shadow-sm text-reality-600'
                : 'hover:bg-white/50'
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <Card className="glass-effect border-none shadow-xl">
          <CardContent className="p-8 text-center">
            <LoadingSpinner size="lg" />
            <p className="text-gray-600 mt-4">Chargement du classement...</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {leaderboardData.map((user, index) => (
            <Card 
              key={user.id} 
              className={`glass-effect border-none shadow-xl hover:shadow-2xl transition-all duration-300 ${
                user.rank <= 3 ? 'ring-2 ring-reality-200' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12">
                      {getRankIcon(user.rank)}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        user.rank === 1 ? 'gradient-primary' :
                        user.rank === 2 ? 'bg-gray-400' :
                        user.rank === 3 ? 'bg-orange-400' :
                        'bg-reality-400'
                      }`}>
                        {user.username.slice(0, 2).toUpperCase()}
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-gray-900">@{user.username}</h3>
                          {getTrendIcon(user.trend)}
                        </div>
                        <p className="text-sm text-gray-600">
                          {user.storiesCount} histoires • {user.votesReceived} votes
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-xl font-bold text-gray-900">
                        {user.points.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">points</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8 p-6 bg-gradient-to-r from-reality-50 to-reality-100 rounded-lg text-center">
        <Users className="w-8 h-8 mx-auto mb-3 text-reality-600" />
        <h3 className="font-bold text-reality-800 mb-2">Rejoignez le classement !</h3>
        <p className="text-reality-700 text-sm">
          Partagez vos histoires et gagnez des points pour grimper dans le classement.
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;
