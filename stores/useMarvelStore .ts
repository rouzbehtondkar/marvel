// ~/store/marvelStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import md5 from 'md5';

export const useMarvelStore = defineStore({
    id: 'marvel',
    state: () => ({
        characters: [],
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
        async fetchCharacterById(characterId) {
            await this.fetchCharacters();
            return this.characters.find(character => character.id === characterId);
        },
    },


});
