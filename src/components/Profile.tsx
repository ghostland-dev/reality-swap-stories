
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { User, Edit3, Star, Trophy, Heart, MessageCircle, Settings, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: 'AlexK',
    bio: 'Passionné de récits authentiques et de partage d\'expériences. J\'adore découvrir les histoires qui nous connectent.',
    email: 'alex.k@exemple.com',
    joinDate: 'Janvier 2024'
  });
  const [editData, setEditData] = useState(profileData);
  const { toast } = useToast();

  const userStats = {
    points: 1847,
    stories: 12,
    votes: 156,
    comments: 89,
    rank: 4
  };

  const recentStories = [
    {
      id: 1,
      title: 'Le jour où j\'ai changé de vie',
      votes: 47,
      comments: 12,
      timeAgo: '3j'
    },
    {
      id: 2,
      title: 'Une rencontre inattendue',
      votes: 23,
      comments: 8,
      timeAgo: '1s'
    },
    {
      id: 3,
      title: 'Mon défi personnel',
      votes: 31,
      comments: 15,
      timeAgo: '2s'
    }
  ];

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    toast({
      title: "Profil mis à jour !",
      description: "Vos modifications ont été sauvegardées.",
    });
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 pb-24 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center">
          <User className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gradient mb-2">Mon Profil</h2>
        <p className="text-gray-600">Gérez vos informations et suivez vos performances</p>
      </div>

      {/* Profile Info Card */}
      <Card className="glass-effect border-none shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Informations personnelles</h3>
            {!isEditing ? (
              <Button 
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
                className="hover-scale"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Modifier
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button 
                  onClick={handleSave}
                  size="sm"
                  className="gradient-primary text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Sauver
                </Button>
                <Button 
                  onClick={handleCancel}
                  variant="outline"
                  size="sm"
                >
                  <X className="w-4 h-4 mr-2" />
                  Annuler
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom d'utilisateur
              </label>
              {isEditing ? (
                <Input
                  value={editData.username}
                  onChange={(e) => setEditData({...editData, username: e.target.value})}
                  placeholder="Votre nom d'utilisateur"
                />
              ) : (
                <p className="text-gray-900 font-semibold">@{profileData.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              {isEditing ? (
                <Textarea
                  value={editData.bio}
                  onChange={(e) => setEditData({...editData, bio: e.target.value})}
                  placeholder="Parlez-nous de vous..."
                  rows={3}
                />
              ) : (
                <p className="text-gray-700">{profileData.bio}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              {isEditing ? (
                <Input
                  value={editData.email}
                  onChange={(e) => setEditData({...editData, email: e.target.value})}
                  placeholder="votre@email.com"
                  type="email"
                />
              ) : (
                <p className="text-gray-700">{profileData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Membre depuis
              </label>
              <p className="text-gray-700">{profileData.joinDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card className="glass-effect border-none shadow-xl">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Mes statistiques</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-r from-reality-50 to-reality-100 rounded-lg">
              <Star className="w-6 h-6 mx-auto mb-2 text-reality-600" />
              <p className="text-2xl font-bold text-reality-800">{userStats.points}</p>
              <p className="text-sm text-reality-600">Points</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <MessageCircle className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-800">{userStats.stories}</p>
              <p className="text-sm text-blue-600">Histoires</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <Heart className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-green-800">{userStats.votes}</p>
              <p className="text-sm text-green-600">Votes reçus</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <MessageCircle className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold text-purple-800">{userStats.comments}</p>
              <p className="text-sm text-purple-600">Commentaires</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
              <p className="text-2xl font-bold text-yellow-800">#{userStats.rank}</p>
              <p className="text-sm text-yellow-600">Classement</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Stories */}
      <Card className="glass-effect border-none shadow-xl">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Mes dernières histoires</h3>
          
          <div className="space-y-4">
            {recentStories.map((story) => (
              <div key={story.id} className="p-4 bg-white/50 rounded-lg border border-gray-200 hover:bg-white/70 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{story.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {story.votes}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        {story.comments}
                      </span>
                      <span>{story.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full mt-4 gradient-primary text-white hover-scale">
            Voir toutes mes histoires
          </Button>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="glass-effect border-none shadow-xl">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Paramètres</h3>
          
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start hover-scale">
              <Settings className="w-4 h-4 mr-2" />
              Préférences de notification
            </Button>
            <Button variant="outline" className="w-full justify-start hover-scale">
              <User className="w-4 h-4 mr-2" />
              Confidentialité et sécurité
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
              <X className="w-4 h-4 mr-2" />
              Supprimer mon compte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
