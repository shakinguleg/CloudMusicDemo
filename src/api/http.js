import axios from 'axios';
import { HOST } from './url';


class Http {
    constructor(base_url) {
        this.base_url = base_url;
    };

    request(url, methods = "GET", data = {}) {
        let option = {
            url,
            methods,
            baseURL: this.base_url
        };
        if (methods == "GET") {
            option = {
                ...option,
                params: data
            }
        } else if (methods == "POST") {
            option = {
                ...option,
                data
            }
        }

        return axios.create().request(option);
    }

    get(url, data = {}) {
        return this.request(url, "GET", data)
    }

    post(url, data = {}) {
        return this.request(url, "POST", data)
    }

}

export default new Http(HOST)