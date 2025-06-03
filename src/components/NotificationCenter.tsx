
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, X, Heart, MessageCircle, Trophy, Star } from 'lucide-react';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'achievement' | 'story';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter = ({ isOpen, onClose }: NotificationCenterProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      title: 'Nouveau vote',
      message: '@MarieP a voté pour votre histoire "Le dîner qui a sauvé mon mariage"',
      time: '2h',
      read: false
    },
    {
      id: '2',
      type: 'comment',
      title: 'Nouveau commentaire',
      message: 'Quelqu\'un a commenté votre histoire récente',
      time: '4h',
      read: false
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Nouveau succès débloqué !',
      message: 'Vous avez débloqué "Conteur" - 10 histoires partagées',
      time: '1j',
      read: true
    },
    {
      id: '4',
      type: 'story',
      title: 'Nouvelle histoire populaire',
      message: 'Une histoire de votre catégorie préférée est tendance',
      time: '2j',
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
      case 'story':
        return <Star className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 z-50 p-4">
      <Card className="w-full max-w-md max-h-[70vh] overflow-hidden glass-effect border-none shadow-2xl">
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-reality-600" />
              <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
              {unreadCount > 0 && (
                <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Tout marquer comme lu
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="max-h-[50vh] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Aucune notification</p>
              </div>
            ) : (
              <div className="space-y-0">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                      !notification.read ? 'bg-reality-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </p>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
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
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;
