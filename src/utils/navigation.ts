import { WindowWithLenis } from '@/types/performance';

export const smoothScrollTo = (targetId: string, offset: number = -100): void => {
  const targetElement = document.getElementById(targetId);

  if (!targetElement) return;

  const lenis = (window as WindowWithLenis).lenis;

  if (lenis) {
    (lenis as { scrollTo: (el: HTMLElement, opts: object) => void }).scrollTo(targetElement, {
      offset,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    window.scrollTo({
      top: targetElement.offsetTop + offset,
      behavior: 'smooth',
    });
  }
};

export const handleNavigationClick = (
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  onComplete?: () => void
): void => {
  event.preventDefault();
  smoothScrollTo(href.replace('#', ''));
  if (onComplete) setTimeout(onComplete, 100);
};

export const getActiveSectionId = (): string => {
  const sections = ['hero', 'experience', 'projects', 'contact'];
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  for (let i = sections.length - 1; i >= 0; i--) {
    const element = document.getElementById(sections[i]);
    if (element && scrollY >= element.offsetTop - windowHeight / 2) {
      return sections[i];
    }
  }

  return 'hero';
};
