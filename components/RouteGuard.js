import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '../store';
import { getFavourites, getHistory } from '../lib/userData';
import { isAuthenticated } from '@/lib/authenticate';

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register']; // Add '/register' to the list of public paths

export default function RouteGuard(props) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.pathname);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck);

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        }

    }, []);

    async function updateAtoms() {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }

    async function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);
            router.push("/login");
        } else {
            setAuthorized(true);
            if (isAuthenticated()) {
                await updateAtoms(); // Invoke updateAtoms if authenticated
            }
        }
    }

    return (
      <>
        {authorized && props.children}
      </>
    )
}
