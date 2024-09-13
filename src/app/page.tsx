'use client';

import { Hero } from '@prisma/client';
import { useEffect, useState } from 'react';

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
    <div>
      <h1 className="font-semibold text-xl text-center my-4">Heroes</h1>
      <ul className="flex flex-col items-center">
        {heroes.map((hero) => (
          <li
            key={hero.id}
            className="mt-2 p-4 flex flex-col border-2 rounded-md"
          >
            {hero.id}. {hero.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
