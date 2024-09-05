import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
const ArtworkDetails = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const navigate = useNavigate();
  const userIdFromStorage = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/api/portfolio/artwork/${id}`
        );
        setArtwork(response.data);
      } catch (error) {
        console.error("Error fetching artwork details:", error);
      }
    };

    fetchArtwork();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:9999/api/portfolio/artwork/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting artwork:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (!artwork) return <div>Loading...</div>;

  const imagePath = artwork.image.replace(/\\/g, "/");

  return (
    <>
      <Navbar>
        <Link to="/" className="btn btn-primary">
          Dashboard
        </Link>
      </Navbar>
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
                Created BY: {artwork.user_id ? artwork.user_id.name : "Unknown"}
              </small>
            </p>
            {artwork.user_id._id === userIdFromStorage && (
              <>
                <button className="btn btn-primary" onClick={handleEdit}>
                  Edit Artwork
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete Artwork
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtworkDetails;
