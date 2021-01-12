import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {putItem} from "../dynamo-db";
import {badRequestErrorResponse} from "../errors";

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
export const handler = async (event: APIGatewayProxyEvent, context: unknown): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    // Get id and name from the body of the request
    const body: Record<string, unknown> = JSON.parse(event.body)
    if(!body || Object.keys(body).length === 0) {
        return badRequestErrorResponse("request body must be an object");
    }

    try {
        const result = await putItem(body)
        console.log(result.ConsumedCapacity)
        return {
            statusCode: 200,
            body: JSON.stringify(body)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({message: "unexpected error occurred", error}),
        };
    }
}
