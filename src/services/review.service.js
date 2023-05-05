import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = 'http://127.0.0.1:8090';


class ReviewService {

    getAllByTreasure(idTreasure) {
        return axios.get(API_URL + `/treasure/${idTreasure}/reviews`, {headers: authHeader()})
    }


    createNew(idTreasure, review) {
        return axios.post(API_URL + `/treasure/${idTreasure}/reviews`, review,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': authHeader().Authorization
                },
            }
        )
    }

    deleteByTreasure(idTreasure, idReview) {
        return axios.delete(API_URL + `/treasure/${idTreasure}/reviews/${idReview}`, {headers: authHeader()})
    }


    getAllByUser(idUser) {
        return axios.get(API_URL + `/treasure/${idUser}/reviews`, {headers: authHeader()})
    }


}


export default new ReviewService();