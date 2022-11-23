import { FC, memo } from "react";
import { iCardItem } from "../../models";
import CardItem from "./CardItem";

interface CardListProps {
  cards: iCardItem[];
  favorites: number[];
  setFavorites: any;
}

const CardList: FC<CardListProps> = memo(
  ({ cards, favorites, setFavorites }) => {
    if (!cards.length) {
      return (
        <div className="container mx-auto mt-20 flex justify-center items-center">
          <h1 className="text-lg text-slate-500 tracking-wider underline underline-offset-8">
            Здесь появятся персонажи, которых вы добавите в избранное
          </h1>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {cards.map((card: iCardItem) => (
            <CardItem
              card={card}
              key={card.id}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default CardList;
