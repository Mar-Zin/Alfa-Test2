import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import localStorageService from "../../services/localStorage.service";
import { getCardsLoadingStatus, loadCardList } from "../../store/cards";
import { useAppDispatch } from "../../store/store";

interface AppLoaderProps {
  children: React.ReactNode;
}

const AppLoader: FC<AppLoaderProps> = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const cardsLoadingStatus = useSelector(getCardsLoadingStatus());

  useEffect(() => {
    dispatch(loadCardList());
    if (!localStorageService.getFavorites()) localStorageService.setFavorites();
  }, [dispatch]);

  if (!cardsLoadingStatus) return children;
  return "loading...";
};
export default AppLoader;
