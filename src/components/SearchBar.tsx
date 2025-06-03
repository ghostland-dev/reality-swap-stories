
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Filter } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, filters: string[]) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Rechercher des histoires..." }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const availableFilters = [
    'courage', 'amour', 'famille', 'art', 'espoir', 'communauté',
    'passion', 'reconversion', 'réconciliation', 'aventure'
  ];

  const handleSearch = () => {
    onSearch(query, activeFilters);
  };

  const toggleFilter = (filter: string) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];
    setActiveFilters(newFilters);
    onSearch(query, newFilters);
  };

  const clearAll = () => {
    setQuery('');
    setActiveFilters([]);
    onSearch('', []);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="pl-10 pr-4"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Filter className="w-4 h-4" />
          <span>Filtres</span>
          {activeFilters.length > 0 && (
            <span className="bg-reality-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {activeFilters.length}
            </span>
          )}
        </Button>
        {(query || activeFilters.length > 0) && (
          <Button onClick={clearAll} variant="ghost" size="icon">
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="p-4 bg-white/50 rounded-lg border border-gray-200 animate-fade-in-up">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Filtrer par tags</h4>
          <div className="flex flex-wrap gap-2">
            {availableFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilters.includes(filter)
                    ? 'bg-reality-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-reality-100'
                }`}
              >
                #{filter}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
