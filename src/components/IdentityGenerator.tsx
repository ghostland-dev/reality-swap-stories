
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shuffle, MapPin, Briefcase, Calendar, Heart, Star } from 'lucide-react';

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
    }, 1500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-4">Votre Nouvelle Identité</h2>
        <p className="text-gray-600">Découvrez qui vous allez être pendant 24h</p>
      </div>

      {!currentIdentity && !isGenerating && (
        <Card className="glass-effect border-none shadow-2xl animate-float">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 gradient-primary rounded-full flex items-center justify-center">
              <Shuffle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Prêt pour une nouvelle vie ?</h3>
            <p className="text-gray-600 mb-6">Cliquez pour découvrir votre identité du jour</p>
            <Button 
              onClick={generateIdentity}
              className="gradient-primary text-white px-8 py-3 rounded-full hover:scale-105 transition-transform animate-pulse-glow"
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
            <div className="w-20 h-20 mx-auto mb-6 gradient-secondary rounded-full flex items-center justify-center animate-spin">
              <Shuffle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Génération en cours...</h3>
            <p className="text-gray-600">L'univers choisit votre nouvelle vie</p>
          </CardContent>
        </Card>
      )}

      {currentIdentity && !isGenerating && (
        <Card className="glass-effect border-none shadow-2xl animate-float">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-reality-500 to-reality-700 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gradient">{currentIdentity.name}</h3>
              <p className="text-gray-600">{currentIdentity.age} ans</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <MapPin className="w-5 h-5 text-reality-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Pays</p>
                  <p className="font-semibold">{currentIdentity.country}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <Briefcase className="w-5 h-5 text-reality-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Profession</p>
                  <p className="font-semibold">{currentIdentity.profession}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <Calendar className="w-5 h-5 text-reality-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Situation</p>
                  <p className="font-semibold">{currentIdentity.situation}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                <Heart className="w-5 h-5 text-reality-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">État d'esprit</p>
                  <p className="font-semibold">{currentIdentity.mood}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-reality-50 to-reality-100 rounded-lg mb-6">
              <h4 className="font-semibold text-reality-800 mb-2">🎯 Défi du jour</h4>
              <p className="text-reality-700">{currentIdentity.challenge}</p>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={generateIdentity}
                variant="outline"
                className="flex-1 border-reality-300 text-reality-600 hover:bg-reality-50"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                Nouvelle identité
              </Button>
              <Button 
                className="flex-1 gradient-primary text-white hover:scale-105 transition-transform"
              >
                Commencer l'aventure
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IdentityGenerator;
