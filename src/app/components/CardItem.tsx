import { FC, memo, useState } from "react";
import { iCardItem } from "../../models";
import style from "../App.module.scss";
import localStorageService from "../services/localStorage.service";
import { useAppDispatch } from "../store/store";
import { removeCard } from "../store/cards";
import Badge from "./common/Badge";
import HeartIcon from "./common/HeartIcon";
import DeleteIcon from "./common/DeleteIcon";

interface CardProps {
  card: iCardItem;
  favorites: number[];
  setFavorites: any;
}

const CardItem: FC<CardProps> = memo(({ card, favorites, setFavorites }) => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);
  let localFavorites = localStorageService.getFavorites();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToFavorites = () => {
    favorites.includes(card.id)
      ? setFavorites((prev: number[]) =>
          prev.filter((id: number) => id !== card.id)
        )
      : setFavorites((prev: number[]) => [...prev, card.id]);
    localStorageService.changeLocalFavorites(localFavorites, card.id);
  };

  const deleteCard = () => {
    dispatch(removeCard(card.id));
    if (favorites.includes(card.id)) {
      setFavorites((prev: number[]) =>
        prev.filter((id: number) => id !== card.id)
      );
    }
    localStorageService.removeLocalFavorites(localFavorites, card.id);
  };

  return (
    <div className={style.card}>
      <div className={style.card__header}>
        <div className={style.card__name}>{card.name.slice(0, 17)}</div>
        <div className={style.action}>
          <button onClick={addToFavorites}>
            <HeartIcon
              className={style.action__favorite}
              fill={favorites.includes(card.id) ? "#E868FA" : "grey"}
            />
          </button>
          <button onClick={deleteCard}>
            <DeleteIcon className={style.action__delete} fill="white" />
          </button>
        </div>
      </div>
      <img src={card.image} alt={card.name} />
      <div
        className={
          !expanded ? style.card__footer + " rounded-b-xl" : style.card__footer
        }
      >
        <div className={style.badges}>
          <Badge
            className={card.gender === "Male" ? "bg-blue-600" : "bg-orange-500"}
          >
            {card.gender}
          </Badge>
          <Badge
            className={
              card.species === "Human" ? "bg-violet-600" : "bg-blue-400"
            }
          >
            {card.species}
          </Badge>
          <Badge
            className={
              card.status === "Alive"
                ? "bg-green-700"
                : card.status === "unknown"
                ? "bg-slate-300"
                : "bg-red-700"
            }
          >
            {card.status}
          </Badge>
        </div>
        <div className={style.toggle}>
          <button
            onClick={handleExpandClick}
            className={
              expanded ? style.toggle__button_active : style.toggle__button
            }
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24">
              <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div
        className={
          expanded
            ? style.collapse + " " + style.collapse_active
            : style.collapse
        }
      >
        <div className={style.collapse__wrapper}>
          <p className="mb-2">Location:</p>
          <Badge className={"bg-violet-600 mb-2"}>{card.location.name}</Badge>
          <p className="mb-2">Origin:</p>
          <Badge className={"bg-green-700 mb-2"}>{card.origin.name}</Badge>
          <a
            href={card.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex bg-blue-600 cursor-pointer text-white py-1 px-2 rounded"
          >
            All about character
            <svg className="w-6 h-6 ml-3 fill-current" viewBox="0 0 24 24">
              <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
});

export default CardItem;
