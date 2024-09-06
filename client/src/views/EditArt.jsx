import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const EditArt = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState({
    name: "",
    description: "",
    image: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/api/portfolio/artwork/${id}`
        );
        setArtwork({
          name: response.data.name,
          description: response.data.description,
          image: response.data.image,
        });
      } catch (error) {
        console.error("Error fetching artwork:", error);
      }
    };

    fetchArtwork();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArtwork((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setArtwork((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", artwork.name);
    formData.append("description", artwork.description);
    if (artwork.image) {
      formData.append("image", artwork.image);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      await axios.put(
        `http://localhost:9999/api/portfolio/artwork/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate(`/details/${id}`);
    } catch (error) {
      console.error("Error updating artwork:", error);
    }
  };

  return (
    <>
      <Navbar>
        <Link to={`/details/${id}`} className="btn btn-primary">
          Art Details
        </Link>
      </Navbar>
      <div className="container mt-4">
        <h1>Edit Artwork</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={artwork.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={artwork.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              type="file"
              className="form-control"
              name="image"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Update Artwork
          </button>
        </form>
      </div>
    </>
  );
};

export default EditArt;
