'use client';

import { Hero } from '@prisma/client';
import { useEffect, useState } from 'react';
import SearchBox from './components/SearchBox';
import HeroCard from './components/HeroCard';

export default function Home() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [filteredheroes, setFilteredHeroes] = useState<Hero[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getHeroes = async () => {
      const response = await fetch('/api/hero');
      const results = await response.json();
      setHeroes(results.data.results);
      setFilteredHeroes(results.data.results);
    };
    getHeroes();
  }, []);

  const handleSearch = async (query: string) => {
    const search = heroes.filter((hero) =>
      hero.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredHeroes(search);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-xl text-center my-4">Heroes</h1>
      <SearchBox
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      <ul className="flex flex-col items-center">
        {filteredheroes.length === 0 && (
          <div className="my-4">No heroes found :(</div>
        )}
        {filteredheroes.map((hero) => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
      </ul>
    </div>
  );
}
