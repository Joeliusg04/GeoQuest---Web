import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = 'http://127.0.0.1:8090';


class ReportService {

    getAllByUser(idUser) {
        return axios.get(API_URL + `/user/${idUser}/reports`, {headers: authHeader()})
    }

    getByUser(idUser, idReport) {
        return axios.get(API_URL + `/user/${idUser}/reports/${idReport}`, {headers: authHeader()})
    }

    deleteByUser(idUser, idReport) {
        return axios.delete(API_URL + `/user/${idUser}/reports/${idReport}`, {headers: authHeader()})
    }


    getAllByTreasure(idTreasure) {
        return axios.get(API_URL + `/treasure/${idTreasure}/reports`, {headers: authHeader()})
    }

    getByTreasure(idTreasure, idReport) {
        return axios.get(API_URL + `/treasure/${idTreasure}/reports/${idReport}`, {headers: authHeader()})
    }

    deleteByTreasure(idTreasure, idReport) {
        return axios.delete(API_URL + `/treasure/${idTreasure}/reports/${idReport}`, {headers: authHeader()})
    }


}

export default new ReportService();