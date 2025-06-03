
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Heart, MessageCircle, Trophy, Star, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: number;
  type: 'like' | 'comment' | 'achievement' | 'follow';
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter = ({ isOpen, onClose }: NotificationCenterProps) => {
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'like',
      title: 'Nouveau like !',
      message: '@MarieP a aimé votre histoire "Ma première expérience en solo"',
      timeAgo: '5 min',
      read: false
    },
    {
      id: 2,
      type: 'comment',
      title: 'Nouveau commentaire',
      message: '@AlexK a commenté : "Très inspirant, merci pour ce partage !"',
      timeAgo: '1h',
      read: false
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Nouveau succès débloqué !',
      message: 'Vous avez obtenu le badge "Aimé" (50 likes reçus)',
      timeAgo: '2h',
      read: true
    },
    {
      id: 4,
      type: 'follow',
      title: 'Nouvel abonné',
      message: '@TomR a commencé à vous suivre',
      timeAgo: '3h',
      read: true
    },
    {
      id: 5,
      type: 'like',
      title: '5 nouveaux likes !',
      message: 'Votre histoire "Quand j\'ai décidé de changer de vie" fait sensation',
      timeAgo: '1 jour',
      read: true
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'achievement':
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'follow':
        return <Users className="w-5 h-5 text-green-500" />;
      default:
        return <Star className="w-5 h-5 text-gray-500" />;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => 
      ({ ...notification, read: true })
    ));
    toast({
      title: "Notifications marquées comme lues",
      description: "Toutes vos notifications ont été marquées comme lues.",
    });
  };

  const markAsRead = (notificationId: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ));
  };

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-md max-h-[80vh] overflow-hidden glass-effect border-none shadow-2xl animate-scale-in">
        <CardContent className="p-0">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gradient">Notifications</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {unreadCount} nouvelles notifications
            </p>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors animate-fade-in-up cursor-pointer ${
                  !notification.read ? 'bg-reality-50/30' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                        {notification.timeAgo}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 ${!notification.read ? 'text-gray-800' : 'text-gray-600'}`}>
                      {notification.message}
                    </p>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-reality-500 rounded-full mt-2"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <Button 
              onClick={markAllAsRead}
              variant="ghost" 
              className="w-full text-reality-600 hover:text-reality-700 hover:bg-reality-50"
              disabled={unreadCount === 0}
            >
              Marquer tout comme lu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;
