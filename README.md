<h1 align="center">Smart Pool project</h1>

# Backend Section

* [Overview](#overview)
* [Serverless](#serverless)
* [Services](#serverlessservices)

****

<a name="overview"></a>
## Overview
TODO

<a name="serverless"></a>
## Serverless
The serverless framework is an open source CLI tool that allows us to build, configure and deploy serverless functions (in our case, AWS Lambda functions).
Without "Serverless Framework", we have to go manually on console then create and configure necessary resources. That’s fine when the project is small and functions are limited but as soon as the project grows then creating and configuring resources is a challenging task and in lots of case unmaintainable. Writing code on console and managing team workflow becomes a tedious job.
With a "Serverless Framework", we can quickly build, configure and deploy resources with few commands.
There are lots of significant advantages of using a serverless framework instead of doing manually work.

<a name="serverlessservices"></a>
## Services
This project consists of 2 Serverless services, the first one handles device data (temperature, ph and orp) between device and AWS. The second service has functionality to manage device parameters.
Each service has one o more DynamoDb table to store data.

### SP-DeviceData

| #  | Endpoint                                | Method | Description  |
| -  | --------------------------------------- |:------:| ------------:|
| 1  | device/data/get?topic=tpc&quantity=qty  |   GET  | Get the last qty data from tpc device. |
| 2  | device/data/insert                      |   POST | Insert data coming from IotCore to DynamoDb. |

### SP-DeviceParam

| #  | Endpoint                                | Method | Description  |
| -  | --------------------------------------- |:------:| ------------:|
| 1  | device/param/get?topic=tpc&param=prm  |   GET  | Get prm parameter for tpc device. |
