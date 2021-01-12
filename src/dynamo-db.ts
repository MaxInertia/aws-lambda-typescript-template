import {DocumentClient} from "aws-sdk/clients/dynamodb";
import * as dynamodb from "aws-sdk/clients/dynamodb";

// Get the DynamoDB table name from environment variables
export const DYNAMO_DB_TABLE_NAME = process.env.SAMPLE_TABLE;

export const dynamoDBClient = new dynamodb.DocumentClient()

/**
 * Get an item from the table
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property
 * @param key
 */
export function getItem(key: DocumentClient.Key) {
	const params: DocumentClient.GetItemInput = {
		TableName: DYNAMO_DB_TABLE_NAME,
		Key: key,
	}
	return dynamoDBClient.get(params).promise()
}

/**
 * get all items from the table (only first 1MB data, you can use `LastEvaluatedKey` to get the rest of data)
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
 * https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html
 */
export function getAllItems() {
	const params: DocumentClient.ScanInput = {TableName: DYNAMO_DB_TABLE_NAME}
	return dynamoDBClient.scan(params).promise();
}

/**
 * Creates a new item, or replaces an old item with a new item
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
 * @param data
 */
export function putItem(data: DocumentClient.AttributeMap) {
	const timestamp = Date.now() / 1000;
	const params: DocumentClient.PutItemInput = {
		TableName: DYNAMO_DB_TABLE_NAME,
		Item: {...data, updated: timestamp},
	}
	return dynamoDBClient.put(params).promise()
}
