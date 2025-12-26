import axios from "axios";

export default class ClientTokenApi {

    static baseUrl = `${process.env.REACT_APP_SERVER_URL}/api/v1/auth`;

    static async create(data: any) {

        try {
            const endpoint = `${this.baseUrl}/api-key`
            const options = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`
                },
            };

            const response = await axios.post(endpoint, data, options);
            return response;
        } catch (err) {
            console.log('erer', err);
            return err;
        }
    }

    static async update(data: any, id: string) {

        try {
            const endpoint = `${this.baseUrl}/api-key/${id}`
            const options = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`
                },
            };

            const response = await axios.put(endpoint, data, options);
            return response;
        } catch (err) {
            console.log('erer', err);
            return err;
        }
    }

    static async getAll(){
        try {
            const endpoint = `${this.baseUrl}/api-keys`
            const options = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`
                },
            };

            const response = await axios.get(endpoint, options);
            return response;
        } catch (err) {
            console.log('erer', err);
            return err;
        }
    }


}