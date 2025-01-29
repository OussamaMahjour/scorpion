import React, { useEffect, useRef } from "react";


interface CardFlipProps {
  img: string;
}

const CardFlip: React.FC<CardFlipProps> = ({ img }) => {
  const domRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.5 }
    );

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
      className="w-1/4 min-h-fit h-90 bg-radial-[at_50%_0%] from-dark-background-1 to-black to-75% border border-[#ffffff44] rounded-xl hide square shadow-lg shadow-[#ffffff33] p-4"
    >
      <img src={img} alt="Card Image" className="w-full h-auto" />
    </div>
  );
};

export default CardFlip;