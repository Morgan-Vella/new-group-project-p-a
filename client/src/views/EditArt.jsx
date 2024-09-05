import React, { useState , useEffect} from "react";
import axios from "axios";
import "../CreateArt.css";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const EditArt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  // const [artwork, setArtwork] = useState("");
  const [errorMessages, setErrorMessages] = useState({}); 

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
// Grab most recent data of artwork to display UI
  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/api/portfolio/artwork/${id}`);
        // setArtwork(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
        setImage(response.data.image);
      } catch (error) {
        console.error("Error fetching artwork details:", error);
      }
    };

    fetchArtwork();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = localStorage.getItem("user_id"); 
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);
    formData.append("user_id", user_id); 
    try {
      const response = await axios.patch(
        `http://localhost:9999/api/portfolio/artwork/${id}/edit`,
        formData
      );
      console.log((response.data));
      navigate("/");
      setErrorMessages({});
      setName("");
      setDescription("");
      setImage(null);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessages(error.response.data); 
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="text-center">
        <img src={`http://localhost:9999/${image}`} alt="art" style={{ maxWidth: '50%'}}/>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errorMessages.name && (
            <p className="error-message">{errorMessages.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {errorMessages.description && (
            <p className="error-message">{errorMessages.description}</p>
          )}
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleImageChange} />
          {errorMessages.image && (
            <p className="error-message">{errorMessages.image}</p>
          )}
        </div>
        {errorMessages.general && (
          <p className="error-message">{errorMessages.general}</p>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  </>
  );
};

export default EditArt;
