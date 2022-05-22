export interface BotHttpResponse<T> {
    response: T;
    error?: boolean;
}