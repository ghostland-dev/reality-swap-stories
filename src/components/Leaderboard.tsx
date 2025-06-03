
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Crown, Star, Trophy, Medal, TrendingUp } from 'lucide-react';

interface Player {
  rank: number;
  name: string;
  points: number;
  bestStory: string;
  identitiesPlayed: number;
  streak: number;
}

const Leaderboard = () => {
  const players: Player[] = [
    {
      rank: 1,
      name: '@MarieChampion',
      points: 2847,
      bestStory: 'L\'accident qui m\'a révélé ma vocation',
      identitiesPlayed: 47,
      streak: 12
    },
    {
      rank: 2,
      name: '@AlexStories',
      points: 2654,
      bestStory: 'Quand j\'ai appris que j\'étais adopté',
      identitiesPlayed: 39,
      streak: 8
    },
    {
      rank: 3,
      name: '@LunaCreative',
      points: 2341,
      bestStory: 'Ma première exposition d\'art',
      identitiesPlayed: 42,
      streak: 15
    },
    {
      rank: 4,
      name: '@TomRising',
      points: 2198,
      bestStory: 'Le jour où j\'ai sauvé un inconnu',
      identitiesPlayed: 31,
      streak: 6
    },
    {
      rank: 5,
      name: '@SarahDreamer',
      points: 2067,
      bestStory: 'Mon voyage en solo à 50 ans',
      identitiesPlayed: 35,
      streak: 9
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <Trophy className="w-5 h-5 text-gray-500" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-300 to-gray-500';
      case 3:
        return 'from-amber-400 to-amber-600';
      default:
        return 'from-reality-400 to-reality-600';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 pb-24">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-4">🏆 Classement</h2>
        <p className="text-gray-600">Les meilleurs conteurs de Reality Swap</p>
      </div>

      {/* Podium pour le top 3 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {players.slice(0, 3).map((player, index) => {
          const positions = [1, 0, 2]; // Ordre pour affichage podium : 2e, 1er, 3e
          const actualIndex = positions.indexOf(index);
          const actualPlayer = players[actualIndex];
          
          return (
            <Card 
              key={actualPlayer.rank}
              className={`glass-effect border-none shadow-xl ${actualPlayer.rank === 1 ? 'transform scale-110' : ''}`}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-r ${getRankColor(actualPlayer.rank)} rounded-full flex items-center justify-center ${actualPlayer.rank === 1 ? 'animate-pulse-glow' : ''}`}>
                  {getRankIcon(actualPlayer.rank)}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{actualPlayer.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{actualPlayer.points} pts</p>
                <div className="flex items-center justify-center">
                  <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">{actualPlayer.streak} jours</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Liste complète */}
      <div className="space-y-3">
        {players.map((player) => (
          <Card key={player.rank} className="glass-effect border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getRankColor(player.rank)} rounded-full flex items-center justify-center text-white font-bold`}>
                    {player.rank}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{player.name}</h3>
                    <p className="text-sm text-gray-600 truncate max-w-xs">{player.bestStory}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">{player.identitiesPlayed} identités</span>
                      <div className="flex items-center">
                        <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                        <span className="text-xs text-green-600">{player.streak} jours</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="font-bold text-lg text-gray-900">{player.points}</span>
                  </div>
                  <span className="text-xs text-gray-500">points</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-reality-50 to-reality-100 rounded-lg text-center">
        <h3 className="font-bold text-reality-800 mb-2">🎯 Comment gagner des points ?</h3>
        <div className="text-sm text-reality-700 space-y-1">
          <p>• +10 pts pour chaque histoire partagée</p>
          <p>• +5 pts par vote reçu</p>
          <p>• +20 pts pour une histoire dans le top 10</p>
          <p>• +50 pts bonus pour 7 jours consécutifs</p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
