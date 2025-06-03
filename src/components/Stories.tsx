
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share, Star, ChevronUp, ChevronDown } from 'lucide-react';

interface Story {
  id: number;
  author: string;
  identity: string;
  title: string;
  content: string;
  votes: number;
  comments: number;
  tags: string[];
  timeAgo: string;
}

const Stories = () => {
  const [stories, setStories] = useState<Story[]>([
    {
      id: 1,
      author: '@AlexK',
      identity: 'Sarah Chen, 28 ans, Développeuse au Japon',
      title: 'J\'ai choisi de tout quitter pour devenir potière',
      content: 'Après 5 ans dans la tech à Tokyo, j\'ai visité un atelier de céramique traditionnelle. La sérénité du lieu m\'a bouleversée. J\'ai démissionné sur le coup et commencé un apprentissage. Mes parents pensent que je suis folle, mais pour la première fois, je me sens vivante.',
      votes: 247,
      comments: 34,
      tags: ['courage', 'passion', 'reconversion'],
      timeAgo: '2h'
    },
    {
      id: 2,
      author: '@MarieP',
      identity: 'Ahmed Hassan, 35 ans, Chef cuisinier au Maroc',
      title: 'Le dîner qui a sauvé mon mariage',
      content: 'Ma femme et moi ne nous parlions plus depuis des semaines. Au lieu de faire mon service habituel, j\'ai fermé le restaurant et cuisiné son plat préféré de notre lune de miel. Elle a pleuré en goûtant. Nous avons parlé jusqu\'à l\'aube.',
      votes: 189,
      comments: 28,
      tags: ['amour', 'famille', 'réconciliation'],
      timeAgo: '4h'
    },
    {
      id: 3,
      author: '@TomR',
      identity: 'Luna Rodriguez, 24 ans, Artiste en Argentine',
      title: 'Mon art dans la rue a changé ma ville',
      content: 'J\'ai commencé à peindre des fresques murales dans les quartiers défavorisés. Une petite fille m\'a dit que mes couleurs lui donnaient de l\'espoir. Maintenant, d\'autres artistes me rejoignent. Notre mouvement grandit.',
      votes: 312,
      comments: 45,
      tags: ['art', 'espoir', 'communauté'],
      timeAgo: '6h'
    }
  ]);

  const [votedStories, setVotedStories] = useState<Set<number>>(new Set());

  const handleVote = (storyId: number, voteType: 'up' | 'down') => {
    if (votedStories.has(storyId)) return;

    setStories(stories.map(story => 
      story.id === storyId 
        ? { ...story, votes: story.votes + (voteType === 'up' ? 1 : -1) }
        : story
    ));
    setVotedStories(new Set([...votedStories, storyId]));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 pb-24">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-4">Histoires de Vies</h2>
        <p className="text-gray-600">Découvrez les aventures vécues par la communauté</p>
      </div>

      <div className="space-y-6">
        {stories.map((story) => (
          <Card key={story.id} className="glass-effect border-none shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{story.author}</p>
                    <p className="text-sm text-reality-600">{story.identity}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{story.timeAgo}</span>
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-900">{story.title}</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">{story.content}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {story.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-reality-100 text-reality-700 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(story.id, 'up')}
                      disabled={votedStories.has(story.id)}
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                    <span className="font-semibold text-gray-900">{story.votes}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(story.id, 'down')}
                      disabled={votedStories.has(story.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-reality-600">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {story.comments}
                  </Button>
                </div>

                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-500">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-reality-600">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button className="gradient-primary text-white px-8 py-3 rounded-full hover:scale-105 transition-transform">
          Voir plus d'histoires
        </Button>
      </div>
    </div>
  );
};

export default Stories;
