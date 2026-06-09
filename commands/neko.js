const { TAG_MAP } = require('../res/nekoTags');
const { NekoImage, NekoNoResult, NekoError } = require('../res/embeds');
const BASE_URL = 'https://api.nekosapi.com/v4';

const rgbToHex = ([r, g, b]) =>
    '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');

module.exports = async (args, message) => {
    try {
        const tags = (args || []).map(arg => TAG_MAP.get(arg) ?? arg);

        const params = new URLSearchParams({ limit: 1, without_tags: 'loli' });
        if (tags.length > 0) params.set('tags', tags.join(','));

        const url = `${BASE_URL}/images/random?${params.toString()}`;
        console.log(`NEKO_URL: Fetching: ${url}`);

        const res = await fetch(url);
        const data = await res.json();
        const image = Array.isArray(data) ? data[0] : data;

        if (!image) return NekoNoResult(message);
        console.log(`NEKO_URL: data: ${JSON.stringify(data)}`);

        const color = image.color_dominant ? rgbToHex(image.color_dominant) : '#e534eb';
        await NekoImage(message, image, color, data[0]);
    } catch (err) {
        console.error(err);
        await NekoError(message);
    }
};
