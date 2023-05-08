import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://127.0.0.1:8090';

class UserService {
    getById(id) {
        return axios.get(API_URL + `/user/${id}`, {headers: authHeader()});
    }

    getByNickname(nickname) {
        return axios.get(API_URL + `/user/username/${nickname}`, {headers: authHeader()});
    }

    update(formData,idUser) {
        return axios.put(API_URL + `/user/${idUser}`, formData, {headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': authHeader().Authorization,
                'Access-Control-Allow-Origin': '*'
            },})
    }


    delete(id) {
        return axios.delete(API_URL + `/user/${id}`, {headers: authHeader()})
    }

    getPicture(id) {
        return API_URL + `/user/${id}/picture`
    }


    getStats(id) {
        return axios.get(API_URL + `/user/${id}/stats`, {headers: authHeader()})
    }

    getSolved(id) {
        return axios.get(API_URL + `/user/${id}/treasures`, {headers: authHeader()})
    }
}


export default new UserService();