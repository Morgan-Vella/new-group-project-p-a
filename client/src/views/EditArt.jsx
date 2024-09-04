import { useState } from "react"
import {useNavigate, Link} from "react-router-dom"
import ArtService from "../services/ArtService";
import ForumNav from "../components/ForumNav";


const EditArt = () => {
   
    const [artData, setArtData] = useState({
        name:"",
        description:"",
        image:"",
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
        ArtService.createDish(artData)
        .then(res => {
            setArtData({
              "name":"",
              "description":"",
              "image":"",
            })
            console.log(res.data);
            navigate("/"); 
          })
        .catch(err => {
            console.log(err)
            setErrors(err.response.data.errors);
        });
    };

  
    return (
        <> 
        <div className="all-forums">
            <ForumNav/>
            {/*   */}
            
            <form onSubmit={submitHandler}>
            <main className="main-content">
                <h1 className="my-4">Update Thread</h1>
                <label htmlFor="name" className="m-3 h5">
                    Art Title:
                    <input type="text"
                     name = "name"
                     id = "name"
                     value={artData.name}
                     onChange={updatedArtInput}/>
                </label>
                {/* {errors.name && <p className="text-danger">{errors.name.message}</p>} */}
                <label htmlFor="description" className="m-3 h5">
                    Description:
                </label>
                    <textarea 
                    name="description" 
                    id="description" 
                    value={artData.description} 
                    onChange={updatedArtInput} 
                    className="mx-3"
                    cols="30" rows="5">
                    </textarea>
                {/* {errors.description && <p className="text-danger">{errors.description.message}</p>} */}
                <label htmlFor="image" className="m-3 h5">
                    Upload an image:
                </label>
                    <input type = "text"
                     name = "image"
                     id = "image"
                     value={artData.image}
                     onChange={updatedArtInput}
                     className="mx-3"/>
            <button className="m-3">Create!</button>
            </main>
                <div>{artData.user_id}</div>
            <input type="hidden" name="user_id" id= "user_id" value={artData.user_id} onChange={updatedArtInput}/>
        </form>
        </div>
        </>
        )};


export default EditArt;