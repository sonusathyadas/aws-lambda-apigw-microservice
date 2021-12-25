const axios = require("axios")

exports.handler = async (event, context, callback) => {
    var base;
    var output;

    //read the base currency from query parameter
    if (event.queryStringParameters && event.queryStringParameters.base) {
        console.log("Received base:" + event.queryStringParameters.base);
        base = event.queryStringParameters.base;
    }

    //read the output currency from query parameter
    if (event.queryStringParameters && event.queryStringParameters.output) {
        console.log("Received output:" + event.queryStringParameters.output);
        output = event.queryStringParameters.output;
    }

    var param = `${base}_${output}`;
    let result = await axios.get(`https://free.currconv.com/api/v7/convert?q=${param}&compact=ultra&apiKey=a9442bf95ace8dc900a5`)
        .catch(err => callback({ 'error': 'Unable to complete the convertion task' }));
    if (result) {
        var data = result.data[param];
        callback(null, { "statusCode": 200, "body": `Base currency is ${base} and converted value for ${output} is ${data}` })
    }
}