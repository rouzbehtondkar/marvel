// ~/store/marvelStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import md5 from 'md5';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
const router = useRouter();

export const useMarvelStore = defineStore({
    id: 'marvel',
    state: () => ({
        characters: [],
        user:'',
        userInfo:'',
        loginError: null,
        products:[],
    }),
    actions: {
        async fetchCharacters() {
            const publicKey = '2dadec700ec19acae6022f02802c1593';
            const privateKey = 'e9970b149457a34b075505ddb0818f29e1a9430b';
            const apiBaseURL = "https://gateway.marvel.com/v1/public/";

            function createURL() {
                const ts = Date.now();
                const params = new URLSearchParams({
                    ts: ts,
                    apikey: publicKey,
                    hash: md5(ts + privateKey + publicKey),

                });
                const endpoint = `${apiBaseURL}/characters?`;
                return endpoint + params;
            }

            try {
                const response = await axios.get(createURL());
                this.characters = response.data.data.results;
                // console.log(response)
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        },
        async loginUser(username, password) {
            try {
                const response = await axios.post('https://dummyjson.com/auth/login', {
                    username: username,
                    password: password,
                    expiresInMins: 30,
                });
                this.user = response.data;
                console.log(response.data);
            } catch (error) {
                console.error('Error:', error);
                this.loginError = error.message;
            }
        },
        async fetchUser(token) {
            try {
                const response = await axios.get('https://dummyjson.com/auth/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                this.userInfo = response.data;
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        },
        async product() {

            try {
                 const response= await  axios.get('https://dummyjson.com/products' , {
                 });
                this.products=response.data;
                // console.log(response.data);
            }catch (error) {
                console.log ('Error ftching proudact' , error);
            }
        },
        async productDelete(id) {
            try {
                const response = await axios.delete(`https://dummyjson.com/products/${id}`, {
                    headers: {

                    }
                });
                console.log(response.data);
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        },
        async productPut(id, title, category, price) {
            try {
                const response = await axios.put(`https://dummyjson.com/products/${id}`, {

                    title: title,
                    category: category,
                    price: price,

                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
            } catch (error) {
                console.error('Error updating product:', error);
            }
        },

        async productAdd(id, title, category, price) {
            try {
                const response = await axios.post('https://dummyjson.com/products/add', {

                    title: title,
                    category: category,
                    price: price,

                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
            } catch (error) {
                console.error('Error updating product:', error);
            }
        },

    },


});
