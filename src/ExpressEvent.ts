export interface ExpressEvent {
    protocol: string;
}

export interface ExpressEventResponse {
    statusCode: number,
    body: string,
    headers: Record<string, string>,
    isBase64Encoded: boolean
};