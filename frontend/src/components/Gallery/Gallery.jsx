import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Gallery.css"; // custom css

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get('https://university-erp-2.onrender.com/api/images')
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="gallery-section">
      <h2 className="gallery-heading">🌸 Our Gallery Section 🌸</h2>
      <div className="gallery-grid">
        {images.map((img) => (
          <div key={img._id} className="gallery-item">
            <img src={img.imageUrl} alt="gallery" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
