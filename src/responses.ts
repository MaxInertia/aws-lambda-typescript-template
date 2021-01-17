
const CORS_HEADERS = {
	"Access-Control-Allow-Headers" : "Content-Type",
	// TODO: Refine this if requests should not be open to all origins
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT"
}

export const badRequestErrorResponse = (message: string) => ({
	statusCode: 400,
	headers: CORS_HEADERS,
	body: JSON.stringify({message: `bad request: ${message}`}),
})

export const unexpectedErrorResponse = (error: Error) => ({
	statusCode: 500,
	headers: CORS_HEADERS,
	body: JSON.stringify({message: "unexpected error occurred", error}),
})

export const resourceNotFoundResponse = () => ({
	statusCode: 404,
	headers: CORS_HEADERS,
	body: JSON.stringify("resource not found"),
})

export const successResponse = (item: Record<string, unknown> | Record<string, unknown>[]) => ({
	statusCode: 200,
	headers: CORS_HEADERS,
	body: JSON.stringify(item)
})
