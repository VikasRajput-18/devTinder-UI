import axios from "axios";
import { BASR_URL } from "../utils/constant";

export const axiosInstance = axios.create({
    baseURL: BASR_URL,
    withCredentials: true
})