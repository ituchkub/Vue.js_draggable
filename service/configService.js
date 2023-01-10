import axios from 'axios'

export default {
    config() {
        return {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
            'Accept': 'q=0.8;application/json;q=0.9'
            // ,
            // headers: {
            //     'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            // }
        }
    },
    ConfigGetTaskWork(params) {
        return axios.post('http://localhost:8010/TaskBoardApi/GetTaskWork', params, this.config())
        //return axios.post('/TaskBoardApi/GetTaskWork', params, this.config())
    },
    ConfigGetJobWork(params) {
        return axios.post('http://localhost:8010/TaskBoardApi/GetJobWork', params, this.config())
        //return axios.post('/TaskBoardApi/GetTaskWork', params, this.config())
    }
}
