// import format from 'string-format';
import axios from 'axios';

const apis = {
    CURRENT_COMIC: 'http://xkcd.com/info.0.json ',
    COMIC_INFO: (index) => `http://xkcd.com/${index}/info.0.json`
}

export function getCurrentComic() {
    return axios.get(apis.CURRENT_COMIC)
        .then(res => {
            if (res.status === 200) return res.data
            throw 'Client error!'
        })
        .catch(err => {
            return err
        })
}

export function getMultipleComics(start, end) {
    start = Math.floor(Math.random() * 2000);
    end = start + 15
    function getUrls() {
        const urls = Array.from(Array(end - start).keys()).map(item => {
            const currentIndex = start + item
            return axios.get(apis.COMIC_INFO(currentIndex))
        })
        return urls
    }
    return axios.all(getUrls())
        .then(axios.spread((...responses) => {
            return responses
        }))
}