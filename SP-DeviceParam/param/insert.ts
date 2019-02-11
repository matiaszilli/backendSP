
import * as db from './dynamoDB';

const DeviceData = require('./DeviceData');

let deviceData = new DeviceData(db);

module.exports.insert = (event, context, callback) => {

  let data = event;

  // Verify that receive a Object
    if (typeof data !== 'object') {
      // create a response
      const response = {
          statusCode: 400,
          body: {
              ok: false,
              message: 'Not receive a object'
          }
      }
      console.error('Validation Failed, it did not receive a object')
      callback(null, response);
      return;
  }
  
  // insert timestamp to message
  data.timestamp = new Date().getTime().toString();
  // call insert function
  deviceData.insert(data, callback);
  return;

}
