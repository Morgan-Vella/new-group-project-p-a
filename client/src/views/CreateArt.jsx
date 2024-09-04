import { useState, useEffect } from "react"
import {useNavigate, Link, useParams} from "react-router-dom"
import axios from "axios";
import navbar from "../assets/Navbar.jpg";
import ArtService from "../services/ArtService";
import UserService from "../services/UserService";

const CreateArt = () => {
   
    const [artData, setArtData] = useState({
        name:"",
        description:"",
        image:"",
        user:""
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
                    setArtData(prev => ({ ...prev, user_id: res._id }));
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
              user:""
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
        <div className="navbar-containerimg">
            <nav className="nav-flex">
                <h1 className="m-3" style={{color:"#dea45a"}}>Artistree</h1>
                <div className="btn-style">
                    <Link to = '/' className="text-decoration-none" style={{color:"#F8F6F0"}}> back to home</Link>
                    <button className = "text-decoration-none"onClick={handleLogout}>
                    Logout
                    </button>
                </div>
            </nav>
        </div>
        
        <form onSubmit={submitHandler}>
            <main className="mx-3">
                <label htmlFor="name" className="my-3">
                    Art Title:
                    <input type="text"
                     name = "name"
                     id = "name"
                     value={artData.name}
                     onChange={updatedArtInput}/>
                </label>
                {/* {errors.name && <p className="text-danger">{errors.name.message}</p>} */}
                <label htmlFor="description">
                    Description:
                </label>
                    <textarea 
                    name="description" 
                    id="description" 
                    value={artData.description} 
                    onChange={updatedArtInput} 
                    cols="30" rows="5">
                    </textarea>
                {/* {errors.description && <p className="text-danger">{errors.description.message}</p>} */}
                <label htmlFor="image">
                    Upload an image:
                </label>
                    <input type = "text"
                     name = "image"
                     id = "image"
                     value={artData.image}
                     onChange={updatedArtInput}/>
            </main>
                <div>{artData.user_id}</div>
            <input type="hidden" name="user_id" id= "user_id" value={artData.user_id} onChange={updatedArtInput}/>
            <button className="m-3">Create!</button>
        </form>
    </div>
    </>
    )

};

export default CreateArt;