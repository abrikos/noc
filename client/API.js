import axios from "axios";


class API {

    authenticatedUser = async () => {
        const auth = await this.postData('/authenticatedUser');
        return auth.authenticated;
    };


    async postData(path = '', data = {}) {
        const label = 'POST ' +  path;
        console.time(label)
        const url = '/api' + path;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then(res => {
                    resolve(res.data)
                    console.timeEnd(label)
                })
                .catch(err => {
                    resolve({error: err.response.status, message: err.response.data.message || err.response.statusText})
                })

        })

        //const start = new Date().valueOf();


    }


}

//window.APP_STORE = new API();
export default new API();
