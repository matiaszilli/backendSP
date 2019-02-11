
class DeviceData {

    db: any;

    constructor(db) {
      this.db = db;
    }
  
  
    insert(data, callback) {

        let params;
        let dataToInsert = data.data;
        dataToInsert.topic = data.topic; // insert topic
        dataToInsert.timestamp = data.timestamp; // insert timestamp
        switch(data.type) {
            case 'data':
                params = {
                    TableName: process.env.DYNAMODB_TABLE,
                    Item: dataToInsert
                }
                break;
            case 'info':
                params = {
                    TableName: process.env.DYNAMODB_TABLE_INFO,
                    Item: dataToInsert
                }
                break;
        }
  
        // write to the database
        this.db.put(params, (error, result) => {
            // handle potential errors
            if (error) {
                console.error("Unable to create item. Error:", JSON.stringify(error, null, 2));
                callback(new Error('Couldn\'t create the item.'))
                return
            }

            // create a response
            const response = {
                statusCode: 200,
                body: JSON.stringify(result.Item)
            }

            callback(null, response)
        });
    }

    get(topic, quantity, callback) {
  
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Limit: quantity,
            KeyConditionExpression: "topic = :topic",
            ExpressionAttributeValues: {
                ":topic": topic
            },
            ScanIndexForward: false
        }
  
        // get items from the database
        this.db.query(params, (error, result) => {
            // handle potential errors
            if (error) {
                console.error("Unable to query. Error:", JSON.stringify(error, null, 2));
                callback(new Error('Couldn\'t create the item.'))
            } else {
                console.log("Query succeeded.");
                result.Items.forEach(function(item) {
                    console.log(" -", item.year + ": " + item.title);
                });
                // create a response
                const response = {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                      },
                    body: JSON.stringify(result.Items)
                }
                callback(null, response)
            }
        });
    }
  
}

module.exports = DeviceData;