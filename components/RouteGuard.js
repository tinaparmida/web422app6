// RouteGuard.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '../store';
import { getFavourites, getHistory } from '../lib/userData';

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  // List of public paths
  const PUBLIC_PATHS = ['/login', '/register', '/'];

  useEffect(() => {
    // Update atoms with user data if user is authenticated
    const updateAtoms = async () => {
      if (localStorage.getItem('token')) {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
      }
    };

    updateAtoms(); // Invoke updateAtoms function on component mount
  }, []);

  useEffect(() => {
    // Redirect to login if user is not authenticated and trying to access a private route
    const token = localStorage.getItem('token');
    if (!token && !PUBLIC_PATHS.includes(router.pathname)) {
      router.push('/login');
    }
  }, [router.pathname]);

  return <>{children}</>;
};

export default RouteGuard;
