import axios from "axios";
import authHeader from "@/services/auth-header";
import UserService from "@/services/user.service";
// import authHeader from "@/services/auth-header";


const API_URL = 'http://127.0.0.1:8090';


class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + '/user/login',
                `${username},${password}`
            )
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(username));
                }
                localStorage.setItem('user', JSON.stringify(username));
                UserService.getByNickname(username).then((response)=>{
                    console.log(response.data)
                    const role = response.data.userRole
                    localStorage.setItem('role',JSON.stringify(role))
                }).catch((error)=>{
                    console.log(error)
                })
                return response.data;
            })
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('role')
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