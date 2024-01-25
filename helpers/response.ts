import { BaseContext } from 'koa';

export const response = (
    context: BaseContext,
    status: number,
    body?: Record<string, unknown> | string | Array<Record<string, unknown>>,
): void => {
    context.status = status;
    context.body = body;
};
