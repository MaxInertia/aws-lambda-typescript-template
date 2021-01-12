import {DocumentClient} from "aws-sdk/clients/dynamodb";
import * as dynamodb from "aws-sdk/clients/dynamodb";

// Get the DynamoDB table name from environment variables
export const DYNAMO_DB_TABLE_NAME = process.env.SAMPLE_TABLE;

export const dynamoDBClient = new dynamodb.DocumentClient()

/**
 * Get an item from the table
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property
 *
 * @param key
 */
export async function getItem(key: object) {
	const params: DocumentClient.GetItemInput = {
		TableName: DYNAMO_DB_TABLE_NAME,
		Key: key,
	}
	return await dynamoDBClient.get(params).promise()
}

/**
 * Creates a new item, or replaces an old item with a new item
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
 *
 * @param data
 */
export async function putItem(data: Record<string, unknown>) {
	const timestamp = Date.now() / 1000;
	const params: DocumentClient.PutItemInput = {
		TableName: DYNAMO_DB_TABLE_NAME,
		Item: {...data, updated: timestamp},
	}
	return await dynamoDBClient.put(params).promise()
}
