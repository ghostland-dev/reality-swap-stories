import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { User, Edit, Save, X, Star, Heart, MessageCircle, Trophy, Calendar, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CreateStory from './CreateStory';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [profile, setProfile] = useState({
    username: '@VousEtes',
    displayName: 'Votre Nom',
    bio: 'Passionné(e) par les histoires de vie et les expériences humaines authentiques.',
    location: 'France',
    joinDate: 'Mars 2024'
  });
  const [editedProfile, setEditedProfile] = useState(profile);
  const { toast } = useToast();

  const stats = {
    points: 1847,
    storiesWritten: 3,
    likesReceived: 156,
    commentsReceived: 23,
    rank: 47,
    streak: 5
  };

  const recentStories = [
    {
      id: 1,
      title: 'Ma première expérience en solo',
      likes: 45,
      comments: 8,
      timeAgo: '2 jours'
    },
    {
      id: 2,
      title: 'Quand j\'ai décidé de changer de vie',
      likes: 67,
      comments: 12,
      timeAgo: '1 semaine'
    },
    {
      id: 3,
      title: 'Une rencontre qui a tout changé',
      likes: 44,
      comments: 3,
      timeAgo: '2 semaines'
    }
  ];

  const achievements = [
    { icon: '🏆', title: 'Premier pas', description: 'Première histoire publiée' },
    { icon: '❤️', title: 'Aimé', description: '50 likes reçus' },
    { icon: '💬', title: 'Communicant', description: '10 commentaires reçus' },
    { icon: '🔥', title: 'En série', description: '5 jours consécutifs' }
  ];

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profil mis à jour !",
      description: "Vos informations ont été sauvegardées avec succès.",
    });
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleViewAllStories = () => {
    toast({
      title: "Mes histoires",
      description: "Redirection vers la page de vos histoires.",
    });
  };

  const handleCreateStory = () => {
    setShowCreateStory(true);
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-6 pb-24">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gradient mb-4">Mon Profil</h2>
          <p className="text-gray-600">Gérez vos informations et suivez vos statistiques</p>
        </div>

        <Card className="glass-effect border-none shadow-2xl mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input
                        value={editedProfile.displayName}
                        onChange={(e) => setEditedProfile({...editedProfile, displayName: e.target.value})}
                        className="font-bold text-lg"
                        placeholder="Nom d'affichage"
                      />
                      <Input
                        value={editedProfile.username}
                        onChange={(e) => setEditedProfile({...editedProfile, username: e.target.value})}
                        className="text-reality-600"
                        placeholder="@username"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-gray-900">{profile.displayName}</h3>
                      <p className="text-reality-600 font-medium">{profile.username}</p>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSaveProfile} size="sm" className="gradient-primary text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Sauvegarder
                    </Button>
                    <Button onClick={handleCancelEdit} variant="outline" size="sm">
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                {isEditing ? (
                  <Textarea
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                    placeholder="Parlez-nous de vous..."
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-600">{profile.bio}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {isEditing ? (
                    <Input
                      value={editedProfile.location}
                      onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                      placeholder="Localisation"
                      className="flex-1"
                    />
                  ) : (
                    <span>{profile.location}</span>
                  )}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Rejoint en {profile.joinDate}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="glass-effect border-none shadow-xl mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              Mes Statistiques
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-r from-reality-50 to-reality-100 rounded-lg">
                <div className="text-2xl font-bold text-reality-600">{stats.points.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stats.storiesWritten}</div>
                <div className="text-sm text-gray-600">Histoires</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{stats.likesReceived}</div>
                <div className="text-sm text-gray-600">Likes reçus</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats.commentsReceived}</div>
                <div className="text-sm text-gray-600">Commentaires</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">#{stats.rank}</div>
                <div className="text-sm text-gray-600">Classement</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{stats.streak}</div>
                <div className="text-sm text-gray-600">Série de jours</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="glass-effect border-none shadow-xl mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Mes Succès</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <div className="text-2xl mr-3">{achievement.icon}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{achievement.title}</div>
                    <div className="text-sm text-gray-600">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Stories */}
        <Card className="glass-effect border-none shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Mes Dernières Histoires</h3>
            <div className="space-y-4">
              {recentStories.map((story) => (
                <div key={story.id} className="p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{story.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span>{story.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4 text-blue-500" />
                          <span>{story.comments}</span>
                        </div>
                        <span>il y a {story.timeAgo}</span>
                      </div>
                    </div>
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <Button 
                onClick={handleViewAllStories}
                variant="outline"
                className="hover-scale"
              >
                Voir toutes mes histoires
              </Button>
              <Button 
                onClick={handleCreateStory}
                className="gradient-primary text-white hover-scale"
              >
                Nouvelle histoire
              </Button>
            </div>
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

export default Profile;
