
import { DynamoDB } from 'aws-sdk'

const db = new DynamoDB.DocumentClient()

const DeviceData = require('DeviceData');

let deviceData = new DeviceData(db);

module.exports.get = (event, context, callback) => {

    const data = JSON.parse(event.body)
    if (typeof data.text !== 'string') {
        console.error('Validation Failed')
        callback(new Error('Couldn\'t get items.'))
        return
    }

  deviceData.save(data.topic, callback);

}