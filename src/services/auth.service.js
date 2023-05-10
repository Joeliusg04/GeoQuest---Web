import axios from "axios";
import authHeader from "@/services/auth-header";
// import authHeader from "@/services/auth-header";


const API_URL = 'http://127.0.0.1:8090';


class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + '/user/login',
                {username: username, password: password}
            )
            .then(response => {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('user',JSON.stringify(response.data.user))
                return response.data;
            })
    }

    logout() {
        localStorage.removeItem('token');
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
            }, {
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': authHeader().Authorization
                }
            });
    }
}

export default new AuthService();