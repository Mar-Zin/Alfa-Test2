import { FC, memo } from "react";
import style from "../App.module.scss";
import HeartIcon from "./common/HeartIcon";

interface FavoriteButtonProps {
  filter(): void;
  active: boolean;
  badgeCount: number;
}

const FavoriteButton: FC<FavoriteButtonProps> = memo(
  ({ filter, active, badgeCount }) => {
    return (
      <button
        onClick={filter}
        className={
          active
            ? style.favoritesButton + " " + style.favoritesButton_active
            : style.favoritesButton
        }
      >
        <HeartIcon className={style.favoritesButton__svg} fill="currentColor" />
        Favorites
        {badgeCount !== 0 && (
          <span className={style.favoritesButton__badge}>{badgeCount}</span>
        )}
      </button>
    );
  }
);

export default FavoriteButton;
