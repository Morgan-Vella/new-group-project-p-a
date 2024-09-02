import { useState } from "react"
import {useNavigate, Link} from "react-router-dom"
import axios from "axios";

import ArtService from "../services/ArtService";


const CreateArt = () => {
   
    const [artData, setArtData] = useState({
        name:"",
        description:"",
        image:"",
        user_id:""
    });
    const [errors, setErrors] = useState({
    });

    const navigate = useNavigate();
    
    const updatedArtInput = (e) => {
        const {name, value} = e.target;
        setArtData( prev => ( {...prev, [name]: value} ))
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        ArtService.createArt(artData)     
        .then(res => {
            setArtData({
              "name":"",
              "description":"",
              "image":"",
              "user_id":""
            })
            console.log(res.data);
            navigate("/"); 
          })
        .catch(err => {
            console.log("server Error", err)
            setErrors(err.response.data.errors);
        });
    };

    return (
    <>
    <div className="container">
        <nav className="d-flex justify-content-between my-3">
            <h1>Artistree</h1>
            <Link to = '/'> back to home</Link>
            <Link to = '/login'> Logout</Link>
        </nav>
        
        <form onSubmit={submitHandler}>
            <main>
                <label htmlFor="name">
                    Art Title:
                </label>
                    <input type="text"
                     name = "name"
                     id = "name"
                     value={artData.name}
                     onChange={updatedArtInput}/>
                <label htmlFor="description">
                    Description:
                </label>
                    <textarea 
                    name="description" 
                    id="description" 
                    value={artData.description} 
                    onChange={updatedArtInput} 
                    cols="30" rows="10">
                    </textarea>
                <label htmlFor="image">
                    Upload an image:
                </label>
                    <input type = "text"
                     name = "image"
                     id = "image"
                     value={artData.image}
                     onChange={updatedArtInput}/>
            </main>
            <input type="hidden" name="user_id" id= "user_id" value={artData.user_id} onChange={updatedArtInput}/>
            <button>Create!</button>
        </form>
    </div>
    </>
    )

};

export default CreateArt;