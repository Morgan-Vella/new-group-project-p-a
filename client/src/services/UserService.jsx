import axios from "axios";


const http = axios.create({
    "baseURL": "http://localhost:9999/api/portfolio"
});

const UserService = {
    "createUser": async (userData) => {
        try {
            const res = await http.post("/user/create", userData) 
            return res.data
        }   catch (err) {throw err}
    },
    "loginUser": async (userData) => {
        try {
            const res = await http.post("/user/login", userData) 
            return res.data
        }   catch (err) {throw err}
    },
    "getUserId": async (id) => {
        try {
            const res = await http.get(`/user/${id}`) 
            return res.data
        }   catch (err) {throw err}
    }
};

export default UserService;