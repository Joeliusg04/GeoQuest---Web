import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = 'http://127.0.0.1:8090';


class FavService {

    addToFav(idTreasure, idUser) {
        return axios.post(API_URL + `/user/${idUser}/favs`, parseInt(idTreasure), {
            headers: {
                'Authorization': authHeader().Authorization,
                'Content-Type': "application/json"
            },
        });
    }

    getFav(idUser, idTreasure) {
        return axios.get(API_URL + `/user/${idUser}/favs/${idTreasure}`, {headers: authHeader()})
    }

    deleteFav(idUser, idTreasure) {
        return axios.delete(API_URL + `/user/${idUser}/favs/${idTreasure}`, {headers: authHeader()})
    }

    getAllFavs(idUser) {
        return axios.get(API_URL + `/user/${idUser}/favs`, {headers: authHeader()})
    }

}


export default new FavService();