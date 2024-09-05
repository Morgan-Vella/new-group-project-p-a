import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const ArtworkDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

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

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    setCurrentUserId(userId);
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:9999/api/portfolio/artwork/${artwork._id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting artwork:", error);
    }
  };

  if (!artwork) return <div>Loading...</div>;

  const imagePath = artwork.image.replace(/\\/g, "/");

  return (
    <>
    <Navbar></Navbar>
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
          {currentUserId === artwork.user_id._id && (
            <div className="d-flex gap-3 mb-2">
              <Link to={`/edit/${artwork._id}`} className="btn btn-success text-decoration-none">Edit</Link>
              <button onClick={handleDelete} className="btn btn-danger">Delete</button>
            </div>
          )}
          <p className="card-text">
            <small className="text-muted">
              Created by: {artwork.user_id.name}
            </small>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ArtworkDetails;
