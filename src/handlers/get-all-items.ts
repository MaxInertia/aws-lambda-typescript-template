import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {getAllItems} from "../dynamo-db";
import {successResponse, unexpectedErrorResponse} from "../errors";

/**
 * An example HTTP get method to get all entries from a DynamoDB table.
 */
export const handler = async (event: APIGatewayProxyEvent, context: unknown): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod!=='GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }

    try {
        const data = await getAllItems()
        console.log(data.ConsumedCapacity)
        return successResponse(data.Items);
    } catch (error) {
        return unexpectedErrorResponse(error);
    }
}
