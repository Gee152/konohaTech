import { useState, useEffect, useCallback } from 'react';
import { isBioLinksRoute, navigateToLanding, navigateToBioLinks } from '../utils/routeUtils';

export type ViewMode = 'landing' | 'biolinks';

export function useQueryRouting() {
  const [currentView, setCurrentView] = useState<ViewMode>(() =>
    isBioLinksRoute() ? 'biolinks' : 'landing'
  );

  // Sincroniza estado com o histórico do navegador (botões avançar/voltar)
  useEffect(() => {
    const handlePopState = () => {
      const isBio = isBioLinksRoute();
      setCurrentView(isBio ? 'biolinks' : 'landing');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Metadados dinâmicos e SEO
  useEffect(() => {
    if (currentView === 'biolinks') {
      document.title = 'Links Oficiais • KonohaTech | Software House & Soluções Digitais';
    } else {
      document.title = 'KonohaTech — Transformamos ideias em soluções digitais de alta performance.';
    }
  }, [currentView]);

  const openLanding = useCallback((targetAnchorId?: string) => {
    navigateToLanding(targetAnchorId);
    setCurrentView('landing');
  }, []);

  const openBioLinks = useCallback(() => {
    navigateToBioLinks();
    setCurrentView('biolinks');
  }, []);

  return {
    currentView,
    openLanding,
    openBioLinks,
    isBioLinks: currentView === 'biolinks',
  };
}
