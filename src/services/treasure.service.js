import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = 'http://127.0.0.1:8090';


class TreasureService {

    getAll(){
        return axios.get(API_URL + '/treasure',{headers: authHeader()})
    }

    getById(id){
        var url = API_URL + `/treasure/${id}`
        console.log(url)
        return axios.get(url)
    }

}


export default new TreasureService();