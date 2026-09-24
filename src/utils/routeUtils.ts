/**
 * Utilitários de roteamento zero-dependency baseados em Query String (?page=links)
 * e sincronizados com a History API do navegador.
 */

export function isBioLinksRoute(): boolean {
  if (typeof window === 'undefined') return false;

  const searchParams = new URLSearchParams(window.location.search);
  const page = searchParams.get('page');
  const pathname = window.location.pathname.toLowerCase();

  return (
    page === 'links' ||
    page === 'bio' ||
    pathname.endsWith('/links') ||
    pathname.endsWith('/bio')
  );
}

export function navigateToBioLinks(): void {
  if (typeof window === 'undefined') return;
  const newUrl = `${window.location.pathname}?page=links`;
  window.history.pushState({ view: 'biolinks' }, '', newUrl);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function navigateToLanding(targetAnchorId?: string): void {
  if (typeof window === 'undefined') return;
  const pathname = window.location.pathname || '/';
  window.history.pushState({ view: 'landing' }, '', pathname);
  window.dispatchEvent(new PopStateEvent('popstate'));

  if (targetAnchorId) {
    // Pequeno timeout para assegurar que os componentes da Landing Page foram montados no DOM
    setTimeout(() => {
      const cleanId = targetAnchorId.replace(/^#/, '');
      const element = document.getElementById(cleanId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
