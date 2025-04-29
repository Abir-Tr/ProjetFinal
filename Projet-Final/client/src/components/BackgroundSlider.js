import React, { useEffect, useState } from 'react';

const images = [
  'url("/imagee/3bd594f7e78defd73b989908305a31cc.jpg")', 
  'url("/imagee/7e4ff1ef7a0954f0decf4b76063d385a.jpg")', 
  'url("/imagee/88154882810556235235d1b7fd62816b.jpg")', 
//   'url(/images/image4.jpg)'
];

const BackgroundSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Changer d'image toutes les 5 secondes

    return () => clearInterval(interval); // Nettoyage de l'intervalle lors du démontage du composant
  }, []);

  return (
    <div className="background-container" style={{ backgroundImage: images[currentImage] }}>
      <div className="overlay"></div>
      <div className="content">
        <h1>Bienvenue à Maison d'Hôte</h1>
        <p>Explorez la nature et détendez-vous dans nos chambres.</p>
      </div>
    </div>
  );
};

export default BackgroundSlider;