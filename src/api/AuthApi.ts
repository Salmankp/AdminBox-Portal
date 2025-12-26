
import axios from "axios";
export default class AuthApi {
    static baseUrl = `${process.env.REACT_APP_SERVER_URL}/api/v1/auth`;

    //client admin signup
    static async signup(data: any, api_key_url: string) {
        try {
            const endpoint = `${this.baseUrl}/admin-signup`;
            const options = {
                headers: {
                    "API-KEY": api_key_url ? api_key_url : process.env.REACT_APP_CLIENT_API_TOKEN
                },
            };

            const response = await axios.post(endpoint, data, options as any);
            return response;
        } catch (err) {
            console.log('err', err);
            return err;
        }
    }

    //client admin login
    static async login(data: any) {
        try {

            const endpoint = `${this.baseUrl}/admin-login`;
            const options = {
                headers: {
                    "API-KEY": process.env.REACT_APP_CLIENT_API_TOKEN,
                },
            };

            const response = await axios.post(endpoint, data, options as any);
            return response;
        } catch (err) {
            console.log('err', err);
            return err;
        }
    }

    //verify recpatcha
    static async verifyRecaptcha(data: any) {
        try {
            const endpoint = `${this.baseUrl}/verify-recaptcha`;
            const response = await axios.post(endpoint, data);
            return response;
        } catch (err) {
            console.log('err', err);
            return err;
        }
    }
}