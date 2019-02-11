const get = require('../get').get;
const request = require('supertest');


describe('getLambda', () => {
    // var event = {};
    var context = {};
    var resp = {};
    
    xit('should call get lambda function with all parameters', (done) => {
        var event = {};
        event.queryStringParameters = {};
        event.queryStringParameters.topic = 'topic_1';
        event.queryStringParameters.quantity = '2';
        
        let callback = (ctx, data) => {
            console.log(data);
            resp = data;
            done();
        }
        get(event, context, callback);
        expect(resp.statusCode).toBe(200);
    });
    
    it('should call get lambda function with no quantity', (done) => {
        var event = {}
        event.queryStringParameters = {};
        event.queryStringParameters.topic = 'topic_1';
        let callback = (ctx, data) => {
            console.log(data);
            resp = data;
            done();
        }
        get(event, context, callback);
        expect(resp.statusCode).toBe(200);
        // expect(resp.body).t
    });
    xit('should call get lambda function with no parameters', (done) => {
        var event = {}
        event.queryStringParameters = {};
        let callback = (ctx, data) => {
            console.log(data);
            resp = data;
            done();
        }
        get(event, context, callback);
        expect(resp.statusCode).toBe(400);
        expect(resp.body.ok).toBeFalsy();
        expect(resp.body.message).toBe('Please specify topic parameter');
    });
});

const DeviceData = require('../DeviceData');

xdescribe('get', () => {
    var event = {};
    var deviceData = new DeviceData();

    xit('should call DeviceData.get() and return message', () => {
        expect(deviceData.get(event).message).toBe('Go Serverless v1.0! Your function executed successfully!');
    });
});