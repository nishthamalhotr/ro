import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveBgProps {
  name: string;
  className?: string;
  overlayClassName?: string;
  parallax?: boolean;
  children?: React.ReactNode;
}

export function ResponsiveBg({ name, className, overlayClassName, parallax, children }: ResponsiveBgProps) {
  const [loaded, setLoaded] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Fetch placeholder
    fetch(`/assets/img/placeholder/placeholder-${name}.txt`)
      .then(res => res.text())
      .then(setPlaceholder)
      .catch(() => {});

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoaded(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (containerRef.current) observer.observe(containerRef.current);

    if (parallax) {
      const handleScroll = () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const scrollPos = window.scrollY;
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            setOffset((scrollPos - rect.top) * 0.1);
          }
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }

    return () => observer.disconnect();
  }, [name, parallax]);

  const bgStyle = loaded ? {
    backgroundImage: `image-set(
      url("/assets/img/${name}-1920.webp") type("image/webp"),
      url("/assets/img/${name}-1920.jpg") type("image/jpeg")
    )`,
    backgroundPosition: `center ${parallax ? `calc(50% + ${offset}px)` : 'center'}`,
  } : {
    backgroundImage: `url("${placeholder}")`,
  };

  return (
    <div 
      ref={containerRef}
      className={cn("relative bg-cover bg-no-repeat transition-all duration-1000", className)}
      style={bgStyle}
      aria-hidden="true"
    >
      <div className={cn("absolute inset-0 z-0", overlayClassName)} aria-hidden="true" />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
