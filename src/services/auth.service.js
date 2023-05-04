import axios from "axios";
import authHeader from "@/services/auth-header";
// import authHeader from "@/services/auth-header";


const API_URL = 'http://127.0.0.1:8090';


class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + '/login', {
                "username": username,
                "password": password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            })
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios
            .post(API_URL + '/user', {
                nickName: user.nickname,
                email: user.email,
                password: user.password,
                idUser: 0,
                photo: "",
                userLevel: "Noob",
                userRole: "user",
                favs: []
            }, {headers: {"Content-Type": "application/json",'Access-Control-Allow-Origin': '*', 'Authorization':authHeader().Authorization}});
    }
}

export default new AuthService();