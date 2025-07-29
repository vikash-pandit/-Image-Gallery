import { useState, useEffect } from 'react';
import Modal from './Modal';
import './styles.css';

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export default function App() {
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    fetch(`https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&per_page=12`)
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="app">
      <h1>📷 Image Gallery</h1>
      <div className="gallery">
        {images.map(img => (
          <div key={img.id} className="img-card" onClick={() => setSelectedImg(img.urls.full)}>
            <img src={img.urls.thumb} alt={img.alt_description} />
          </div>
        ))}
      </div>
      {selectedImg && <Modal img={selectedImg} onClose={() => setSelectedImg(null)} />}
    </div>
  );
}
