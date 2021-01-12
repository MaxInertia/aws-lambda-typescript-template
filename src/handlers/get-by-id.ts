import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {getItem} from "../dynamo-db";
import {unexpectedErrorResponse, resourceNotFoundResponse, successResponse} from "../errors";

/**
 * An example HTTP get method to get one item by id from a DynamoDB table.
 */
export const handler = async (event: APIGatewayProxyEvent, context: unknown): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod !== "GET") {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }

  // Get id from pathParameters from APIGateway because of `/{id}` at template.yml
  const id = event.pathParameters.id;
  if(!id) {
    return {
      statusCode: 400,
      body: JSON.stringify(`query parameter "id" is required`),
    };
  }

  try {
    const data = await getItem({id});
    console.log(data.ConsumedCapacity)
    if (data.Item) {
      return successResponse(data.Item);
    } else {
      return resourceNotFoundResponse()
    }
  } catch(error) {
    return unexpectedErrorResponse(error)
  }
}
