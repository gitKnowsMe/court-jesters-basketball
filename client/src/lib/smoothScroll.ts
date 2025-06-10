export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offsetTop = element.offsetTop - 80; // Account for fixed navigation
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
};

export const useScrollObserver = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  return observer;
};

export const initializeScrollAnimations = () => {
  const observer = useScrollObserver();
  
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  return () => {
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.unobserve(el);
    });
  };
};
