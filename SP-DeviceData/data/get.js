"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("./dynamoDB");
const DeviceData = require('./DeviceData');
let deviceData = new DeviceData(db);
module.exports.get = (event, context, callback) => {
    const data = event.queryStringParameters;
    // if quantity is not specified, set it to 1.
    if (!data.quantity) {
        data.quantity = '1';
    }
    // if property does not exist and it's a string
    if (!data.topic || typeof data.topic !== 'string') {
        // create a response
        const response = {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: {
                ok: false,
                message: 'Please specify topic parameter'
            }
        };
        callback(null, response);
        return;
    }
    deviceData.get(data.topic, data.quantity, callback);
    return;
};
