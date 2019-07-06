export default class Api {
    async getData(url) {
        let response = await fetch(url);
        let data = await response.json()
        return data;
    }
}