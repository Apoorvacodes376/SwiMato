import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface NavigationContextType {
  currentPage: string;
  params: Record<string, string>;
  navigateTo: (page: string, params?: Record<string, string>) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      const [page, ...paramPairs] = hash.split('?');

      const parsedParams: Record<string, string> = {};
      if (paramPairs.length > 0) {
        paramPairs[0].split('&').forEach(pair => {
          const [key, value] = pair.split('=');
          if (key && value) {
            parsedParams[key] = decodeURIComponent(value);
          }
        });
      }

      setCurrentPage(page);
      setParams(parsedParams);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string, newParams?: Record<string, string>) => {
    let hash = `#${page}`;
    if (newParams && Object.keys(newParams).length > 0) {
      const queryString = Object.entries(newParams)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
      hash += `?${queryString}`;
    }
    window.location.hash = hash;
  };

  return (
    <NavigationContext.Provider value={{ currentPage, params, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};
