const TAG_MAP = new Map([
    // Personagem
    ['-c',  'catgirl'],
    ['-g',  'girl'],
    ['-b',  'boy'],
    ['-ke', 'kemonomimi'],
    ['-us', 'usagimimi'],
    ['-yr', 'yuri'],
    // Cabelo
    ['-bk', 'black_hair'],
    ['-bl', 'blonde_hair'],
    ['-bu', 'blue_hair'],
    ['-br', 'brown_hair'],
    ['-pk', 'pink_hair'],
    ['-pu', 'purple_hair'],
    ['-wh', 'white_hair'],
    // Roupa
    ['-bi', 'bikini'],
    ['-su', 'school_uniform'],
    ['-ma', 'maid'],
    ['-dr', 'dress'],
    ['-sk', 'skirt'],
    ['-sh', 'shorts'],
    ['-gl', 'gloves'],
    // Ambiente
    ['-be', 'beach'],
    ['-ni', 'night'],
    ['-sn', 'sunny'],
    ['-pl', 'plants'],
    ['-fl', 'flowers'],
    ['-tr', 'tree'],
    // Corpo
    ['-lb', 'large_breasts'],
    ['-mb', 'medium_breasts'],
    ['-sb', 'small_breasts'],
    ['-fc', 'flat_chest'],
    // NSFW
    ['-eg', 'exposed_girl_breasts'],
    ['-py', 'pussy'],
    ['-dk', 'dick'],
    ['-ms', 'masturbating'],
    ['-an', 'anal'],
    ['-ea', 'exposed_anus'],
    // Objetos
    ['-sw', 'sword'],
    ['-wp', 'weapon'],
    ['-gt', 'guitar'],
    ['-we', 'wet'],
]);

const CATEGORIES = [
    {
        label: '👤 Personagem',
        keys: ['-c', '-g', '-b', '-ke', '-us', '-yr'],
    },
    {
        label: '💇 Cabelo',
        keys: ['-bk', '-bl', '-bu', '-br', '-pk', '-pu', '-wh'],
    },
    {
        label: '👗 Roupa',
        keys: ['-bi', '-su', '-ma', '-dr', '-sk', '-sh', '-gl'],
    },
    {
        label: '🌄 Ambiente',
        keys: ['-be', '-ni', '-sn', '-pl', '-fl', '-tr'],
    },
    {
        label: '🔞 NSFW',
        keys: ['-lb', '-mb', '-sb', '-fc', '-eg', '-py', '-dk', '-ms', '-an', '-ea'],
    },
    {
        label: '🗡️ Objetos',
        keys: ['-sw', '-wp', '-gt', '-we'],
    },
];

module.exports = { TAG_MAP, CATEGORIES };