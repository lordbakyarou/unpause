// TwinklingStars.js
import React, { useEffect } from "react";

const TwinklingStars = () => {
  useEffect(() => {
    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.animation = `twinkle ${Math.random() * 5 + 5}s linear ${
        Math.random() * 1 + 1
      }s infinite`;
      star.style.top = `${Math.random() * window.innerHeight}px`;
      star.style.left = `${Math.random() * window.innerWidth}px`;
      document.querySelector(".homescreen").appendChild(star);
    }
  }, []);

  return null;
};

export default TwinklingStars;
