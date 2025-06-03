
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shuffle, MapPin, Briefcase, Calendar, Heart, Star, PenTool, Share, Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/ui/loading-spinner';
import CreateStory from './CreateStory';

interface Identity {
  name: string;
  age: number;
  country: string;
  profession: string;
  situation: string;
  mood: string;
  challenge: string;
}

const IdentityGenerator = () => {
  const [currentIdentity, setCurrentIdentity] = useState<Identity | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCreateStory, setShowCreateStory] = useState(false);
  const { toast } = useToast();

  const names = ['Alex Martin', 'Sarah Chen', 'Ahmed Hassan', 'Luna Rodriguez', 'Kai Nakamura', 'Emma Johnson', 'Diego Silva', 'Zara Okafor'];
  const countries = ['France', 'Japon', 'Brésil', 'Canada', 'Australie', 'Allemagne', 'Singapour', 'Nouvelle-Zélande'];
  const professions = ['Architecte', 'Chef cuisinier', 'Développeur', 'Artiste', 'Médecin', 'Professeur', 'Entrepreneur', 'Musicien'];
  const situations = ['Vient de déménager', 'En reconversion', 'Premier emploi', 'Voyage solo', 'Nouvelle relation', 'Projet personnel', 'Défi familial', 'Opportunité inattendue'];
  const moods = ['Optimiste', 'Anxieux', 'Curieux', 'Déterminé', 'Nostalgique', 'Aventurier', 'Prudent', 'Passionné'];
  const challenges = ['Prendre une décision importante', 'Surmonter une peur', 'Apprendre quelque chose de nouveau', 'Réconcilier deux amis', 'Économiser pour un rêve', 'Gérer un conflit', 'Saisir une opportunité', 'Aider un proche'];

  const generateIdentity = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const newIdentity: Identity = {
        name: names[Math.floor(Math.random() * names.length)],
        age: Math.floor(Math.random() * 50) + 18,
        country: countries[Math.floor(Math.random() * countries.length)],
        profession: professions[Math.floor(Math.random() * professions.length)],
        situation: situations[Math.floor(Math.random() * situations.length)],
        mood: moods[Math.floor(Math.random() * moods.length)],
        challenge: challenges[Math.floor(Math.random() * challenges.length)]
      };
      
      setCurrentIdentity(newIdentity);
      setIsGenerating(false);
      
      toast({
        title: "Nouvelle identité générée !",
        description: `Voici ${newIdentity.name}, votre nouvelle persona.`,
      });
    }, 1500);
  };

  const copyIdentity = () => {
    if (!currentIdentity) return;
    
    const identityText = `${currentIdentity.name}, ${currentIdentity.age} ans
📍 ${currentIdentity.country}
💼 ${currentIdentity.profession}
📅 ${currentIdentity.situation}
💭 ${currentIdentity.mood}
🎯 ${currentIdentity.challenge}`;

    navigator.clipboard.writeText(identityText);
    toast({
      title: "Identité copiée !",
      description: "L'identité a été copiée dans le presse-papiers.",
    });
  };

  const shareIdentity = () => {
    if (!currentIdentity) return;
    
    if (navigator.share) {
      navigator.share({
        title: 'Mon identité Reality Swap',
        text: `Découvrez mon identité du jour sur Reality Swap : ${currentIdentity.name}`,
        url: window.location.href
      });
    } else {
      copyIdentity();
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-6 animate-fade-in-up">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gradient mb-4">Votre Nouvelle Identité</h2>
          <p className="text-gray-600">Découvrez qui vous allez être pendant 24h</p>
        </div>

        {!currentIdentity && !isGenerating && (
          <Card className="glass-effect border-none shadow-2xl animate-float hover-glow">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 gradient-primary rounded-full flex items-center justify-center animate-pulse-glow">
                <Shuffle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Prêt pour une nouvelle vie ?</h3>
              <p className="text-gray-600 mb-6">Cliquez pour découvrir votre identité du jour</p>
              <Button 
                onClick={generateIdentity}
                className="gradient-primary text-white px-8 py-3 rounded-full hover-scale button-press transition-all duration-300"
              >
                <Shuffle className="w-5 h-5 mr-2" />
                Générer mon identité
              </Button>
            </CardContent>
          </Card>
        )}

        {isGenerating && (
          <Card className="glass-effect border-none shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 gradient-secondary rounded-full flex items-center justify-center">
                <LoadingSpinner size="lg" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Génération en cours...</h3>
              <p className="text-gray-600 mb-4">L'univers choisit votre nouvelle vie</p>
              <div className="loading-dots w-16 h-4 mx-auto"></div>
            </CardContent>
          </Card>
        )}

        {currentIdentity && !isGenerating && (
          <Card className="glass-effect border-none shadow-2xl animate-float hover-lift card-hover">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-reality-500 to-reality-700 rounded-full flex items-center justify-center animate-heartbeat">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gradient">{currentIdentity.name}</h3>
                <p className="text-gray-600">{currentIdentity.age} ans</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover-lift transition-all duration-200">
                  <MapPin className="w-5 h-5 text-reality-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Pays</p>
                    <p className="font-semibold">{currentIdentity.country}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg hover-lift transition-all duration-200">
                  <Briefcase className="w-5 h-5 text-reality-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Profession</p>
                    <p className="font-semibold">{currentIdentity.profession}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover-lift transition-all duration-200">
                  <Calendar className="w-5 h-5 text-reality-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Situation</p>
                    <p className="font-semibold">{currentIdentity.situation}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg hover-lift transition-all duration-200">
                  <Heart className="w-5 h-5 text-reality-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">État d'esprit</p>
                    <p className="font-semibold">{currentIdentity.mood}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-reality-50 to-reality-100 rounded-lg mb-6 text-reveal">
                <h4 className="font-semibold text-reality-800 mb-2 flex items-center">
                  🎯 Défi du jour
                </h4>
                <p className="text-reality-700">{currentIdentity.challenge}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <Button 
                  onClick={generateIdentity}
                  variant="outline"
                  className="border-reality-300 text-reality-600 hover:bg-reality-50 hover-scale button-press"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Régénérer
                </Button>
                
                <Button 
                  onClick={() => setShowCreateStory(true)}
                  className="gradient-primary text-white hover-scale button-press"
                >
                  <PenTool className="w-4 h-4 mr-2" />
                  Raconter
                </Button>
                
                <Button 
                  onClick={copyIdentity}
                  variant="outline"
                  className="border-blue-300 text-blue-600 hover:bg-blue-50 hover-scale button-press"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copier
                </Button>
                
                <Button 
                  onClick={shareIdentity}
                  variant="outline"
                  className="border-green-300 text-green-600 hover:bg-green-50 hover-scale button-press"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Partager
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {showCreateStory && (
        <CreateStory 
          identity={currentIdentity || undefined}
          onClose={() => setShowCreateStory(false)} 
        />
      )}
    </>
  );
};

export default IdentityGenerator;
