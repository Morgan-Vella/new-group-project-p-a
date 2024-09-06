import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get("http://localhost:9999/api/portfolio");
        setArtworks(response.data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <>
      <Navbar>
        <Link to="/create" className="btn btn-primary">
          Create Artwork
        </Link>
      </Navbar>
      <div className="">
        <div className="row">
          {artworks.map((artwork) => {
            const imagePath = artwork.image.replace(/\\/g, "/");

            return (
              <div className="col-md-4 mb-4" key={artwork._id}>
                <Link
                  to={`/details/${artwork._id}`}
                  className="text-decoration-none"
                >
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
                          Created at:{" "}
                          {new Date(artwork.createdAt).toLocaleDateString()}
                        </small>
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          Created by: {artwork.user_id.name}
                        </small>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
