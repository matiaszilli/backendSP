
import { DynamoDB } from 'aws-sdk'

const db = new DynamoDB.DocumentClient()

const DeviceData = require('DeviceData');

let deviceData = new DeviceData(db);

module.exports.insert = (event, context, callback) => {

  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  console.log(data);
  console.log(event);
  return;
  if (typeof data.text !== 'string') {
    console.error('Validation Failed')
    callback(new Error('Couldn\'t create the todo item.'))
    return
  }

  deviceData.insert(data, callback);

}
