'use client';

import { Hero } from '@prisma/client';
import { useEffect, useState } from 'react';
import SearchBox from './components/SearchBox';
import HeroCard from './components/HeroCard';

export default function Home() {
  const [heroes, setHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    const getHeroes = async () => {
      const response = await fetch('/api/hero');
      const results = await response.json();
      setHeroes(results.data.results);
    };
    getHeroes();
  }, []);
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-xl text-center my-4">Heroes</h1>
      <SearchBox />
      <ul className="flex flex-col items-center">
        {heroes.map((hero) => (
          <HeroCard hero={hero} />
        ))}
      </ul>
    </div>
  );
}
