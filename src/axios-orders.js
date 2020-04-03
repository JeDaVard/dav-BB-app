import axios from 'axios'

export default axios.create({
    baseURL: 'https://dav-bb-ap.firebaseio.com/'
});
