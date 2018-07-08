import format from 'string-format';
format.extend(String.prototype, {})

const apis = {
    CURRENT_COMIC: 'http://xkcd.com/info.0.json ',
    COMIC_INFO: 'http://xkcd.com/{0}/info.0.json '
}