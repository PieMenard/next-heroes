import { Hero } from '@prisma/client';

const HeroCard = ({ hero }: { hero: Hero }) => {
  return (
    <div className="flex flex-col items-center">
      <h3>{hero.name}</h3>

      <p>{hero.city}</p>
    </div>
  );
};

export default HeroCard;
