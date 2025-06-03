
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, PenTool, Tag, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Identity {
  name: string;
  age: number;
  country: string;
  profession: string;
  situation: string;
  mood: string;
  challenge: string;
}

interface CreateStoryProps {
  identity?: Identity;
  onClose: () => void;
}

const CreateStory = ({ identity, onClose }: CreateStoryProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const availableTags = [
    'courage', 'amour', 'famille', 'art', 'espoir', 'communauté',
    'passion', 'reconversion', 'réconciliation', 'aventure', 'musique', 'guérison'
  ];

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir le titre et le contenu de l'histoire.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simuler l'envoi de l'histoire
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Histoire publiée !",
        description: "Votre histoire a été partagée avec la communauté.",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la publication.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-effect border-none shadow-2xl animate-scale-in">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gradient">Raconter votre histoire</h2>
                {identity && (
                  <p className="text-sm text-reality-600">
                    En tant que {identity.name}, {identity.age} ans
                  </p>
                )}
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {identity && (
            <div className="p-4 bg-reality-50 rounded-lg mb-6">
              <h3 className="font-semibold text-reality-800 mb-2">Votre identité :</h3>
              <p className="text-sm text-reality-700">
                {identity.name}, {identity.age} ans, {identity.profession} en {identity.country}
              </p>
              <p className="text-sm text-reality-600 mt-1">
                Défi : {identity.challenge}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Titre de votre histoire
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Donnez un titre captivant à votre histoire..."
                className="w-full"
                maxLength={100}
              />
              <p className="text-xs text-gray-500 mt-1">{title.length}/100 caractères</p>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Votre histoire
              </label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Racontez votre expérience, vos émotions, ce que vous avez appris..."
                className="w-full min-h-[200px] resize-none"
                maxLength={1000}
              />
              <p className="text-xs text-gray-500 mt-1">{content.length}/1000 caractères</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (optionnel)
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-reality-100 text-reality-700 rounded-full text-sm"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-reality-500 hover:text-reality-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-2 mb-3">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Ajouter un tag..."
                  className="flex-1"
                  maxLength={20}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newTag))}
                />
                <Button
                  type="button"
                  onClick={() => addTag(newTag)}
                  variant="outline"
                  disabled={!newTag.trim() || tags.length >= 5}
                >
                  <Tag className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {availableTags
                  .filter(tag => !tags.includes(tag))
                  .slice(0, 8)
                  .map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => addTag(tag)}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-reality-100 hover:text-reality-700 transition-colors"
                      disabled={tags.length >= 5}
                    >
                      #{tag}
                    </button>
                  ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Vous pouvez ajouter jusqu'à 5 tags ({tags.length}/5)
              </p>
            </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="flex-1 gradient-primary text-white"
                disabled={isSubmitting || !title.trim() || !content.trim()}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Publication...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Publier l'histoire</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateStory;
