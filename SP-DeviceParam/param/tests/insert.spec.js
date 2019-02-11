
const insert = require('../insert').insert;

describe('lambdaInsertToDynamo', () => {
    var context = {};
    var resp = {};
    
    xit('should insert data into DynamoDB', (done) => {
        var event = { ph: '7', temperature: '40', id: '10', topic: 'topic_2' };
        
        let callback = (ctx, data) => {
            console.log(data);
            resp = data;
            done();
        }
        insert(event, context, callback);
        expect(resp.statusCode).toBe(400);
    });

    xit('should insert data into DynamoDB', (done) => {
        var event = 3;
        
        let callback = (ctx, data) => {
            console.log(data);
            resp = data;
            done();
        }
        insert(event, context, callback);
        expect(resp.statusCode).toBe(200);
    });
    
});

const DeviceData = require('../DeviceData');
const deviceData = new DeviceData();

describe('InsertToDynamo', () => {
    var context = {};
    var resp = {};
    
    xit('should insert data into DynamoDB', (done) => {
        var event = { ph: '7', temperature: '40', id: '10', topic: 'topic_2' };
        
        let callback = (ctx, data) => {
            console.log(data);
            resp = data;
            done();
        }
        deviceData.insert(data, callback);
        expect(resp.statusCode).toBe(200);
    });


});