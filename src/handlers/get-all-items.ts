import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {DYNAMO_DB_TABLE_NAME, dynamoDBClient} from "../dynamo-db";
import {successResponse, unexpectedErrorResponse} from "../errors";

/**
 * A simple example includes a HTTP get method to get all entries from a DynamoDB table.
 */
export const handler = async (event: APIGatewayProxyEvent, context: unknown): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod!=='GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }

    try {
        // get all items from the table (only first 1MB data, you can use `LastEvaluatedKey` to get the rest of data)
        // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
        // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html
        const data = await dynamoDBClient.scan({TableName: DYNAMO_DB_TABLE_NAME}).promise();
        console.log(data.ConsumedCapacity)
        const items = data.Items;
        return successResponse(items);
    } catch (error) {
        return unexpectedErrorResponse(error);
    }
}
