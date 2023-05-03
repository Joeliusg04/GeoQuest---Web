import axios from "axios";

const API_URL = 'http://127.0.0.1:8090';


class TreasureService {

    getAll(){
        return axios.get(API_URL + '/treasure')
    }

}


export default new TreasureService();