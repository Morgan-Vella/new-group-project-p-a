import { useState, useEffect } from "react"
import {useNavigate, Link, useParams} from "react-router-dom"
import axios from "axios";
import navbar from "../assets/Navbar.jpg";
import ArtService from "../services/ArtService";
import UserService from "../services/UserService";
import ForumNav from "../components/ForumNav";

const CreateArt = ({userId}) => {
   
    const [artData, setArtData] = useState({
        name:"",
        description:"",
        image:"",
        user:userId
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    const updatedArtInput = (e) => {
        const {name, value} = e.target;
        setArtData( prev => ( {...prev, [name]: value} ))
    }
    
    useEffect(() => {
        console.log("User ID from useParams:", id); 
        if (id) {
            UserService.getUserId(id)
                .then(res=> {
                    setArtData(prev => ({ ...prev, user: res._id }));
                })
                // .then((res) = {
                    // setArtData(res);
                // })
                .catch(error => {
                    console.log(error);
                });
        } else {
            console.log("No ID found in params");
        }
    }, [id]);
    

    const submitHandler = (e) => {
        e.preventDefault();
        ArtService.createArt(artData)
        .then(res => {
            setArtData({
              "name":"",
              "description":"",
              "image":"",
              user:userId
            })
            console.log(res.data);
            navigate("/"); 
          })
        .catch(err => {
            console.log("server Error", err)
            setErrors(err.response.data.errors);
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
      };
  
    return (
    <> 
    <div className="all-forums">
        <ForumNav/>
        {/*   */}
        
        <form onSubmit={submitHandler}>
            <main className="main-content">
                <h1 className="my-4">Create Thread</h1>
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
    )

};

export default CreateArt;