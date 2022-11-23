import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLoader from "./components/hoc/appLoader";
import Header from "./components/Header";
import CardList from "./components/CardList";
import { getCards, getError } from "./store/cards";
import FavoriteButton from "./components/FavoriteButton";
import localStorageService from "./services/localStorage.service";

const App: FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const cards = useSelector(getCards());
  const error = useSelector(getError());

  useEffect(() => {
    setFavorites(localStorageService.getFavorites());
  }, []);

  const handleFiltred = () => {
    setFilterActive(!filterActive);
  };

  let filterCards = filterActive
    ? cards.filter((item) => favorites.includes(item.id))
    : cards;

  if (error) toast.error(error);

  return (
    <AppLoader>
      <div className="min-h-screen bg-slate-100 flex flex-col">
        <Header />
        <FavoriteButton
          filter={handleFiltred}
          active={filterActive}
          badgeCount={favorites.length}
        />
        <CardList
          cards={filterCards}
          setFavorites={setFavorites}
          favorites={favorites}
        />
        <ToastContainer />
      </div>
    </AppLoader>
  );
};

export default App;
