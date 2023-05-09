import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = 'http://127.0.0.1:8090';


class ReviewService {

    getAllByTreasure(idTreasure) {
        return axios.get(API_URL + `/treasure/${idTreasure}/reviews`, {headers: authHeader()})
    }


    getOneByTreasure(idTreasure,idReview) {
        return axios.get(API_URL + `/treasure/${idTreasure}/reviews/${idReview}`,{headers: authHeader()})
    }

    getPicture(idTreasure, idReview){
        return axios.get(API_URL + `/treasure/${idTreasure}/reviews/${idReview}/picture`,{headers: authHeader()})
    }

    getPicturePath(idTreasure, idReview) {
        return API_URL + `/treasure/${idTreasure}/reviews/${idReview}/picture`
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

    update(idTreasure, idReview, formData){
        return axios.put(API_URL + `/treasure/${idTreasure}/reviews/${idReview}`, formData, {
            'Content-Type': 'multipart/form-data',
            'Authorization': authHeader().Authorization
        })
    }


    getAllByUser(idUser) {
        return axios.get(API_URL + `/user/${idUser}/reviews`, {headers: authHeader()})
    }


}


export default new ReviewService();