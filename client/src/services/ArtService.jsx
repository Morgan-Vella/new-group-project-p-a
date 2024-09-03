import axios from "axios";


const http = axios.create({
    "baseURL": "http://localhost:9999/api/portfolio"
});

const ArtService = {
    "createArt": async (artData) => {
        try {
            const res = await http.post("/artwork/create", artData) 
            //keeps route same as baseURL w/ only '/'
            return res.data
        }   catch (err) {throw err}
    },
    "getAllArts": async () => {
        try {
            const res = await http.get("/")
            return res.data
        } catch (err) {throw err}
    },
    "getOneArt": async (id) => {
        try {
            const res = await http.get(`/artwork/${id}`)
            return res.data
        } catch (err) {throw err}
    },
    "deleteArt" : async (id) => {
        try {
            const res = await http.delete(`/user/${id}`)
            return res.data
        } catch (err) {throw err}
    },
    "updateArt" : async (id, data) => {
        try {
            const res = await http.put(`/${id}/edit`, data)
            return res.data
        } catch (err) {throw err}
    },
};

export default ArtService;