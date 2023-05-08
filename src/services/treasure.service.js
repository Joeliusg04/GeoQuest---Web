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


    getPicture(id) {
        return API_URL + `/treasure/${id}/picture`
    }

    delete(id) {
        var url = API_URL + `/treasure/${id}`
        return axios.delete(url, {headers: authHeader()})
    }


    update(formData, id) {

        console.log(formData.get('image'))
        console.log(formData.get('body'))
        console.log(...formData)


        var url = API_URL + `/treasure/${id}`
        return axios.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': authHeader().Authorization,
                'Access-Control-Allow-Origin': '*'
            },
        });
    }

    createNew(formData) {

        console.log(formData.get('image'))
        console.log(formData.get('body'))
        console.log(...formData)

        return axios.post(API_URL + "/treasure", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': authHeader().Authorization
            },
        });
    }


    getStats(idTreasure) {
        return axios.get(API_URL + `/treasure/${idTreasure}/stats`, {headers: authHeader()})
    }

}


export default new TreasureService();