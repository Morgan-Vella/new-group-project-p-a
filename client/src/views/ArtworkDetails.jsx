import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ArtworkDetails = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/api/portfolio/artwork/${id}`);
        setArtwork(response.data);
      } catch (error) {
        console.error("Error fetching artwork details:", error);
      }
    };

    fetchArtwork();
  }, [id]);

  if (!artwork) return <div>Loading...</div>;

  const imagePath = artwork.image.replace(/\\/g, "/");

  return (
    <div className="container mt-4">
      <div className="card">
        <img
          src={`http://localhost:9999/${imagePath}`}
          className="card-img-top"
          alt={artwork.name}
        />
        <div className="card-body">
          <h5 className="card-title">{artwork.name}</h5>
          <p className="card-text">{artwork.description}</p>
          <p className="card-text">
            <small className="text-muted">
              Created at: {new Date(artwork.createdAt).toLocaleDateString()}
            </small>
          </p>
          <p className="card-text">
            <small className="text-muted">
              Created by: {artwork.user_id.name}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetails;
