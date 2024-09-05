import React, { useState } from "react";
import axios from "axios";
import "../CreateArt.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CreateArt = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessages, setErrorMessages] = useState({}); 

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = localStorage.getItem("user_id"); 
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("user_id", user_id); 
    try {
      const response = await axios.post(
        "http://localhost:9999/api/portfolio/artwork/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      localStorage.setItem("artwork_id", response.data._id)
      console.log(response.data._id)
      console.log(response.data);
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
      <h1>Create Artwork</h1>
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
          <input type="file" id="image" onChange={handleImageChange} required />
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

export default CreateArt;
