import axios from 'axios';

export default {
    config() {
        return {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
            'Accept': 'q=0.8;application/json;q=0.9',
            headers: {
                'Authorization': 'Basic ' + sessionStorage.getItem("token")
            }
        }
    },
    config_ad() {
        return {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
            'Accept': 'q=0.8;application/json;q=0.9',
        }
    },
    Login(param) {
        return axios.post("http://localhost:8010/Authen/UserLogin", param, this.config())
    }
}
