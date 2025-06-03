
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share, Star, ChevronUp, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SearchBar from './SearchBar';

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
  liked?: boolean;
}

const Stories = () => {
  const { toast } = useToast();
  
  const [allStories] = useState<Story[]>([
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
    },
    {
      id: 4,
      author: '@SarahC',
      identity: 'Diego Silva, 30 ans, Musicien au Brésil',
      title: 'La mélodie qui m\'a sauvé',
      content: 'Pendant ma dépression, j\'avais arrêté de jouer. Un jour, dans la rue, j\'ai entendu un enfant fredonner une de mes anciennes chansons. J\'ai repris ma guitare et maintenant je donne des concerts pour aider d\'autres personnes.',
      votes: 156,
      comments: 22,
      tags: ['musique', 'espoir', 'guérison'],
      timeAgo: '8h'
    },
    {
      id: 5,
      author: '@EmmaJ',
      identity: 'Kai Nakamura, 26 ans, Entrepreneur au Japon',
      title: 'L\'échec qui m\'a fait grandir',
      content: 'Ma startup a fait faillite après 2 ans. J\'étais anéanti. Mais en analysant mes erreurs, j\'ai découvert ma vraie passion : aider d\'autres entrepreneurs. Aujourd\'hui, je suis consultant et plus heureux que jamais.',
      votes: 203,
      comments: 31,
      tags: ['entrepreneuriat', 'résilience', 'reconversion'],
      timeAgo: '12h'
    }
  ]);

  const [stories, setStories] = useState<Story[]>(allStories);
  const [votedStories, setVotedStories] = useState<Set<number>>(new Set());

  const handleSearch = (query: string, filters: string[]) => {
    let filteredStories = allStories;

    if (query.trim()) {
      filteredStories = filteredStories.filter(story =>
        story.title.toLowerCase().includes(query.toLowerCase()) ||
        story.content.toLowerCase().includes(query.toLowerCase()) ||
        story.author.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filters.length > 0) {
      filteredStories = filteredStories.filter(story =>
        filters.some(filter => story.tags.includes(filter))
      );
    }

    setStories(filteredStories);
  };

  const handleVote = (storyId: number, voteType: 'up' | 'down') => {
    if (votedStories.has(storyId)) return;

    setStories(stories.map(story => 
      story.id === storyId 
        ? { ...story, votes: story.votes + (voteType === 'up' ? 1 : -1) }
        : story
    ));
    setVotedStories(new Set([...votedStories, storyId]));
    
    toast({
      title: voteType === 'up' ? "Vote positif !" : "Vote négatif",
      description: "Votre vote a été enregistré.",
    });
  };

  const handleLike = (storyId: number) => {
    setStories(stories.map(story => 
      story.id === storyId 
        ? { ...story, liked: !story.liked }
        : story
    ));
    
    toast({
      title: "Like ajouté !",
      description: "Vous avez aimé cette histoire.",
    });
  };

  const handleShare = (story: Story) => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.content.substring(0, 100) + '...',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${story.title} - ${window.location.href}`);
      toast({
        title: "Lien copié !",
        description: "Le lien de l'histoire a été copié dans le presse-papiers.",
      });
    }
  };

  const loadMoreStories = () => {
    toast({
      title: "Chargement...",
      description: "Nouvelles histoires en cours de chargement.",
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 pb-24">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-4">Histoires de Vies</h2>
        <p className="text-gray-600">Découvrez les aventures vécues par la communauté</p>
      </div>

      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="space-y-6">
        {stories.length === 0 ? (
          <Card className="glass-effect border-none shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune histoire trouvée</h3>
              <p className="text-gray-600">Essayez de modifier vos critères de recherche.</p>
            </CardContent>
          </Card>
        ) : (
          stories.map((story) => (
            <Card key={story.id} className="glass-effect border-none shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
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
                      className="px-3 py-1 bg-reality-100 text-reality-700 rounded-full text-sm font-medium hover:bg-reality-200 transition-colors cursor-pointer"
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
                        className="text-green-600 hover:text-green-700 hover:bg-green-50 hover-scale"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </Button>
                      <span className="font-semibold text-gray-900 min-w-[3rem] text-center">{story.votes}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleVote(story.id, 'down')}
                        disabled={votedStories.has(story.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 hover-scale"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-600 hover:text-reality-600 hover-scale"
                      onClick={() => toast({
                        title: "Commentaires",
                        description: "Fonctionnalité des commentaires à venir.",
                      })}
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {story.comments}
                    </Button>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleLike(story.id)}
                      className={`hover-scale ${story.liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
                    >
                      <Heart className={`w-4 h-4 ${story.liked ? 'fill-current' : ''}`} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleShare(story)}
                      className="text-gray-600 hover:text-reality-600 hover-scale"
                    >
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {stories.length > 0 && (
        <div className="mt-8 text-center">
          <Button 
            onClick={loadMoreStories}
            className="gradient-primary text-white px-8 py-3 rounded-full hover-scale button-press"
          >
            Voir plus d'histoires
          </Button>
        </div>
      )}
    </div>
  );
};

export default Stories;
