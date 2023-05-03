import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8080';

class UserService {
    getById(id){
        return axios.get(API_URL + `/user/${id}`, {headers: authHeader()});
    }

    getByNickname(nickname){
        return axios.get(API_URL + `/user/${nickname}`, {headers: authHeader()});
    }

    update(user){
        return axios.put(API_URL + `/user/${user.id}`, user,{ headers: authHeader()})
    }


    delete(id){
        return axios.delete(API_URL + `/user/${id}`, {headers: authHeader()})
    }
}


export default new UserService();