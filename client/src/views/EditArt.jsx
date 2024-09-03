import { useState } from "react"
import {useNavigate, Link} from "react-router-dom"
import ArtService from "../services/ArtService";


const EditArt = () => {
   
    const [artData, setArtData] = useState({
        name:"",
        description:"",
        image:null,
    });
    const [errors, setErrors] = useState({
    });

    // const navigate = useNavigate();
    
    const updatedArtInput = (e) => {
        const {name, value} = e.target;
        setArtData( prev => ( {...prev, [name]: value} ))
    }
    
    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     ArtService.createDish(artData)
    //     .then(res => {
    //         setArtData({
    //           "name":"",
    //           "description":"",
    //           "image":null,
    //         })
    //         console.log(res.data);
    //         navigate("/"); 
    //       })
    //     .catch(err => {
    //         console.log(err)
    //         setErrors(err.response.data.errors);
    //     });
    // };

    return (
    <>
    <div className="container">
        <navigator className="d-flex justify-content-between my-3">
            <h1>Artistree EDIT</h1>
            <Link to = '/'> back to home</Link>
            <Link to = '/login'> Logout</Link>
        </navigator>
        
        <form action="">
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
                    <textarea name="description" 
                    id="description" 
                    value={artData.description} 
                    onChange={updatedArtInput} 
                    cols="30" rows="10">
                    </textarea>
                <label htmlFor="image">
                    Upload an image:
                </label>
                    <input type = "file"
                     name = "image"
                     id = "image"
                     value={artData.image}
                     onChange={updatedArtInput}/>
            </main>
        </form>
    </div>
    </>
    )

};

export default EditArt;