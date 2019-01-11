
class DeviceData {

    constructor(db) {
      this.db = db;
    }
  
  
    insert(data, callback) {
  
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Item: {
                topic: "uuid.v1()",
                timestamp: "uuid.v1()",
                createdAt: "uuid.v1()",
                updatedAt: "uuid.v1()"
            }
        }
  
        // write to the database
        db.put(params, (error, result) => {
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
            ScanIndexForward: true
        }
  
        // get items from the database
        db.query(params, (error, result) => {
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
                    body: JSON.stringify(result.Items)
                }
                callback(null, response)
            }
        });
    }
  
}

module.exports = DeviceData;