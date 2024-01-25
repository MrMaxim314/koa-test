import { BaseContext } from 'koa';

/**
 * Applies the status code and message on ctx body and returns
 *
 * @param  {BaseContext} context Koa context object for error handling
 * @param  {number} status the statusCode to respond with
 * @param  {any} body the body of the response
 */
export const response = (
    context: BaseContext,
    status: number,
    body?: Record<string, unknown> | string | Array<Record<string, unknown>>,
): void => {
    context.status = status;
    context.body = body;
};
