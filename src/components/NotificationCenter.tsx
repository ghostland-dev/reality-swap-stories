
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, X, Heart, MessageCircle, Trophy, Star, Check } from 'lucide-react';

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

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 z-50 p-4 animate-fade-in-up">
      <Card className="w-full max-w-md max-h-[70vh] overflow-hidden glass-effect border-none shadow-2xl animate-slide-in-right">
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 border-b border-gray-200/50 bg-white/20">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Bell className="w-5 h-5 text-reality-600" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-white text-xs">{unreadCount}</span>
                  </div>
                )}
              </div>
              <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
            </div>
            
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="hover-scale text-xs px-2 py-1"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Tout lu
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="hover-scale"
              >
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
                {notifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100/50 cursor-pointer transition-all duration-300 hover:bg-white/20 ${
                      !notification.read ? 'bg-reality-50/30' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 animate-bounce-soft">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium transition-colors ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{notification.time}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-reality-500 rounded-full mt-2 animate-pulse"></div>
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
