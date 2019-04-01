import React from 'react';
import { Parallax } from 'react-materialize';

const About = () => {
  return (
    <div>
      <Parallax imageSrc="/img/EnterTheCode.png" />
      <div className="section white">
        <div className="row container">
          <h2 className="header">Parallax</h2>
          <p className="grey-text text-darken-3 lighten-3">
            Parallax is an effect where the background content or image in this
            case, is moved at a different speed than the foreground content
            while scrolling.
          </p>
        </div>
      </div>
      <Parallax imageSrc="/img/ForniteCloseShot.png" />
    </div>
  );
};

export default About;
