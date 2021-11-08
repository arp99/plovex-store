import axios from "axios";

export const loadData = () => {
    return axios.get("https://plovex-store-backend.herokuapp.com/home-page/data")
}