import React, { useEffect, useRef} from "react";
import Square from "./Square";
import './body.css';
import CardFlip from "./CardFlip";

const Body: React.FC = () => {
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
      <div className="w-full py-30 flex flex-col items-center justify-center">
        <div className="relative w-2/3 flex justify-around">
          <Square>
            <i className="fa-solid fa-jet-fighter text-3xl text-white"></i>
          </Square>
          <Square>
            <i className="fa-solid fa-feather text-3xl text-white"></i>
          </Square>
          <Square>
            <i className="fa-solid fa-rotate-right text-3xl text-white"></i>
          </Square>
          <Square>
            <i className="fa-solid fa-truck-arrow-right text-3xl text-white"></i>
          </Square>
          <Square>
            <i className="fa-solid fa-face-smile text-3xl text-white"></i>
          </Square>
        </div>
        <div className="relative w-2/3 flex py-4 justify-around">
          <h1 className="w-15 text-center">Fast</h1>
          <h1 className="w-15 text-center">Light-weight</h1>
          <h1 className="w-15 text-center">Reusable</h1>
          <h1 className="w-15 text-center">Portable</h1>
          <h1 className="w-15 text-center">Efficient</h1>
        </div>
        <div ref={domRef} className="w-3/4 text-center p-3 py-9 rounded-xl hide">
          <h1 className="text-4xl py-3">Unleashing the Power of Automation</h1>
          <p className="text-[#ffffffaa]">
            Say goodbye to boilerplate code and manual configurations. With
            [Scorpion], we turn your XML blueprints into fully optimized,
            production-ready Python ML pipelines. From preprocessing to
            hyperparameter tuning, every step is automated with precision,
            empowering you to scale faster than ever before.
          </p>
        </div>
        <div className="w-4/5 py-20 flex justify-around">
          <CardFlip img="./phonex.png" />
          <CardFlip img="./wolf.png" />
          <CardFlip img="./phonex.png" />
        </div>
      </div>
    );
  };
  
  export default Body;