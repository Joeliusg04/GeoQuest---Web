import axios from "axios";


const API_URL = 'http://localhost:8080';


class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + '/login', {
                "username": username,
                "password": password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user',JSON.stringify(response.data));
                }

                return response.data;
            })
    }

    logout(){
        localStorage.removeItem('user');
    }

    register(user) {
        return axios
            .post(API_URL + 'register', {
                nickname: user.nickname,
                email: user.email,
                password: user.password
            });
    }
}

export default new AuthService();