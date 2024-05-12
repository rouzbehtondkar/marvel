import {defineStore} from "pinia";
import axios from 'axios';
import {useRouter} from 'vue-router';
const router = useRouter();

export const test = defineStore({
    id:'testStore',
    state: () => ({
        user:'',
        productvalue: []
    }),actions: {
        async loginUser(username, password) {
            try {
                const response = await axios.post('https://dummyjson.com/auth/login', {

                });
                this.user = response.data;
                console.log(response.data);
            } catch (error) {
                console.error('Error:', error);
                this.loginError = error.message;
            }
        },

        async product() {

            try {
                const response= await  axios.get('https://dummyjson.com/products' , {
                });
                this.productvalue=response.data;
                console.log(response.data);
            }catch (error) {
                console.log ('Error ftching proudact' , error);
            }
        },
    }
});