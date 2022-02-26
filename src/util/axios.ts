import Axios from "axios";
import CurrentEnv, { Env } from "../constants/env";
import { API_SERVER_PORT } from '../api/interface';

export const BASE_DEV_REAL_URL = `http://localhost:${API_SERVER_PORT}`;
export const BASE_DEV_PROXIED_API = `/proxied_api`;
export const baseURL = CurrentEnv === Env.Dev ? BASE_DEV_REAL_URL : "."

const axios = Axios.create( {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    baseURL,
    // from plain Object to stardart format
    transformRequest:  [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
    }]
} );

export default axios;