import axios from "axios";
import { ip } from "./constants"

const instance = axios.create({
    baseURL: ip
})

export default instance;