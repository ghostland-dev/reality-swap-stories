
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { PenTool, Send, Hash, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreateStoryProps {
  identity?: {
    name: string;
    age: number;
    country: string;
    profession: string;
    situation: string;
    mood: string;
    challenge: string;
  };
  onClose: () => void;
}

const CreateStory = ({ identity, onClose }: CreateStoryProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim()) && tags.length < 5) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir le titre et le contenu de votre histoire.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      toast({
        title: "Histoire publiée ! 🎉",
        description: "Votre histoire a été partagée avec la communauté.",
      });
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-effect border-none shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gradient">Racontez votre histoire</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {identity && (
            <div className="mb-6 p-4 bg-gradient-to-r from-reality-50 to-reality-100 rounded-lg">
              <h3 className="font-semibold text-reality-800 mb-2">🎭 Votre identité actuelle</h3>
              <p className="text-reality-700">
                <strong>{identity.name}</strong>, {identity.age} ans, {identity.profession} en {identity.country}
              </p>
              <p className="text-sm text-reality-600 mt-1">
                {identity.situation} • {identity.mood} • Défi : {identity.challenge}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de votre histoire
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Le jour où ma vie a basculé..."
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Racontez votre histoire
              </label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Partagez votre expérience, vos émotions, ce que vous avez appris..."
                className="w-full min-h-[200px] resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {content.length}/1000 caractères
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (optionnel)
              </label>
              <div className="flex space-x-2 mb-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Ajouter un tag..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag} size="sm" variant="outline">
                  <Hash className="w-4 h-4" />
                </Button>
              </div>
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 bg-reality-100 text-reality-700 rounded-full text-sm"
                    >
                      #{tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-reality-500 hover:text-reality-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 gradient-primary text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Publication...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Publier mon histoire
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateStory;
