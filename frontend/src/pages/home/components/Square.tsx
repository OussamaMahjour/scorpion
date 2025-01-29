import React, { useEffect, useRef,ReactNode } from 'react';

 


 interface SquareProps {
    children: ReactNode;
  }
  
  const Square: React.FC<SquareProps> = ({ children }) => {
    const domRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      });
  
      if (domRef.current) {
        observer.observe(domRef.current);
      }
  
      return () => {
        if (domRef.current) {
          observer.unobserve(domRef.current);
        }
      };
    }, []);
  
    return (
      <div
        ref={domRef}
        className="
          square w-15 h-15 border z-10 border-primary 
          rounded-lg bg-black shadow shadow-primary 
          hover:top-12 flex justify-center items-center 
          hide transform hover:-translate-y-2
        "
      >
        {children}
      </div>
    );
  };
  
  export default Square;