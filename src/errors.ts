
export const badRequestErrorResponse = (message: string) => ({
	statusCode: 400,
	body: JSON.stringify({message: `bad request: ${message}`}),
})

export const unexpectedErrorResponse = (error: Error) => ({
	statusCode: 500,
	body: JSON.stringify({message: "unexpected error occurred", error}),
})

export const resourceNotFoundResponse = () => ({
	statusCode: 404,
	body: JSON.stringify("resource not found"),
})

export const successResponse = (item: any) => ({
	statusCode: 200,
	body: JSON.stringify(item)
})
