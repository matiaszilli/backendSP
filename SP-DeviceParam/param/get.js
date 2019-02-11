"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("./dynamoDB");
const DeviceParam = require('./DeviceParam');
let deviceParam = new DeviceParam(db);
module.exports.get = (event, context, callback) => {
    const data = event.queryStringParameters;
    // if property does not exist and it's a string
    if ((!data.topic || typeof data.topic !== 'string') || (!data.param || typeof data.param !== 'string')) {
        // create a response
        const response = {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: {
                ok: false,
                message: 'Please specify topic and param parameter'
            }
        };
        callback(null, response);
        return;
    }
    deviceParam.get(data.topic, data.param, callback);
    return;
};
