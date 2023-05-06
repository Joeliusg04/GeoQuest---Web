import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://127.0.0.1:8090';

class UserService {
    getById(id) {
        return axios.get(API_URL + `/user/${id}`, {headers: authHeader()});
    }

    getByNickname(nickname) {
        return axios.get(API_URL + `/user/${nickname}`, {headers: authHeader()});
    }

    update(user) {
        return axios.put(API_URL + `/user/${user.id}`, user, {headers: authHeader()})
    }


    delete(id) {
        return axios.delete(API_URL + `/user/${id}`, {headers: authHeader()})
    }

    getPicture(id) {
        return axios.get(API_URL + `/user/${id}/picture`, {headers: authHeader()})
    }


    getStats(id) {
        return axios.get(API_URL + `/user/${id}/stats`, {headers: authHeader()})
    }

    getSolved(id) {
        return axios.get(API_URL + `/user/${id}/treasures`, {headers: authHeader()})
    }
}


export default new UserService();