import React, { useState } from "react";
import "./Home.css";

function Home() {
  const [index, setIndex] = useState(0);
  const images = [
    {
      src: 'image1.jpg',
      text: 'Image 1'
    },
    {
      src: 'image2.jpg',
      text: 'Image 2'
    },
    {
      src: 'image3.jpg',
      text: 'Image 3'
    }
  ];

  const handlePrev = () => {
    setIndex(index === 0 ? images.length - 1 : index - 1);
  };
  const handleNext = () => {
    setIndex(index === images.length - 1 ? 0 : index + 1);
  };

  return (
    <section>
      <div className="center" id="home">
        <div className="slideshow-container">
          <img src={images[index].src} style={{ filter: "blur(8px)" }} />
          <div className="text-box">
            <p>{images[index].text}</p>
          </div>
        </div>
        <button id="prev" onClick={handlePrev}>Prev</button>
        <button id="next" onClick={handleNext}>Next</button>
      </div>
      <div className="center"></div>
      <div>
        <p></p>
      </div>
    </section>
  );
}

export default Home;
