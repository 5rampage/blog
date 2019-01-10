import * as Boom from 'boom';
import { Context } from 'koa';

export default async (ctx: Context, next: any) => {
    try {
        await next();
    } catch (error) {
        let boomErr;
        if (error instanceof ExpectedError) {
            ctx.body = {
                code: error.statusCode,
                errorCode: error.data || error.message
            };
            console.error(`${error.data}`);
            return;
        } else {
            boomErr = error.isBoom ? error : new Boom(error);
        }

        const { statusCode, headers, payload } = boomErr.output;
        ctx.status = statusCode;
        ctx.set(headers);
        ctx.body = {
            code: payload.statusCode,
            errorCode: boomErr.message
        };
        console.error(boomErr);
    }
};

export class ExpectedError<T> extends Error {
    isExpected: boolean = true;
    statusCode: number = 400;
    data?: T;
    constructor(
        message?: string,
        options?: {
            statusCode?: number
            data?: T
        }
    ) {
        super(message);
        if (options) {
            this.statusCode = options.statusCode || 400;
            this.data = options.data;
        }
    }
}
