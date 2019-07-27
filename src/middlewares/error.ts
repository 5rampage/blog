import * as Boom from '@hapi/boom';
import { ParameterizedContext } from 'koa';

export default async (ctx: ParameterizedContext, next: any) => {
    try {
        await next();
    } catch (error) {
        const boomErr = error.isBoom ? error : new Boom(error);
        const { statusCode, headers, payload } = boomErr.output;
        ctx.status = statusCode;
        ctx.set(headers);
        ctx.body = {
            code: payload.statusCode,
            message: payload.error
        };
        console.error(boomErr);
    }
};
