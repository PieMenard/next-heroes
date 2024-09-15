import { Hero } from '@prisma/client';

const HeroCard = ({ hero }: { hero: Hero }) => {
  return (
    <div className="flex flex-col items-center w-[200px] h-[256px] border-2 rounded-md my-2">
      <li key={hero.id} className="mt-2 p-4 flex flex-col ">
        <h1 className="font-bold capitalize text-xl text-center border-b-2 w-[200px] pb-4">
          {hero.id}. {hero.name}
        </h1>
      </li>
    </div>
  );
};

export default HeroCard;
