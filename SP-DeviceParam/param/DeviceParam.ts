
class DeviceParam {

    db: any;

    constructor(db) {
      this.db = db;
    }
  
  
    insert(data, callback) {

        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Item: data
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

    get(topic, param, callback) {
  
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            KeyConditionExpression: "topic = :topic and param = :param",
            ExpressionAttributeValues: {
                ":topic": topic,
                ":param": param
            },
        }
  
        // get items from the database
        this.db.query(params, (error, result) => {
            // handle potential errors
            if (error) {
                console.error("Unable to query. Error:", JSON.stringify(error, null, 2));
                callback(new Error('Couldn\'t create the item.'))
            } else {
                console.log("Query succeeded.");
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

module.exports = DeviceParam;