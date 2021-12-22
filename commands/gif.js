const fetch = require("cross-fetch");

module.exports = async (message, wordArr) => {
    const searchTerms = wordArr.join(" ");
    const giphy = {
        baseURL: "https://api.giphy.com/v1/gifs/translate",
        apiKey: process.env.GIPHY_TOKEN,
        tag: "",
        type: "",
        rating: "g",
        searchTerm: searchTerms
    };
    let giphyURL = encodeURI(
        giphy.baseURL +
            giphy.type +
            "?api_key=" +
            giphy.apiKey +
            "&tag=" +
            giphy.tag +
            "&rating=" +
            giphy.rating +
            "&s=" +
            giphy.searchTerm
    );

    try {
        const response = await fetch(giphyURL)
        const gifResult = await response;
        const gifJSON = await gifResult.json();
        const gifUrl = await gifJSON.data.images.original.url;

        const giphyBranding = "https://boiling-fortress-52817.herokuapp.com/giphy.png"
        
        message.channel.send({content: `${searchTerms.toUpperCase()}`, files: [gifUrl, giphyBranding]})
    } catch (error) {
        console.log(error)
    }
}