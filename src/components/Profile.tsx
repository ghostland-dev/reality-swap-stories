
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Star, TrendingUp, Calendar, Award, Settings, Crown } from 'lucide-react';

const Profile = () => {
  const userStats = {
    name: '@VotreNom',
    rank: 8,
    points: 1847,
    identitiesPlayed: 23,
    currentStreak: 5,
    bestStreak: 12,
    totalVotes: 156,
    storiesShared: 18,
    joinDate: 'Mars 2024'
  };

  const recentIdentities = [
    { name: 'Emma Johnson', profession: 'Photographe', country: 'Canada', rating: 4.8 },
    { name: 'Diego Silva', profession: 'Surfeur', country: 'Brésil', rating: 4.6 },
    { name: 'Zara Okafor', profession: 'Médecin', country: 'Nigeria', rating: 4.9 }
  ];

  const achievements = [
    { icon: Crown, title: 'Premier pas', description: 'Première identité jouée', unlocked: true },
    { icon: Star, title: 'Conteur', description: '10 histoires partagées', unlocked: true },
    { icon: TrendingUp, title: 'En série', description: '7 jours consécutifs', unlocked: true },
    { icon: Award, title: 'Top 10', description: 'Histoire dans le top 10', unlocked: false }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 pb-24">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-4">Mon Profil</h2>
        <p className="text-gray-600">Votre aventure Reality Swap</p>
      </div>

      {/* Profil principal */}
      <Card className="glass-effect border-none shadow-xl mb-6">
        <CardContent className="p-6 text-center">
          <div className="w-20 h-20 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{userStats.name}</h3>
          <div className="flex items-center justify-center mb-4">
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-lg font-semibold text-gray-700">{userStats.points} points</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-reality-600">#{userStats.rank}</p>
              <p className="text-sm text-gray-600">Classement</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-reality-600">{userStats.currentStreak}</p>
              <p className="text-sm text-gray-600">Jours consécutifs</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      <Card className="glass-effect border-none shadow-xl mb-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900">📊 Statistiques</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Identités jouées</p>
              <p className="text-2xl font-bold text-reality-600">{userStats.identitiesPlayed}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Histoires partagées</p>
              <p className="text-2xl font-bold text-reality-600">{userStats.storiesShared}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <p className="text-sm text-gray-600">Votes reçus</p>
              <p className="text-2xl font-bold text-reality-600">{userStats.totalVotes}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
              <p className="text-sm text-gray-600">Meilleure série</p>
              <p className="text-2xl font-bold text-reality-600">{userStats.bestStreak}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Identités récentes */}
      <Card className="glass-effect border-none shadow-xl mb-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900">🎭 Identités récentes</h3>
          <div className="space-y-3">
            {recentIdentities.map((identity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{identity.name}</p>
                  <p className="text-sm text-gray-600">{identity.profession} • {identity.country}</p>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="font-semibold text-gray-700">{identity.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Succès */}
      <Card className="glass-effect border-none shadow-xl mb-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900">🏆 Succès</h3>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border-2 ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-r from-reality-50 to-reality-100 border-reality-300' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-2 ${
                    achievement.unlocked ? 'text-reality-600' : 'text-gray-400'
                  }`} />
                  <p className={`font-semibold text-sm ${
                    achievement.unlocked ? 'text-reality-800' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </p>
                  <p className={`text-xs ${
                    achievement.unlocked ? 'text-reality-600' : 'text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-3">
        <Button className="w-full gradient-primary text-white py-3 rounded-full hover:scale-105 transition-transform">
          <Settings className="w-5 h-5 mr-2" />
          Paramètres du compte
        </Button>
        <div className="text-center">
          <p className="text-sm text-gray-500">Membre depuis {userStats.joinDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
