import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = 'http://127.0.0.1:8090';


class TreasureService {

    getAll() {
        return axios.get(API_URL + '/treasure', {headers: authHeader()})
    }

    getById(id) {
        var url = API_URL + `/treasure/${id}`
        return axios.get(url, {headers: authHeader()})
    }

    delete(id) {
        var url = API_URL + `/treasure/${id}`
        return axios.delete(url, {headers: authHeader()})
    }


    update(treasure, image) {
        var url = API_URL + `/treasure/${treasure.idTreasure}`
        return axios.put(url,
            {
                body: treasure,
                image: image
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': authHeader().Authorization
                },
            });
    }

    createNew(treasure, image) {
        console.log(treasure)
        image
        return axios.post(API_URL + "/treasure", treasure, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': authHeader().Authorization
            },
        });
    }

}


export default new TreasureService();